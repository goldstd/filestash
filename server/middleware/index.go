package middleware

import (
	. "github.com/mickael-kerjean/filestash/server/common"
	"net/http"
	"time"
)

type Middleware func(func(*App, http.ResponseWriter, *http.Request)) func(*App, http.ResponseWriter, *http.Request)

func NewMiddlewareChain(fn func(*App, http.ResponseWriter, *http.Request), m []Middleware, app App) http.HandlerFunc {

	return func(res http.ResponseWriter, req *http.Request) {
		var resw ResponseWriter = NewResponseWriter(res)
		var f func(*App, http.ResponseWriter, *http.Request) = fn
		for i := len(m) - 1; i >= 0; i-- {
			f = m[i](f)
		}
		app.Context = req.Context()
		f(&app, &resw, req)
		if req.Body != nil {
			req.Body.Close()
		}
		go Logger(app, &resw, req)
	}
}

type ResponseWriter struct {
	http.ResponseWriter
	status int
	start  time.Time
}

func NewResponseWriter(res http.ResponseWriter) ResponseWriter {
	return ResponseWriter{
		ResponseWriter: res,
		start:          time.Now(),
	}
}

func (w *ResponseWriter) WriteHeader(status int) {
	w.status = status
	w.ResponseWriter.WriteHeader(status)
}

func (w *ResponseWriter) Write(b []byte) (int, error) {
	if w.status == 0 {
		w.status = 200
	}
	return w.ResponseWriter.Write(b)
}

type LogEntry struct {
	Host       string  `json:"host"`
	Method     string  `json:"method"`
	RequestURI string  `json:"pathname"`
	Proto      string  `json:"proto"`
	Status     int     `json:"status"`
	Scheme     string  `json:"scheme"`
	UserAgent  string  `json:"userAgent"`
	Ip         string  `json:"ip"`
	Referer    string  `json:"referer"`
	Duration   float64 `json:"responseTime"`
	Version    string  `json:"version"`
	Backend    string  `json:"backend"`
	Share      string  `json:"share"`
	License    string  `json:"license"`
	Session    string  `json:"session"`
	RequestID  string  `json:"requestID"`
}

func Logger(ctx App, res http.ResponseWriter, req *http.Request) {
	if obj, ok := res.(*ResponseWriter); ok && req.RequestURI != "/about" {
		point := LogEntry{
			Version:    APP_VERSION + "." + BUILD_DATE,
			License:    LICENSE,
			Scheme:     req.URL.Scheme,
			Host:       req.Host,
			Method:     req.Method,
			RequestURI: req.RequestURI,
			Proto:      req.Proto,
			Status:     obj.status,
			UserAgent:  req.Header.Get("User-Agent"),
			Ip:         req.RemoteAddr,
			Referer:    req.Referer(),
			Duration:   float64(time.Now().Sub(obj.start)) / (1000 * 1000),
			Backend: func() string {
				if ctx.Session["type"] == "" {
					return "null"
				}
				return ctx.Session["type"]
			}(),
			Share: func() string {
				if ctx.Share.Id == "" {
					return "null"
				}
				return ctx.Share.Id
			}(),
			Session: func() string {
				if ctx.Session["type"] == "" {
					return "null"
				}
				return GenerateID(&ctx)
			}(),
			RequestID: func() string {
				defer func() string {
					if r := recover(); r != nil {
						Log.Debug("middleware::index get header '%s'", r)
					}
					return "null"
				}()
				return res.Header().Get("X-Request-ID")
			}(),
		}
		if Config.Get("log.enable").Bool() {
			Log.Stdout("HTTP %3d %3s %6.1fms %s", point.Status, point.Method, point.Duration, point.RequestURI)
		}
	}
}
