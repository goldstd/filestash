(self.webpackChunkfilestash=self.webpackChunkfilestash||[]).push([[885],{7662:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var a=[],r=!0,n=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(r=(c=i.next()).done)&&(a.push(c.value),!t||a.length!==t);r=!0);}catch(e){n=!0,o=e}finally{try{!r&&i.return&&i.return()}finally{if(n)throw o}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};t.AudioPlayer=function(e){var t=e.filename,a=e.data,m=(0,n.useRef)(null),y=(0,n.useState)(!1),_=r(y,2),g=_[0],b=_[1],x=(0,n.useState)(!0),h=r(x,2),v=h[0],E=h[1],k=(0,n.useState)(null===(0,d.settings_get)("volume")?50:(0,d.settings_get)("volume")),w=r(k,2),S=w[0],C=w[1],I=(0,n.useState)(0),N=r(I,2),T=N[0],D=N[1],M=(0,n.useState)(0),A=r(M,2),R=A[0],L=A[1],O=(0,n.useState)(!1),P=r(O,2),G=P[0],V=P[1],F=(0,n.useState)(0),K=r(F,2),U=K[0],H=K[1],z=(0,n.useState)(null),B=r(z,2),j=B[0],q=B[1],W=(0,n.useState)(0),J=r(W,2),X=J[0],Y=J[1];(0,n.useEffect)((function(){return f=0,m.current=c.default.create({container:"#waveform",interact:!1,waveColor:"#323639",progressColor:"#808080",cursorColor:"#6f6f6f",cursorWidth:3,height:200,barWidth:1}),window.wavesurfer={},m.current.load(a),m.current.on("ready",(function(){Y(100),E(!1),L(m.current.getDuration()),m.current.setVolume(S/100),m.current.backend.createSource(),m.current.backend.startPosition=0,m.current.backend.lastPlay=0,m.current.backend.source.start(0,0),g?m.current.backend.ac.resume():m.current.backend.ac.suspend()})),m.current.on("loading",(function(e){Y(e)})),m.current.on("error",(function(e){E(!1),q(e)})),function(){m.current.destroy()}}),[a]),(0,n.useEffect)((function(){var e=function(e){switch(e.code){case"Space":case"KeyK":return g?$():Z();case"KeyM":return Q(0);case"ArrowUp":return Q(Math.min(S+10,100));case"ArrowDown":return Q(Math.max(S-10,0));case"KeyL":return ee(f+10);case"KeyJ":return ee(f-10);case"KeyF":return te();case"Digit0":return ee(0);case"Digit1":return ee(R/10);case"Digit2":return ee(2*R/10);case"Digit3":return ee(3*R/10);case"Digit4":return ee(4*R/10);case"Digit5":return ee(5*R/10);case"Digit6":return ee(6*R/10);case"Digit7":return ee(7*R/10);case"Digit8":return ee(8*R/10);case"Digit9":return ee(9*R/10)}};return window.addEventListener("keydown",e),function(){return window.removeEventListener("keydown",e)}}),[U,g,G,R,S]),(0,n.useEffect)((function(){var e=s.Chromecast.context();if(e){document.getElementById("chromecast-target").append(document.createElement("google-cast-launcher"));var t=function(e){switch(e.sessionState){case cast.framework.SessionState.SESSION_STARTING:V(!0),E(!0);break;case cast.framework.SessionState.SESSION_START_FAILED:V(!1),E(!1);break;case cast.framework.SessionState.SESSION_STARTED:te();break;case cast.framework.SessionState.SESSION_ENDING:m.current.setMute(!1),m.current.seekTo(f/m.current.getDuration()),V(!1),C(100*m.current.getVolume());var t=s.Chromecast.media();t&&"PLAYING"===t.playerState?m.current.play():t&&"PAUSED"===t.playerState&&m.current.pause();break;case cast.framework.SessionState.SESSION_ENDED:m.current.seekTo(f/m.current.getDuration()),m.current.setMute(!1),V(!1),C(100*m.current.getVolume())}};return e.addEventListener(cast.framework.CastContextEventType.SESSION_STATE_CHANGED,t),function(){e.removeEventListener(cast.framework.CastContextEventType.SESSION_STATE_CHANGED,t)}}}),[]),(0,n.useEffect)((function(){if(!0!==v&&!1!==g){if(!1===G){var e=setInterval((function(){D(f+=.02),m.current.drawer.progress(f/R)}),20);return function(){return clearInterval(e)}}var t=s.Chromecast.media();if(t){var a=new cast.framework.RemotePlayer,r=new cast.framework.RemotePlayerController(a),n=function(e){f=e.value,D(e.value),m.current.drawer.progress(e.value/R)},o=function(e){t.playerState===chrome.cast.media.PlayerState.IDLE&&t.idleReason===chrome.cast.media.IdleReason.FINISHED&&(m.current.seekTo(f/m.current.getDuration()),m.current.pause(),m.current.setMute(!1),C(100*m.current.getVolume()),V(!1),b(!1))};return t.addUpdateListener(o),r.addEventListener(cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED,n),function(){t.removeUpdateListener(o),r.removeEventListener(cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED,n)}}}}),[G,v,g,U,R]);var Q=function(e){if(C(e),G){var t=s.Chromecast.session();t?t.setVolume(e/100):(V(!1),d.notify.send((0,p.t)("Cannot establish a connection"),"error"))}else m.current.setVolume(e/100),(0,d.settings_put)("volume",e)},Z=function(e){if(b(!0),G){var t=s.Chromecast.media();t&&t.play()}else m.current.backend.disconnectSource(),m.current.backend.createSource(),m.current.backend.source.start(0,f),m.current.backend.ac.resume()},$=function(e){if(b(!1),G){var t=s.Chromecast.media();t&&t.pause()}else m.current.backend.ac.suspend(),m.current.backend.source.stop(0)},ee=function(e){if(D(f=e),m.current.drawer.progress(f/R),G){var t=s.Chromecast.media();if(!t)return;var a=new chrome.cast.media.SeekRequest;a.currentTime=parseInt(f),t.seek(a)}else m.current.backend.source.stop(0),m.current.backend.disconnectSource(),m.current.backend.createSource(),m.current.backend.startPosition=f,m.current.backend.source.start(0,T),g?m.current.backend.ac.resume():m.current.backend.ac.suspend()},te=function(){var e=s.Chromecast.createLink(a),r=new chrome.cast.media.MediaInfo(e,(0,d.getMimeType)(a));r.metadata=new chrome.cast.media.MusicTrackMediaMetadata,r.metadata.title=t.substr(0,t.lastIndexOf(i.default.extname(t))),r.metadata.subtitle=CONFIG.name,r.metadata.albumName=CONFIG.name,r.metadata.images=[new chrome.cast.Image(origin+"/assets/icons/music.png")],V(!0),E(!1),b(!0),m.current.setMute(!0),m.current.pause();var n=s.Chromecast.session();n&&(C(100*n.getVolume()),s.Chromecast.createRequest(r).then((function(e){return e.currentTime=parseInt(f),n.loadMedia(e)})).then((function(){H(U+1)})).catch((function(e){console.error(e),d.notify.send((0,p.t)("Cannot establish a connection"),"error"),V(!1),E(!1)})))};return o.default.createElement("div",{className:"component_audioplayer"},o.default.createElement(u.MenuBar,{title:t,download:a},s.Chromecast.session()&&!1===G&&o.default.createElement(l.Icon,{name:"fullscreen",onClick:function(){s.Chromecast.session()&&te()}})),o.default.createElement("div",{className:"audioplayer_container"},o.default.createElement(l.NgIf,{cond:null!==j,className:"audioplayer_error"},j),o.default.createElement(l.NgIf,{cond:null===j},o.default.createElement("div",{className:"audioplayer_box"},o.default.createElement(l.NgIf,{cond:v},G?o.default.createElement("div",{className:"chromecast_loader"},o.default.createElement(l.Icon,{name:"loading"})):o.default.createElement(o.default.Fragment,null,o.default.createElement("div",{className:"audioplayer_loader",style:{width:X+"%"}}),o.default.createElement("span",{className:"percent"},X,"%"),o.default.createElement(l.Icon,{name:"loading"}))),o.default.createElement("div",{id:"waveform",onClick:function(e){return function(e){var t=e.target.getBoundingClientRect();f=R*(e.clientX-t.x)/t.width,ee(f)}(e)}}),o.default.createElement("div",{className:"audioplayer_control",style:{opacity:v?0:1}},o.default.createElement("div",{className:"buttons no-select"},g?o.default.createElement("span",{onClick:$},o.default.createElement(l.Icon,{name:"pause"})):o.default.createElement("span",{onClick:Z},o.default.createElement(l.Icon,{name:"play"})),o.default.createElement("span",null,o.default.createElement(l.Icon,{onClick:function(){return Q(0)},name:0===S?"volume_mute":S<50?"volume_low":"volume"})),o.default.createElement("input",{onChange:function(e){return Q(Number(e.target.value)||0)},type:"range",min:"0",max:"100",value:S})),o.default.createElement("div",{className:"timecode"},o.default.createElement("span",{id:"currentTime"},(0,d.formatTimecode)(T)),o.default.createElement("span",{id:"separator",className:"no-select"},"/"),o.default.createElement("span",{id:"totalDuration"},(0,d.formatTimecode)(R))))))))};var n=a(67294),o=m(n),c=m(a(289)),i=m(a(26470)),u=a(8589),l=a(57995),d=a(71037),s=a(34663),p=a(4070);function m(e){return e&&e.__esModule?e:{default:e}}a(80050);var f=0},80050:(e,t,a)=>{"use strict";var r=a(84131);"string"==typeof r&&(r=[[e.id,r,""]]),a(76723)(r,{hmr:!0,transform:void 0,insertInto:void 0}),r.locals&&(e.exports=r.locals)},84131:(e,t,a)=>{(e.exports=a(9252)(!1)).push([e.id,"body:not(.dark-mode) .component_audioplayer>.audioplayer_container{background:#525659}.component_audioplayer{display:flex;flex-direction:column;flex:1;width:100%}.component_audioplayer>.audioplayer_container{display:flex;flex-direction:column;flex:1;width:100%;text-align:center;height:100%;overflow:hidden;padding:20px;box-sizing:border-box}.component_audioplayer>.audioplayer_container .audioplayer_error{color:#fff;margin-top:30px}.component_audioplayer>.audioplayer_container .audioplayer_box{background:#f1f1f1;box-shadow:rgba(0,0,0,.14) 0px 4px 5px 0px,rgba(0,0,0,.12) 0px 1px 10px 0px,rgba(0,0,0,.2) 0px 2px 4px -1px;position:relative;border-radius:3px;padding:10px 0 30px 0}.component_audioplayer>.audioplayer_container .audioplayer_box .audioplayer_control{padding-top:20px}.component_audioplayer>.audioplayer_container .audioplayer_box .audioplayer_control img{height:25px;width:25px;cursor:pointer}.component_audioplayer>.audioplayer_container .audioplayer_box .audioplayer_control .buttons{float:left;padding-left:15px;margin-top:-10px;display:flex}.component_audioplayer>.audioplayer_container .audioplayer_box .audioplayer_control .buttons>span{margin-right:10px}.component_audioplayer>.audioplayer_container .audioplayer_box .audioplayer_control .buttons input[type=range]{margin-left:-5px;width:60px;cursor:pointer;outline:none;-webkit-appearance:none;background:rgba(0,0,0,0)}.component_audioplayer>.audioplayer_container .audioplayer_box .audioplayer_control .buttons input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;height:12px;width:12px;border:none;border-radius:50%;background:#6f6f6f;margin-top:-5px}.component_audioplayer>.audioplayer_container .audioplayer_box .audioplayer_control .buttons input[type=range]::-moz-range-thumb{-webkit-appearance:none;height:12px;width:12px;border:none;border-radius:50%;background:#6f6f6f;margin-top:-5px}.component_audioplayer>.audioplayer_container .audioplayer_box .audioplayer_control .buttons input[type=range]::-webkit-slider-runnable-track{width:100%;height:2px;background-color:#6f6f6f;border-radius:2px}.component_audioplayer>.audioplayer_container .audioplayer_box .audioplayer_control .buttons input[type=range]::-moz-range-track{width:100%;height:2px;background-color:#6f6f6f;border-radius:2px}.component_audioplayer>.audioplayer_container .audioplayer_box .audioplayer_control .timecode{float:right;padding-right:25px;margin-top:-5px}.component_audioplayer>.audioplayer_container .audioplayer_box .audioplayer_control .timecode #separator{padding:0 5px}@media screen and (max-width: 450px){.component_audioplayer>.audioplayer_container .audioplayer_box .audioplayer_control .timecode #separator,.component_audioplayer>.audioplayer_container .audioplayer_box .audioplayer_control .timecode #currentTime{display:none}}.component_audioplayer>.audioplayer_container .audioplayer_box .audioplayer_loader{height:260px;background:var(--color);position:absolute;opacity:.1;top:0;left:0}.component_audioplayer>.audioplayer_container .audioplayer_box .component_icon[alt=loading]{position:absolute;margin:50px 0px}.component_audioplayer>.audioplayer_container .audioplayer_box .chromecast_loader .component_icon[alt=loading]{margin:0;right:20px;top:20px;width:30px}.component_audioplayer>.audioplayer_container .audioplayer_box .percent{position:absolute;margin:100px 0px;width:120px;font-size:1.4rem}",""])}}]);