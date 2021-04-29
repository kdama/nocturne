_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[7],{"/EDR":function(e,o,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t("23aj")}])},"23aj":function(e,o,t){"use strict";function n(e,o,t){return o in e?Object.defineProperty(e,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[o]=t,e}t.r(o);var r=t("q1tI"),a=t.n(r),i=t("o0o1"),u=t.n(i);function l(e,o,t,n,r,a,i){try{var u=e[a](i),l=u.value}catch(c){return void t(c)}u.done?o(l):Promise.resolve(l).then(n,r)}function c(e){return function(){var o=this,t=arguments;return new Promise((function(n,r){var a=e.apply(o,t);function i(e){l(a,n,r,i,u,"next",e)}function u(e){l(a,n,r,i,u,"throw",e)}i(void 0)}))}}function s(e,o){for(var t=0;t<o.length;t++){var n=o[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function p(e,o){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);o&&(n=n.filter((function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var o=1;o<arguments.length;o++){var t=null!=arguments[o]?arguments[o]:{};o%2?p(Object(t),!0).forEach((function(o){n(e,o,t[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))}))}return e}var d=function(){function e(o){var t=o.playOptions;!function(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}(this,e),n(this,"audioContext",void 0),n(this,"bufferSource",void 0),n(this,"gain",void 0),n(this,"playOptions",void 0),console.log("audio context creating..."),this.audioContext=new AudioContext,this.bufferSource=null,this.gain=null,this.playOptions=t,console.log("audio context successfully created")}var o,t,r;return o=e,(t=[{key:"play",value:function(e){var o=this,t=e.file,n=e.onNextLoop,r=new FileReader;r.onloadend=c(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==r.result&&"string"!==typeof r.result){e.next=3;break}return console.log("file load failed"),e.abrupt("return");case 3:if(console.log("file successfully loaded"),console.log("audio preparing..."),o.bufferSource=o.audioContext.createBufferSource(),o.gain=o.audioContext.createGain(),null!==o.bufferSource&&null!==o.gain){e.next=10;break}return console.log("bufferSource or gain not initialized (bug?)"),e.abrupt("return");case 10:return o.bufferSource.connect(o.gain),o.gain.connect(o.audioContext.destination),console.log("audio successfully prepared"),console.log("audio decoding..."),e.next=16,o.audioContext.decodeAudioData(r.result);case 16:t=e.sent,console.log("audio successfully decoded"),console.log("audio play starting..."),o.bufferSource.buffer=t,o.bufferSource.playbackRate.setValueAtTime(o.playOptions.speed,0),o.gain.gain.setValueAtTime(o.playOptions.volume,0),o.bufferSource.start(0),console.log("audio play successfully started"),a=function(){var e=c(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("audio stopped"),o.bufferSource&&o.playOptions.loop&&(console.log("next loop starting..."),o.playOptions.randomizeSpeedEachLoop&&(o.playOptions=f(f({},o.playOptions),{},{speed:.01*Math.round((1.75*Math.random()+.25)/.01)})),o.bufferSource=o.audioContext.createBufferSource(),o.gain=o.audioContext.createGain(),o.bufferSource.connect(o.gain),o.gain.connect(o.audioContext.destination),o.bufferSource.buffer=t,o.bufferSource.playbackRate.setValueAtTime(o.playOptions.speed,0),o.gain.gain.setValueAtTime(o.playOptions.volume,0),o.bufferSource.start(0),o.bufferSource.onended=a,n({nextPlayOptions:o.playOptions}),console.log("next loop successfully started"));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),o.bufferSource.onended=a;case 26:case"end":return e.stop()}}),e)}))),r.readAsArrayBuffer(t),console.log("file read started")}},{key:"stop",value:function(){this.bufferSource&&(console.log("audio stopping..."),this.bufferSource.onended=null,this.bufferSource.stop(0),console.log("audio successfully stopped"))}},{key:"setPlayOptions",value:function(e){this.playOptions=e,null!==this.bufferSource&&null!==this.gain&&(this.bufferSource.playbackRate.setValueAtTime(this.playOptions.speed,0),this.gain.gain.setValueAtTime(this.playOptions.volume,0))}}])&&s(o.prototype,t),r&&s(o,r),e}(),b=a.a.createElement;function g(e,o){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);o&&(n=n.filter((function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable}))),t.push.apply(t,n)}return t}function y(e){for(var o=1;o<arguments.length;o++){var t=null!=arguments[o]?arguments[o]:{};o%2?g(Object(t),!0).forEach((function(o){n(e,o,t[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):g(Object(t)).forEach((function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))}))}return e}o.default=function(){var e=Object(r.useState)(null),o=e[0],t=e[1],n=Object(r.useState)(!1),a=n[0],i=n[1],u=Object(r.useState)({loop:!1,randomizeSpeedEachLoop:!1,speed:1,volume:1}),l=u[0],c=u[1];function s(e){var t=y(y({},l),e);if(!o)return console.log("audio not initialized (bug?)"),void c(t);o.setPlayOptions(t),c(t)}return Object(r.useEffect)((function(){t(new d({playOptions:l}))}),[]),b("div",{style:{backgroundColor:a?"lightyellow":"white",height:"100%",left:0,position:"absolute",top:0,width:"100%"},onDragOver:function(e){e.stopPropagation(),e.preventDefault(),i(!0)},onDrop:function(e){if(console.log("file select detected"),e.stopPropagation(),e.preventDefault(),i(!1),o){var t=e.dataTransfer.files[0];o.stop(),o.play({file:t,onNextLoop:function(e){var o=e.nextPlayOptions;c(o)}})}else console.log("audio not initialized (bug?)")},onDragLeave:function(e){i(!1)}},b("ul",null,b("li",null,"Volume:",b("input",{type:"range",min:"0",max:"2",step:"0.01",value:l.volume,onChange:function(e){s({volume:Number(e.target.value)})}}),l.volume),b("li",null,"Speed:",b("input",{type:"range",min:"0.25",max:"2",step:"0.01",value:l.speed.toFixed(2),onChange:function(e){s({speed:Number(e.target.value)})}}),l.speed),b("li",null,"Loop:",b("input",{type:"checkbox",checked:l.loop,onChange:function(e){s({loop:e.target.checked})}}),l.loop?"Enabled":"Disabled"),l.loop&&b("ul",null,b("li",null,"Randomize speed:",b("input",{type:"checkbox",checked:l.randomizeSpeedEachLoop,onChange:function(e){s({randomizeSpeedEachLoop:e.target.checked})}}),l.randomizeSpeedEachLoop?"Enabled":"Disabled"))))}}},[["/EDR",0,2,1]]]);