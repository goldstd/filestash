(self.webpackChunkfilestash=self.webpackChunkfilestash||[]).push([[6791],{58022:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{!n&&c.return&&c.return()}finally{if(o)throw a}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};t.VideoPlayer=function(e){var t=e.filename,r=e.data,f=e.path,y=(0,o.useRef)(),_=(0,o.useRef)(),h=(0,o.useState)(!1),E=n(h,2),b=E[0],x=E[1],w=(0,o.useState)(!0),S=n(w,2),k=S[0],A=S[1],N=(0,o.useState)(!1),C=n(N,2),I=C[0],T=C[1],L=(0,o.useState)(null===(0,l.settings_get)("volume")?50:(0,l.settings_get)("volume")),R=n(L,2),D=R[0],M=R[1],U=(0,o.useState)(0),P=n(U,2),J=P[0],H=P[1],O=(0,o.useState)(0),z=n(O,2),F=z[0],G=z[1],K=(0,o.useState)(!1),B=n(K,2),q=B[0],V=B[1],Y=(0,o.useState)(0),Z=n(Y,2),j=Z[0],X=Z[1],W=(0,o.useState)(null),Q=n(W,2),$=Q[0],ee=Q[1],te=(0,o.useState)([]),re=n(te,2),ne=re[0],oe=re[1];(0,o.useEffect)((function(){if(y.current){var e=function(){y.current.volume=D/100,G(y.current.duration),A(!1)},t=function(){x(!1)},n=function(e){console.error(e),l.notify.send((0,p.t)("Not supported"),"error"),x(!1),A(!1)},o=function(e){T(!0)},a=function(e){T(!1)};window.overrides["video-map-sources"]||(window.overrides["video-map-sources"]=function(e){return e});var i=window.overrides["video-map-sources"]([{src:r,type:(0,l.getMimeType)(r)}]);oe(i.map((function(e){if("application/x-mpegURL"!==e.type&&"application/vnd.apple.mpegurl"!==e.type)return e;var t=new v.default({enableWorker:!1});return t.loadSource(e.src),t.attachMedia(y.current),e}))),y.current.addEventListener("loadeddata",e),y.current.addEventListener("ended",t),y.current.addEventListener("error",n),y.current.addEventListener("waiting",o),y.current.addEventListener("playing",a);for(var c=y.current.querySelectorAll("source"),s=0;s<c.length;s++)c[s].addEventListener("error",n);return function(){y.current.removeEventListener("loadeddata",e),y.current.removeEventListener("ended",t),y.current.removeEventListener("error",n),y.current.removeEventListener("waiting",o),y.current.removeEventListener("playing",a);for(var r=0;r<c.length;r++)c[r].removeEventListener("error",n)}}}),[y,r]),(0,o.useEffect)((function(){var e=function(){return X(j+1)},t=function(e){switch(e.code){case"Space":case"KeyK":return b?ce(e):ie(e);case"KeyM":return ae(0);case"ArrowUp":return ae(Math.min(D+10,100));case"ArrowDown":return ae(Math.max(D-10,0));case"KeyL":return se(g+10);case"KeyJ":return se(g-10);case"KeyF":return onRequestFullscreen();case"Digit0":return se(0);case"Digit1":return se(F/10);case"Digit2":return se(2*F/10);case"Digit3":return se(3*F/10);case"Digit4":return se(4*F/10);case"Digit5":return se(5*F/10);case"Digit6":return se(6*F/10);case"Digit7":return se(7*F/10);case"Digit8":return se(8*F/10);case"Digit9":return se(9*F/10)}};return window.addEventListener("resize",e),window.addEventListener("keydown",t),function(){window.removeEventListener("resize",e),window.removeEventListener("keydown",t)}}),[j,b,q,D]),(0,o.useEffect)((function(){var e=u.Chromecast.context();if(e){document.getElementById("chromecast-target").append(document.createElement("google-cast-launcher"));var t=function(e){switch(e.sessionState){case cast.framework.SessionState.SESSION_STARTING:V(!0),A(!0);break;case cast.framework.SessionState.SESSION_START_FAILED:V(!1),A(!1);break;case cast.framework.SessionState.SESSION_STARTED:de();break;case cast.framework.SessionState.SESSION_ENDING:y.current.currentTime=g,y.current.muted=!1,V(!1),M(100*y.current.volume);var t=u.Chromecast.media();t&&"PLAYING"===t.playerState?y.current.play():t&&"PAUSED"===t.playerState&&y.current.pause();break;case cast.framework.SessionState.SESSION_ENDED:V(!1),M(100*y.current.volume),y.current.currentTime=g,y.current.muted=!1}};return e.addEventListener(cast.framework.CastContextEventType.SESSION_STATE_CHANGED,t),function(){e.removeEventListener(cast.framework.CastContextEventType.SESSION_STATE_CHANGED,t)}}}),[]),(0,o.useEffect)((function(){if(!0!==k){if(!1===q){var e=function(e){g=y.current.currentTime,H(g)};return y.current.addEventListener("timeupdate",e),function(){return y.current.removeEventListener("timeupdate",e)}}var t=u.Chromecast.media();if(t){var r=new cast.framework.RemotePlayer,n=new cast.framework.RemotePlayerController(r),o=function(e){switch(e.value){case"BUFFERING":T(!0);break;case"PLAYING":T(!1)}},a=function(e){g=e.value,H(e.value)},i=function(e){t.playerState===chrome.cast.media.PlayerState.IDLE&&t.idleReason===chrome.cast.media.IdleReason.FINISHED&&(x(!1),V(!1),M(100*y.current.volume),y.current.currentTime=g,y.current.muted=!1)};return t.addUpdateListener(i),n.addEventListener(cast.framework.RemotePlayerEventType.PLAYER_STATE_CHANGED,o),n.addEventListener(cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED,a),function(){t.removeUpdateListener(i),n.removeEventListener(cast.framework.RemotePlayerEventType.PLAYER_STATE_CHANGED,o),n.removeEventListener(cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED,a)}}}}),[q,k,j]);var ae=function(e){if(M(e),q){var t=u.Chromecast.session();t?t.setVolume(e/100):(V(!1),l.notify.send((0,p.t)("Cannot establish a connection"),"error"))}else y.current.volume=e/100,(0,l.settings_put)("volume",e)},ie=function(){if(x(!0),q){var e=u.Chromecast.media();e&&e.play()}else y.current.play()},ce=function(){if(x(!1),q){var e=u.Chromecast.media();e&&e.pause()}else y.current.pause()},se=function(e){if(q){var t=u.Chromecast.media();if(!t)return;T(!0);var r=new chrome.cast.media.SeekRequest;r.currentTime=parseInt(e),t.seek(r)}else y.current.currentTime=e},de=function(){var e=u.Chromecast.createLink(r),n=new chrome.cast.media.MediaInfo(e,(0,l.getMimeType)(r));n.metadata=new chrome.cast.media.MovieMediaMetadata,n.metadata.title=t.substr(0,t.lastIndexOf(c.default.extname(t))),n.metadata.subtitle=CONFIG.name,n.metadata.images=[new chrome.cast.Image(origin+"/assets/icons/video.png")],V(!0),A(!1),x(!0),T(!1),y.current.muted=!0,y.current.pause();var o=u.Chromecast.session();if(o)return M(100*o.getVolume()),u.Chromecast.createRequest(n).then((function(e){return e.currentTime=parseInt(g),o.loadMedia(e)})).then((function(){return X(j+1)})).catch((function(e){console.error(e),l.notify.send((0,p.t)("Cannot establish a connection"),"error"),V(!1),A(!1)}))};return a.default.createElement("div",{className:"component_videoplayer"},a.default.createElement(d.MenuBar,{title:t,download:r},a.default.createElement(m.Icon,{name:"fullscreen",onClick:function(){u.Chromecast.session()?de():(document.querySelector(".video_screen").requestFullscreen(),requestAnimationFrame((function(){return X(j+1)})))}})),a.default.createElement("div",{className:"video_container",ref:_},a.default.createElement(i.default,{transitionName:"video",transitionAppear:!0,transitionLeave:!1,transitionEnter:!0,transitionEnterTimeout:300,transitionAppearTimeout:300},a.default.createElement("div",{className:"video_screen"+(I?" video-state-buffer":b?" video-state-play":" video-state-pause")+(q?" is-casting-yes":" is-casting-no")},a.default.createElement("div",{className:"video_wrapper",style:_.current&&window.innerHeight===screen.height?{maxHeight:"inherit",height:"inherit"}:{maxHeight:(_.current||{}).clientHeight-100||0}},a.default.createElement("video",{onClick:function(){return b?ce():ie()},ref:y},ne.map((function(e,t){return a.default.createElement("source",{key:t,src:e.src,type:e.type})})))),k&&a.default.createElement("div",{className:"loader no-select"},a.default.createElement(m.Icon,{name:"loading"})),F>0&&a.default.createElement("div",{className:"videoplayer_control no-select"},a.default.createElement("div",{className:"progress",onClick:function(e){var t=e.target;0==e.target.classList.contains("progress")&&(t=e.target.parentElement);var r=t.getBoundingClientRect();e.persist();var n=(e.clientX-r.x)/r.width;n<.02&&(ce(),n=0),H(g=n*F),se(g)},onMouseMove:function(e){var t=e.target.getBoundingClientRect(),r=e.clientX-t.x,n=F*r/t.width,o=r;o=Math.max(o,30),o=Math.min(o,e.target.clientWidth-30),ee({x:o+"px",time:n})},onMouseLeave:function(){return ee(null)}},!1===q&&(y.current?a.default.createElement(a.default.Fragment,null,Array.apply(null,{length:y.current.buffered.length}).map((function(e,t){return a.default.createElement("div",{className:"progress-buffer",key:t,style:{left:function(e){return y.current.buffered.start(e)/F*100}(t)+"%",width:function(e){return(y.current.buffered.end(e)-y.current.buffered.start(e))/F*100}(t)+"%"}})}))):null),a.default.createElement("div",{className:"progress-active",style:{width:100*J/(F||1)+"%"}},a.default.createElement("div",{className:"thumb"})),a.default.createElement("div",{className:"progress-placeholder"})),k||I?a.default.createElement(m.Icon,{name:"loading"}):b?a.default.createElement(m.Icon,{name:"pause",onClick:ce}):a.default.createElement(m.Icon,{name:"play",onClick:ie}),a.default.createElement(m.Icon,function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}({name:"volume",onClick:function(){return ae(0)}},"name",0===D?"volume_mute":D<50?"volume_low":"volume")),a.default.createElement("input",{type:"range",onChange:function(e){return ae(Number(e.target.value))},value:D,min:"0",max:"100"}),a.default.createElement("span",{className:"timecode"},(0,l.formatTimecode)(J),"  /  ",(0,l.formatTimecode)(F),$&&a.default.createElement("div",{className:"hint",style:{left:$.x}},(0,l.formatTimecode)($.time)))))),a.default.createElement(s.Pager,{path:f})))};var o=r(67294),a=f(o),i=f(r(19081)),c=f(r(26470)),s=r(80798),d=r(8589),u=r(34663),l=r(71037),p=r(4070),m=r(57995),v=f(r(67631));function f(e){return e&&e.__esModule?e:{default:e}}r(52393);var g=0},52393:(e,t,r)=>{"use strict";var n=r(10042);"string"==typeof n&&(n=[[e.id,n,""]]),r(76723)(n,{hmr:!0,transform:void 0,insertInto:void 0}),n.locals&&(e.exports=n.locals)},10042:(e,t,r)=>{(e.exports=r(9252)(!1)).push([e.id,"body:not(.dark-mode) .component_videoplayer{background:#525659}.component_videoplayer{display:flex;flex:1;flex-direction:column;width:100%}.component_videoplayer .video_container{display:flex;flex:1;text-align:center;overflow:hidden;padding:15px 10px 65px 10px;height:100%;box-sizing:border-box}.component_videoplayer .video_container>span{display:flex;flex:1;text-align:center;overflow:hidden;height:100%;box-sizing:border-box}.component_videoplayer .video_container .video_screen{background:#000;box-shadow:rgba(0,0,0,.14) 0px 4px 5px 0px,rgba(0,0,0,.12) 0px 1px 10px 0px,rgba(0,0,0,.2) 0px 2px 4px -1px;position:relative;border-radius:3px;margin:auto;position:relative;width:800px}.component_videoplayer .video_container .video_screen .video_wrapper{height:450px}.component_videoplayer .video_container .video_screen .loader{position:absolute;top:30%;width:100%}.component_videoplayer .video_container .video_screen.is-casting-yes .videoplayer_control,.component_videoplayer .video_container .video_screen.video-state-pause .videoplayer_control,.component_videoplayer .video_container .video_screen.video-state-buffer .videoplayer_control,.component_videoplayer .video_container .video_screen.video-state-play:hover .videoplayer_control{opacity:1;transition:.1s opacity ease}.component_videoplayer .video_container .video_screen .videoplayer_control{transition:.5s opacity ease;opacity:0;display:flex;text-align:left;position:absolute;bottom:0;width:100%;border-bottom-left-radius:3px;border-bottom-right-radius:3px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADCCAYAAACIaaiTAAAAAXNSR0IArs4c6QAAARJJREFUOE9lyNdHBQAAhfHb3nvvuu2997jNe29TJJEkkkgSSSSJJJJEEkkiifRH5jsP56Xz8PM5gcC/xfCIWBNHiXiTQIlEk0SJZJNCiVRIM+mUyDCZlMgy2ZTIMbmUyDP5lCgwhZQoMsWUKDGllCgz5ZSogEpTRYlqU0OJoKmlRJ2pp0SDaaREk2mmRItppUSbaadEh+mkRBd0mx5K9Jo+SvSbAUoMmiFKDJsRSoyaMUqMmwlKhMwkJabMNCVmYNbMUSJsIpSImnlKLJhFSiyZZWoFVmEN1mEDNmELtmEHdmEP9uEADuEIjuEETuEMzuECLuEKruEGbuEO7uEBHuEJnuEFXuEN3uEDPuELvuEHfv8AoRErEi7Uc8UAAAAASUVORK5CYII=);background-repeat:repeat-x;background-size:contain;padding:0 0 7px 0}.component_videoplayer .video_container .video_screen .videoplayer_control img{cursor:pointer;width:25px;filter:brightness(0) invert(1);padding:5px 5px 5px 10px}.component_videoplayer .video_container .video_screen .videoplayer_control input[type=range]{width:60px;cursor:pointer;outline:none;-webkit-appearance:none;background:rgba(0,0,0,0)}.component_videoplayer .video_container .video_screen .videoplayer_control input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;height:12px;width:12px;border:none;border-radius:50%;background:#fff;margin-top:-5px}.component_videoplayer .video_container .video_screen .videoplayer_control input[type=range]::-moz-range-thumb{-webkit-appearance:none;height:12px;width:12px;border:none;border-radius:50%;background:#fff;margin-top:-5px}.component_videoplayer .video_container .video_screen .videoplayer_control input[type=range]::-webkit-slider-runnable-track{width:100%;height:2px;background-color:rgba(255,255,255,.7);border-radius:2px}.component_videoplayer .video_container .video_screen .videoplayer_control input[type=range]::-moz-range-track{width:100%;height:2px;background-color:rgba(255,255,255,.7);border-radius:2px}.component_videoplayer .video_container .video_screen .videoplayer_control .timecode{color:#fff;margin:auto 0;padding-left:10px}.component_videoplayer .video_container .video_screen .videoplayer_control .timecode .hint{position:absolute;top:-40px;margin-left:-23px;font-size:.9rem;background:rgba(241,241,241,.3333333333);border-radius:3px;padding:2px 5px;background:var(--dark)}.component_videoplayer .video_container .video_screen .videoplayer_control .progress{position:absolute;width:100%;top:-20px;height:20px;cursor:pointer}.component_videoplayer .video_container .video_screen .videoplayer_control .progress .progress-active,.component_videoplayer .video_container .video_screen .videoplayer_control .progress .progress-buffer,.component_videoplayer .video_container .video_screen .videoplayer_control .progress .progress-placeholder{top:10px;position:absolute;height:4px}.component_videoplayer .video_container .video_screen .videoplayer_control .progress .progress-active{background:var(--primary);border-top-right-radius:2px;border-bottom-right-radius:2px}.component_videoplayer .video_container .video_screen .videoplayer_control .progress .progress-active .thumb{display:none;float:right;width:4px;height:4px;background:rgba(255,255,255,.1);border-radius:50%;margin-top:0px;position:relative;left:3px}.component_videoplayer .video_container .video_screen .videoplayer_control .progress .progress-buffer{background:rgba(226,226,226,.2666666667)}.component_videoplayer .video_container .video_screen .videoplayer_control .progress .progress-placeholder{background:rgba(226,226,226,.1333333333);width:100%}.component_videoplayer .video_container video{width:100%;height:100%}.component_videoplayer .video_container .video_screen .videoplayer_control:hover .progress .progress-active .thumb{display:block}.video-enter,.video-appear{opacity:0}.video-enter.video-enter-active,.video-appear.video-appear-active{transition:top .3s,right .3s,bottom .3s,left .3s,max-width .3s,max-height .3s;-webkit-animation-name:zoomIn;animation-name:zoomIn;animation-duration:.3s;-webkit-animation-timing-function:cubic-bezier(0.51, 0.92, 0.24, 1.15);animation-timing-function:cubic-bezier(0.51, 0.92, 0.24, 1.15);opacity:1}@keyframes zoomIn{0%{opacity:0;transform:scale(0.85)}100%{opacity:1;transform:scale(1)}}",""])}}]);