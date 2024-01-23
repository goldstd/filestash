package routes

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/mickael-kerjean/filestash/server/common"
	_ "github.com/mickael-kerjean/filestash/server/plugin"
)

func Routers() *mux.Router {
	return Build(common.App{})
}

func Start(port int) {
	common.Log.Info("[http] starting ...")
	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: Routers(),
	}
	common.Log.Info(fmt.Sprintf("[http] listening on :%d", port))
	if err := srv.ListenAndServe(); err != nil {
		common.Log.Error("error: %v", err)
		return
	}
}
