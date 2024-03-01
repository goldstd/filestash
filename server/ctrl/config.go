package ctrl

import (
	"encoding/base64"
	. "github.com/mickael-kerjean/filestash/server/common"
	"io/ioutil"
	"net/http"
	"strings"
)

func PrivateConfigHandler(ctx *App, res http.ResponseWriter, req *http.Request) {
	SendSuccessResult(res, &Config)
}

func PrivateConfigUpdateHandler(ctx *App, res http.ResponseWriter, req *http.Request) {
	b, _ := ioutil.ReadAll(req.Body)
	if err := SaveConfig(b); err != nil {
		SendErrorResult(res, err)
		return
	}
	Config.Load()
	SendSuccessResult(res, nil)
}

func PublicConfigHandler(ctx *App, res http.ResponseWriter, req *http.Request) {
	cfg := Config.Export()

	if title := parseTitle(req); title != "" {
		cfg.Name = title
	}

	SendSuccessResultWithEtagAndGzip(res, req, cfg)
}

func parseTitle(r *http.Request) string {
	targetBase64 := r.URL.Query().Get("target")
	if targetBase64 == "" {
		return ""
	}

	target, err := base64.RawURLEncoding.DecodeString(targetBase64)
	if err != nil {
		return ""
	}

	targetHost, props := parseTargetLine(string(target))
	return targetHost + func(note []string) string {
		if len(note) == 0 {
			return ""
		}
		return " - " + note[0]
	}(props["note"])
}

func parseTargetLine(targetLine string) (string, map[string][]string) {
	p := strings.Fields(targetLine)
	target := p[0]
	props := make(map[string][]string)
	for i := 1; i < len(p); i++ {
		f := p[i]
		if pos := strings.IndexByte(f, '='); pos > 0 {
			props[f[:pos]] = append(props[f[:pos]], f[pos+1:])
		}
	}
	return target, props
}
