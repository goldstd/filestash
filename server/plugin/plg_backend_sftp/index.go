package plg_backend_sftp

import (
	"fmt"
	. "github.com/mickael-kerjean/filestash/server/common"
	"github.com/patrickmn/go-cache"
	"github.com/pkg/sftp"
	"go.uber.org/multierr"
	"golang.org/x/crypto/ssh"
	"io"
	"os"
	"path/filepath"
	"strings"
	"time"
)

type Sftp struct {
	SSHClient  *ssh.Client
	SFTPClient *sftp.Client
}

var (
	// creatorCache  创建器缓存
	creatorCache = cache.New(cache.NoExpiration, cache.NoExpiration)
	sftpCache    = cache.New(10*time.Minute, 10*time.Minute)
)

func init() {
	Backend.Register("sftp", Sftp{})

	sftpCache.OnEvicted(func(k string, v interface{}) {
		v.(*Sftp).Close()
	})
}

type ClientCreator func() (*ssh.Client, error)

func SetCreator(target string, clientCreator ClientCreator) {
	creatorCache.SetDefault(target, clientCreator)
}

func (s Sftp) Init(params map[string]string, app *App) (IBackend, error) {
	target := params["target"]
	val, ok := sftpCache.Get(target)
	if !ok {
		creator, ok := creatorCache.Get(target)
		if !ok {
			return nil, fmt.Errorf("unknown target %s", target)
		}

		sshClient, err := creator.(ClientCreator)()
		if err != nil {
			return nil, err
		}
		sftpClient, err := sftp.NewClient(sshClient)
		if err != nil {
			return nil, err
		}

		val = &Sftp{
			SSHClient:  sshClient,
			SFTPClient: sftpClient,
		}

	}
	// 重新设置，续期
	sftpCache.SetDefault(target, val)

	return val.(*Sftp), nil
}

func (b Sftp) LoginForm() Form {
	return Form{
		Elmnts: []FormElement{
			{
				Name:  "type",
				Type:  "hidden",
				Value: "sftp",
			},
			{
				Name:        "hostname",
				Type:        "text",
				Placeholder: "Hostname*",
			},
			{
				Name:        "username",
				Type:        "text",
				Placeholder: "Username",
			},
			{
				Name:        "password",
				Type:        "password",
				Placeholder: "Password",
			},
			{
				Name:        "advanced",
				Type:        "enable",
				Placeholder: "Advanced",
				Target:      []string{"sftp_path", "sftp_port", "sftp_passphrase", "sftp_hostkey"},
			},
			{
				Id:          "sftp_path",
				Name:        "path",
				Type:        "text",
				Placeholder: "Path",
			},
			{
				Id:          "sftp_port",
				Name:        "port",
				Type:        "number",
				Placeholder: "Port",
			},
			{
				Id:          "sftp_passphrase",
				Name:        "passphrase",
				Type:        "password",
				Placeholder: "Passphrase",
			},
			{
				Id:          "sftp_hostkey",
				Name:        "hostkey",
				Type:        "text",
				Placeholder: "Host key",
			},
		},
	}
}

func (b Sftp) Home() (string, error) {
	cwd, err := b.SFTPClient.Getwd()
	if err != nil {
		return "", b.err(err)
	}
	cwd = filepath.Join(cwd, "/")
	return cwd, nil
}

func (b Sftp) Ls(path string) ([]os.FileInfo, error) {
	files, err := b.SFTPClient.ReadDir(path)
	return files, b.err(err)
}

func (b Sftp) Cat(path string) (io.ReadCloser, error) {
	remoteFile, err := b.SFTPClient.OpenFile(path, os.O_RDONLY)
	if err != nil {
		return nil, b.err(err)
	}
	return remoteFile, nil
}

func (b Sftp) Mkdir(path string) error {
	err := b.SFTPClient.Mkdir(path)
	return b.err(err)
}

func (b Sftp) Rm(path string) error {
	if IsDirectory(path) {
		list, err := b.SFTPClient.ReadDir(path)
		if err != nil {
			return b.err(err)
		}
		for _, entry := range list {
			p := path + entry.Name()
			if entry.IsDir() {
				p += "/"
				err := b.Rm(p)
				if err != nil {
					return b.err(err)
				}
			} else {
				err := b.SFTPClient.Remove(p)
				if err != nil {
					return b.err(err)
				}
			}
		}
		err = b.SFTPClient.RemoveDirectory(path)
		if err != nil {
			return b.err(err)
		}
	} else {
		err := b.SFTPClient.Remove(path)
		return b.err(err)
	}
	return nil
}

func (b Sftp) Mv(from string, to string) error {
	err := b.SFTPClient.Rename(from, to)
	return b.err(err)
}

func (b Sftp) Touch(path string) error {
	file, err := b.SFTPClient.OpenFile(path, os.O_WRONLY|os.O_CREATE)
	if err != nil {
		return b.err(err)
	}
	_, err = file.ReadFrom(strings.NewReader(""))
	file.Close()
	return b.err(err)
}

func (b Sftp) Save(path string, file io.Reader) error {
	remoteFile, err := b.SFTPClient.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_TRUNC)
	if err != nil {
		return b.err(err)
	}
	_, err = io.Copy(remoteFile, file)
	remoteFile.Close()
	return b.err(err)
}

func (b Sftp) Stat(path string) (os.FileInfo, error) {
	f, err := b.SFTPClient.Stat(path)
	return f, b.err(err)
}

func (b Sftp) Close() error {
	err0 := b.SFTPClient.Close()
	b.SFTPClient = nil
	err1 := b.SSHClient.Close()
	b.SSHClient = nil

	return multierr.Combine(err0, err1)
}

func (b Sftp) err(e error) error {
	f, ok := e.(*sftp.StatusError)
	if ok == false {
		if e == os.ErrNotExist {
			return ErrNotFound
		}
		return e
	}
	switch f.Code {
	case 0:
		return nil
	case 1:
		return NewError("There's nothing more to see", 404)
	case 2:
		return NewError("Does not exist", 404)
	case 3:
		return NewError("Permission denied", 403)
	case 4:
		return NewError("Failure", 409)
	case 5:
		return NewError("Not Compatible", 400)
	case 6:
		return NewError("No Connection", 503)
	case 7:
		return NewError("Connection Lost", 503)
	case 8:
		return NewError("Operation not supported", 501)
	case 9:
		return NewError("Not valid", 400)
	case 10:
		return NewError("No such path", 404)
	case 11:
		return NewError("File already exists", 409)
	case 12:
		return NewError("Write protected", 403)
	case 13:
		return NewError("No media", 404)
	case 14:
		return NewError("No space left", 400)
	case 15:
		return NewError("Quota exceeded", 400)
	case 16:
		return NewError("Unknown", 400)
	case 17:
		return NewError("Lock conflict", 409)
	case 18:
		return NewError("Directory not empty", 400)
	case 19:
		return NewError("Not a directory", 400)
	case 20:
		return NewError("Invalid filename", 400)
	case 21:
		return NewError("Link loop", 508)
	case 22:
		return NewError("Cannot delete", 400)
	case 23:
		return NewError("Invalid query", 400)
	case 24:
		return NewError("File is a directory", 400)
	case 25:
		return NewError("Lock conflict", 409)
	case 26:
		return NewError("Lock refused", 400)
	case 27:
		return NewError("Delete pending", 400)
	case 28:
		return NewError("File corrupt", 400)
	case 29:
		return NewError("Invalid owner", 400)
	case 30:
		return NewError("Invalid group", 400)
	case 31:
		return NewError("Lock wasn't granted", 400)
	default:
		return NewError("Oops! Something went wrong", 500)
	}
}
