package plugin

import (
	"github.com/mickael-kerjean/filestash/server/common"
	_ "github.com/mickael-kerjean/filestash/server/plugin/plg_backend_sftp"
	_ "github.com/mickael-kerjean/filestash/server/plugin/plg_image_ascii"
	_ "github.com/mickael-kerjean/filestash/server/plugin/plg_image_transcode"
	_ "github.com/mickael-kerjean/filestash/server/plugin/plg_search_stateless"
	_ "github.com/mickael-kerjean/filestash/server/plugin/plg_security_scanner"
	_ "github.com/mickael-kerjean/filestash/server/plugin/plg_security_svg"
	_ "github.com/mickael-kerjean/filestash/server/plugin/plg_video_transcoder"
)

func init() {
	common.Log.Debug("Plugin loader")
}
