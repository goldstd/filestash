package plg_starter_http

import (
	"fmt"
	"github.com/gorilla/mux"
	. "github.com/mickael-kerjean/filestash/server/common"
	"net/http"
)

func init() {
	port := Config.Get("general.port").Int()

	Hooks.Register.Starter(func(r *mux.Router) {
		Log.Info("[http] starting ...")
		srv := &http.Server{
			Addr:    fmt.Sprintf(":%d", port),
			Handler: r,
		}
		Log.Info(fmt.Sprintf("[http] listening on :%d", port))
		if err := srv.ListenAndServe(); err != nil {
			Log.Error("error: %v", err)
			return
		}
	})
}
