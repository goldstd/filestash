(self.webpackChunkfilestash=self.webpackChunkfilestash||[]).push([[2459],{76632:(e,r,i)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),i(1715),CodeMirror.__mode="diff",r.default=CodeMirror},1715:(e,r,i)=>{!function(e){"use strict";e.defineMode("diff",(function(){var e={"+":"positive","-":"negative","@":"meta"};return{token:function(r){var i=r.string.search(/[\t ]+?$/);if(!r.sol()||0===i)return r.skipToEnd(),("error "+(e[r.string.charAt(0)]||"")).replace(/ $/,"");var t=e[r.peek()]||r.skipToEnd();return-1===i?r.skipToEnd():r.pos=i,t}}})),e.defineMIME("text/x-diff","diff")}(i(4631))}}]);