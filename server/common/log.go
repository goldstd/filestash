package common

import (
	"log"
)

var Log = func() ILogger {
	l := logger{}
	return &l
}()

type logger struct {
}

func (l *logger) Info(format string, v ...interface{}) {
	log.Printf(format, v...)
}

func (l *logger) Warning(format string, v ...interface{}) {
	log.Printf("W! "+format, v...)
}

func (l *logger) Error(format string, v ...interface{}) {
	log.Printf("E! "+format, v...)
}

func (l *logger) Debug(format string, v ...interface{}) {
	log.Printf("D! "+format, v...)
}

func (l *logger) Stdout(format string, v ...interface{}) {
	log.Printf(format, v...)
}

func (l *logger) Close() {
}

func (l *logger) Enable(val bool) {
}
