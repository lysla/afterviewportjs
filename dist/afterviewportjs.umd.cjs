(function(A,k){typeof exports=="object"&&typeof module<"u"?module.exports=k():typeof define=="function"&&define.amd?define(k):(A=typeof globalThis<"u"?globalThis:A||self,A.afterviewportjs=k())})(this,function(){"use strict";var wt=Object.defineProperty;var Et=(A,k,S)=>k in A?wt(A,k,{enumerable:!0,configurable:!0,writable:!0,value:S}):A[k]=S;var z=(A,k,S)=>(Et(A,typeof k!="symbol"?k+"":k,S),S);var A=(e=>(e[e.Partial=0]="Partial",e[e.In=1]="In",e[e.Out=2]="Out",e))(A||{}),k=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function S(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var de={exports:{}},Z={exports:{}},he;function Ne(){return he||(he=1,function(e){(function(r,t){e.exports?e.exports=t():r.EvEmitter=t()})(typeof window<"u"?window:k,function(){function r(){}let t=r.prototype;return t.on=function(n,a){if(!n||!a)return this;let s=this._events=this._events||{},u=s[n]=s[n]||[];return u.includes(a)||u.push(a),this},t.once=function(n,a){if(!n||!a)return this;this.on(n,a);let s=this._onceEvents=this._onceEvents||{},u=s[n]=s[n]||{};return u[a]=!0,this},t.off=function(n,a){let s=this._events&&this._events[n];if(!s||!s.length)return this;let u=s.indexOf(a);return u!=-1&&s.splice(u,1),this},t.emitEvent=function(n,a){let s=this._events&&this._events[n];if(!s||!s.length)return this;s=s.slice(0),a=a||[];let u=this._onceEvents&&this._onceEvents[n];for(let l of s)u&&u[l]&&(this.off(n,l),delete u[l]),l.apply(this,a);return this},t.allOff=function(){return delete this._events,delete this._onceEvents,this},r})}(Z)),Z.exports}/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */(function(e){(function(r,t){e.exports?e.exports=t(r,Ne()):r.imagesLoaded=t(r,r.EvEmitter)})(typeof window<"u"?window:k,function(t,n){let a=t.jQuery,s=t.console;function u(o){return Array.isArray(o)?o:typeof o=="object"&&typeof o.length=="number"?[...o]:[o]}function l(o,v,d){if(!(this instanceof l))return new l(o,v,d);let c=o;if(typeof o=="string"&&(c=document.querySelectorAll(o)),!c){s.error(`Bad element for imagesLoaded ${c||o}`);return}this.elements=u(c),this.options={},typeof v=="function"?d=v:Object.assign(this.options,v),d&&this.on("always",d),this.getImages(),a&&(this.jqDeferred=new a.Deferred),setTimeout(this.check.bind(this))}l.prototype=Object.create(n.prototype),l.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)};const i=[1,9,11];l.prototype.addElementImages=function(o){o.nodeName==="IMG"&&this.addImage(o),this.options.background===!0&&this.addElementBackgroundImages(o);let{nodeType:v}=o;if(!v||!i.includes(v))return;let d=o.querySelectorAll("img");for(let c of d)this.addImage(c);if(typeof this.options.background=="string"){let c=o.querySelectorAll(this.options.background);for(let b of c)this.addElementBackgroundImages(b)}};const m=/url\((['"])?(.*?)\1\)/gi;l.prototype.addElementBackgroundImages=function(o){let v=getComputedStyle(o);if(!v)return;let d=m.exec(v.backgroundImage);for(;d!==null;){let c=d&&d[2];c&&this.addBackground(c,o),d=m.exec(v.backgroundImage)}},l.prototype.addImage=function(o){let v=new f(o);this.images.push(v)},l.prototype.addBackground=function(o,v){let d=new h(o,v);this.images.push(d)},l.prototype.check=function(){if(this.progressedCount=0,this.hasAnyBroken=!1,!this.images.length){this.complete();return}let o=(v,d,c)=>{setTimeout(()=>{this.progress(v,d,c)})};this.images.forEach(function(v){v.once("progress",o),v.check()})},l.prototype.progress=function(o,v,d){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!o.isLoaded,this.emitEvent("progress",[this,o,v]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,o),this.progressedCount===this.images.length&&this.complete(),this.options.debug&&s&&s.log(`progress: ${d}`,o,v)},l.prototype.complete=function(){let o=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(o,[this]),this.emitEvent("always",[this]),this.jqDeferred){let v=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[v](this)}};function f(o){this.img=o}f.prototype=Object.create(n.prototype),f.prototype.check=function(){if(this.getIsImageComplete()){this.confirm(this.img.naturalWidth!==0,"naturalWidth");return}this.proxyImage=new Image,this.img.crossOrigin&&(this.proxyImage.crossOrigin=this.img.crossOrigin),this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.proxyImage.src=this.img.currentSrc||this.img.src},f.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},f.prototype.confirm=function(o,v){this.isLoaded=o;let{parentNode:d}=this.img,c=d.nodeName==="PICTURE"?d:this.img;this.emitEvent("progress",[this,c,v])},f.prototype.handleEvent=function(o){let v="on"+o.type;this[v]&&this[v](o)},f.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},f.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},f.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)};function h(o,v){this.url=o,this.element=v,this.img=new Image}return h.prototype=Object.create(f.prototype),h.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url,this.getIsImageComplete()&&(this.confirm(this.img.naturalWidth!==0,"naturalWidth"),this.unbindEvents())},h.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},h.prototype.confirm=function(o,v){this.isLoaded=o,this.emitEvent("progress",[this,this.element,v])},l.makeJQueryPlugin=function(o){o=o||t.jQuery,o&&(a=o,a.fn.imagesLoaded=function(v,d){return new l(this,v,d).jqDeferred.promise(a(this))})},l.makeJQueryPlugin(),l})})(de);var _e=de.exports;const ze=S(_e);var ve={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},K={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},Re=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],R={CSS:{},springs:{}};function D(e,r,t){return Math.min(Math.max(e,r),t)}function F(e,r){return e.indexOf(r)>-1}function Y(e,r){return e.apply(null,r)}var g={arr:function(e){return Array.isArray(e)},obj:function(e){return F(Object.prototype.toString.call(e),"Object")},pth:function(e){return g.obj(e)&&e.hasOwnProperty("totalLength")},svg:function(e){return e instanceof SVGElement},inp:function(e){return e instanceof HTMLInputElement},dom:function(e){return e.nodeType||g.svg(e)},str:function(e){return typeof e=="string"},fnc:function(e){return typeof e=="function"},und:function(e){return typeof e>"u"},nil:function(e){return g.und(e)||e===null},hex:function(e){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)},rgb:function(e){return/^rgb/.test(e)},hsl:function(e){return/^hsl/.test(e)},col:function(e){return g.hex(e)||g.rgb(e)||g.hsl(e)},key:function(e){return!ve.hasOwnProperty(e)&&!K.hasOwnProperty(e)&&e!=="targets"&&e!=="keyframes"}};function ge(e){var r=/\(([^)]+)\)/.exec(e);return r?r[1].split(",").map(function(t){return parseFloat(t)}):[]}function me(e,r){var t=ge(e),n=D(g.und(t[0])?1:t[0],.1,100),a=D(g.und(t[1])?100:t[1],.1,100),s=D(g.und(t[2])?10:t[2],.1,100),u=D(g.und(t[3])?0:t[3],.1,100),l=Math.sqrt(a/n),i=s/(2*Math.sqrt(a*n)),m=i<1?l*Math.sqrt(1-i*i):0,f=1,h=i<1?(i*l+-u)/m:-u+l;function o(d){var c=r?r*d/1e3:d;return i<1?c=Math.exp(-c*i*l)*(f*Math.cos(m*c)+h*Math.sin(m*c)):c=(f+h*c)*Math.exp(-c*l),d===0||d===1?d:1-c}function v(){var d=R.springs[e];if(d)return d;for(var c=1/6,b=0,I=0;;)if(b+=c,o(b)===1){if(I++,I>=16)break}else I=0;var p=b*c*1e3;return R.springs[e]=p,p}return r?o:v}function He(e){return e===void 0&&(e=10),function(r){return Math.ceil(D(r,1e-6,1)*e)*(1/e)}}var Ue=function(){var e=11,r=1/(e-1);function t(f,h){return 1-3*h+3*f}function n(f,h){return 3*h-6*f}function a(f){return 3*f}function s(f,h,o){return((t(h,o)*f+n(h,o))*f+a(h))*f}function u(f,h,o){return 3*t(h,o)*f*f+2*n(h,o)*f+a(h)}function l(f,h,o,v,d){var c,b,I=0;do b=h+(o-h)/2,c=s(b,v,d)-f,c>0?o=b:h=b;while(Math.abs(c)>1e-7&&++I<10);return b}function i(f,h,o,v){for(var d=0;d<4;++d){var c=u(h,o,v);if(c===0)return h;var b=s(h,o,v)-f;h-=b/c}return h}function m(f,h,o,v){if(!(0<=f&&f<=1&&0<=o&&o<=1))return;var d=new Float32Array(e);if(f!==h||o!==v)for(var c=0;c<e;++c)d[c]=s(c*r,f,o);function b(I){for(var p=0,y=1,E=e-1;y!==E&&d[y]<=I;++y)p+=r;--y;var P=(I-d[y])/(d[y+1]-d[y]),x=p+P*r,q=u(x,f,o);return q>=.001?i(I,x,f,o):q===0?x:l(I,p,p+r,f,o)}return function(I){return f===h&&o===v||I===0||I===1?I:s(b(I),h,v)}}return m}(),ye=function(){var e={linear:function(){return function(n){return n}}},r={Sine:function(){return function(n){return 1-Math.cos(n*Math.PI/2)}},Circ:function(){return function(n){return 1-Math.sqrt(1-n*n)}},Back:function(){return function(n){return n*n*(3*n-2)}},Bounce:function(){return function(n){for(var a,s=4;n<((a=Math.pow(2,--s))-1)/11;);return 1/Math.pow(4,3-s)-7.5625*Math.pow((a*3-2)/22-n,2)}},Elastic:function(n,a){n===void 0&&(n=1),a===void 0&&(a=.5);var s=D(n,1,10),u=D(a,.1,2);return function(l){return l===0||l===1?l:-s*Math.pow(2,10*(l-1))*Math.sin((l-1-u/(Math.PI*2)*Math.asin(1/s))*(Math.PI*2)/u)}}},t=["Quad","Cubic","Quart","Quint","Expo"];return t.forEach(function(n,a){r[n]=function(){return function(s){return Math.pow(s,a+2)}}}),Object.keys(r).forEach(function(n){var a=r[n];e["easeIn"+n]=a,e["easeOut"+n]=function(s,u){return function(l){return 1-a(s,u)(1-l)}},e["easeInOut"+n]=function(s,u){return function(l){return l<.5?a(s,u)(l*2)/2:1-a(s,u)(l*-2+2)/2}},e["easeOutIn"+n]=function(s,u){return function(l){return l<.5?(1-a(s,u)(1-l*2))/2:(a(s,u)(l*2-1)+1)/2}}}),e}();function G(e,r){if(g.fnc(e))return e;var t=e.split("(")[0],n=ye[t],a=ge(e);switch(t){case"spring":return me(e,r);case"cubicBezier":return Y(Ue,a);case"steps":return Y(He,a);default:return Y(n,a)}}function pe(e){try{var r=document.querySelectorAll(e);return r}catch{return}}function H(e,r){for(var t=e.length,n=arguments.length>=2?arguments[1]:void 0,a=[],s=0;s<t;s++)if(s in e){var u=e[s];r.call(n,u,s,e)&&a.push(u)}return a}function U(e){return e.reduce(function(r,t){return r.concat(g.arr(t)?U(t):t)},[])}function be(e){return g.arr(e)?e:(g.str(e)&&(e=pe(e)||e),e instanceof NodeList||e instanceof HTMLCollection?[].slice.call(e):[e])}function X(e,r){return e.some(function(t){return t===r})}function ee(e){var r={};for(var t in e)r[t]=e[t];return r}function te(e,r){var t=ee(e);for(var n in e)t[n]=r.hasOwnProperty(n)?r[n]:e[n];return t}function J(e,r){var t=ee(e);for(var n in r)t[n]=g.und(e[n])?r[n]:e[n];return t}function Je(e){var r=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e);return r?"rgba("+r[1]+",1)":e}function Qe(e){var r=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,t=e.replace(r,function(l,i,m,f){return i+i+m+m+f+f}),n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t),a=parseInt(n[1],16),s=parseInt(n[2],16),u=parseInt(n[3],16);return"rgba("+a+","+s+","+u+",1)"}function Ze(e){var r=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e),t=parseInt(r[1],10)/360,n=parseInt(r[2],10)/100,a=parseInt(r[3],10)/100,s=r[4]||1;function u(o,v,d){return d<0&&(d+=1),d>1&&(d-=1),d<1/6?o+(v-o)*6*d:d<1/2?v:d<2/3?o+(v-o)*(2/3-d)*6:o}var l,i,m;if(n==0)l=i=m=a;else{var f=a<.5?a*(1+n):a+n-a*n,h=2*a-f;l=u(h,f,t+1/3),i=u(h,f,t),m=u(h,f,t-1/3)}return"rgba("+l*255+","+i*255+","+m*255+","+s+")"}function Ke(e){if(g.rgb(e))return Je(e);if(g.hex(e))return Qe(e);if(g.hsl(e))return Ze(e)}function O(e){var r=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);if(r)return r[1]}function Ye(e){if(F(e,"translate")||e==="perspective")return"px";if(F(e,"rotate")||F(e,"skew"))return"deg"}function re(e,r){return g.fnc(e)?e(r.target,r.id,r.total):e}function M(e,r){return e.getAttribute(r)}function ne(e,r,t){var n=O(r);if(X([t,"deg","rad","turn"],n))return r;var a=R.CSS[r+t];if(!g.und(a))return a;var s=100,u=document.createElement(e.tagName),l=e.parentNode&&e.parentNode!==document?e.parentNode:document.body;l.appendChild(u),u.style.position="absolute",u.style.width=s+t;var i=s/u.offsetWidth;l.removeChild(u);var m=i*parseFloat(r);return R.CSS[r+t]=m,m}function Ie(e,r,t){if(r in e.style){var n=r.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),a=e.style[r]||getComputedStyle(e).getPropertyValue(n)||"0";return t?ne(e,a,t):a}}function ae(e,r){if(g.dom(e)&&!g.inp(e)&&(!g.nil(M(e,r))||g.svg(e)&&e[r]))return"attribute";if(g.dom(e)&&X(Re,r))return"transform";if(g.dom(e)&&r!=="transform"&&Ie(e,r))return"css";if(e[r]!=null)return"object"}function we(e){if(g.dom(e)){for(var r=e.style.transform||"",t=/(\w+)\(([^)]*)\)/g,n=new Map,a;a=t.exec(r);)n.set(a[1],a[2]);return n}}function Ge(e,r,t,n){var a=F(r,"scale")?1:0+Ye(r),s=we(e).get(r)||a;return t&&(t.transforms.list.set(r,s),t.transforms.last=r),n?ne(e,s,n):s}function ie(e,r,t,n){switch(ae(e,r)){case"transform":return Ge(e,r,n,t);case"css":return Ie(e,r,t);case"attribute":return M(e,r);default:return e[r]||0}}function se(e,r){var t=/^(\*=|\+=|-=)/.exec(e);if(!t)return e;var n=O(e)||0,a=parseFloat(r),s=parseFloat(e.replace(t[0],""));switch(t[0][0]){case"+":return a+s+n;case"-":return a-s+n;case"*":return a*s+n}}function Ee(e,r){if(g.col(e))return Ke(e);if(/\s/g.test(e))return e;var t=O(e),n=t?e.substr(0,e.length-t.length):e;return r?n+r:n}function oe(e,r){return Math.sqrt(Math.pow(r.x-e.x,2)+Math.pow(r.y-e.y,2))}function Xe(e){return Math.PI*2*M(e,"r")}function et(e){return M(e,"width")*2+M(e,"height")*2}function tt(e){return oe({x:M(e,"x1"),y:M(e,"y1")},{x:M(e,"x2"),y:M(e,"y2")})}function xe(e){for(var r=e.points,t=0,n,a=0;a<r.numberOfItems;a++){var s=r.getItem(a);a>0&&(t+=oe(n,s)),n=s}return t}function rt(e){var r=e.points;return xe(e)+oe(r.getItem(r.numberOfItems-1),r.getItem(0))}function Ae(e){if(e.getTotalLength)return e.getTotalLength();switch(e.tagName.toLowerCase()){case"circle":return Xe(e);case"rect":return et(e);case"line":return tt(e);case"polyline":return xe(e);case"polygon":return rt(e)}}function nt(e){var r=Ae(e);return e.setAttribute("stroke-dasharray",r),r}function at(e){for(var r=e.parentNode;g.svg(r)&&g.svg(r.parentNode);)r=r.parentNode;return r}function Te(e,r){var t=r||{},n=t.el||at(e),a=n.getBoundingClientRect(),s=M(n,"viewBox"),u=a.width,l=a.height,i=t.viewBox||(s?s.split(" "):[0,0,u,l]);return{el:n,viewBox:i,x:i[0]/1,y:i[1]/1,w:u,h:l,vW:i[2],vH:i[3]}}function it(e,r){var t=g.str(e)?pe(e)[0]:e,n=r||100;return function(a){return{property:a,el:t,svg:Te(t),totalLength:Ae(t)*(n/100)}}}function st(e,r,t){function n(f){f===void 0&&(f=0);var h=r+f>=1?r+f:0;return e.el.getPointAtLength(h)}var a=Te(e.el,e.svg),s=n(),u=n(-1),l=n(1),i=t?1:a.w/a.vW,m=t?1:a.h/a.vH;switch(e.property){case"x":return(s.x-a.x)*i;case"y":return(s.y-a.y)*m;case"angle":return Math.atan2(l.y-u.y,l.x-u.x)*180/Math.PI}}function ke(e,r){var t=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,n=Ee(g.pth(e)?e.totalLength:e,r)+"";return{original:n,numbers:n.match(t)?n.match(t).map(Number):[0],strings:g.str(e)||r?n.split(t):[]}}function ue(e){var r=e?U(g.arr(e)?e.map(be):be(e)):[];return H(r,function(t,n,a){return a.indexOf(t)===n})}function Le(e){var r=ue(e);return r.map(function(t,n){return{target:t,id:n,total:r.length,transforms:{list:we(t)}}})}function ot(e,r){var t=ee(r);if(/^spring/.test(t.easing)&&(t.duration=me(t.easing)),g.arr(e)){var n=e.length,a=n===2&&!g.obj(e[0]);a?e={value:e}:g.fnc(r.duration)||(t.duration=r.duration/n)}var s=g.arr(e)?e:[e];return s.map(function(u,l){var i=g.obj(u)&&!g.pth(u)?u:{value:u};return g.und(i.delay)&&(i.delay=l?0:r.delay),g.und(i.endDelay)&&(i.endDelay=l===s.length-1?r.endDelay:0),i}).map(function(u){return J(u,t)})}function ut(e){for(var r=H(U(e.map(function(s){return Object.keys(s)})),function(s){return g.key(s)}).reduce(function(s,u){return s.indexOf(u)<0&&s.push(u),s},[]),t={},n=function(s){var u=r[s];t[u]=e.map(function(l){var i={};for(var m in l)g.key(m)?m==u&&(i.value=l[m]):i[m]=l[m];return i})},a=0;a<r.length;a++)n(a);return t}function lt(e,r){var t=[],n=r.keyframes;n&&(r=J(ut(n),r));for(var a in r)g.key(a)&&t.push({name:a,tweens:ot(r[a],e)});return t}function ft(e,r){var t={};for(var n in e){var a=re(e[n],r);g.arr(a)&&(a=a.map(function(s){return re(s,r)}),a.length===1&&(a=a[0])),t[n]=a}return t.duration=parseFloat(t.duration),t.delay=parseFloat(t.delay),t}function ct(e,r){var t;return e.tweens.map(function(n){var a=ft(n,r),s=a.value,u=g.arr(s)?s[1]:s,l=O(u),i=ie(r.target,e.name,l,r),m=t?t.to.original:i,f=g.arr(s)?s[0]:m,h=O(f)||O(i),o=l||h;return g.und(u)&&(u=m),a.from=ke(f,o),a.to=ke(se(u,f),o),a.start=t?t.end:0,a.end=a.start+a.delay+a.duration+a.endDelay,a.easing=G(a.easing,a.duration),a.isPath=g.pth(s),a.isPathTargetInsideSVG=a.isPath&&g.svg(r.target),a.isColor=g.col(a.from.original),a.isColor&&(a.round=1),t=a,a})}var Ce={css:function(e,r,t){return e.style[r]=t},attribute:function(e,r,t){return e.setAttribute(r,t)},object:function(e,r,t){return e[r]=t},transform:function(e,r,t,n,a){if(n.list.set(r,t),r===n.last||a){var s="";n.list.forEach(function(u,l){s+=l+"("+u+") "}),e.style.transform=s}}};function De(e,r){var t=Le(e);t.forEach(function(n){for(var a in r){var s=re(r[a],n),u=n.target,l=O(s),i=ie(u,a,l,n),m=l||O(i),f=se(Ee(s,m),i),h=ae(u,a);Ce[h](u,a,f,n.transforms,!0)}})}function dt(e,r){var t=ae(e.target,r.name);if(t){var n=ct(r,e),a=n[n.length-1];return{type:t,property:r.name,animatable:e,tweens:n,duration:a.end,delay:n[0].delay,endDelay:a.endDelay}}}function ht(e,r){return H(U(e.map(function(t){return r.map(function(n){return dt(t,n)})})),function(t){return!g.und(t)})}function Me(e,r){var t=e.length,n=function(s){return s.timelineOffset?s.timelineOffset:0},a={};return a.duration=t?Math.max.apply(Math,e.map(function(s){return n(s)+s.duration})):r.duration,a.delay=t?Math.min.apply(Math,e.map(function(s){return n(s)+s.delay})):r.delay,a.endDelay=t?a.duration-Math.max.apply(Math,e.map(function(s){return n(s)+s.duration-s.endDelay})):r.endDelay,a}var Oe=0;function vt(e){var r=te(ve,e),t=te(K,e),n=lt(t,e),a=Le(e.targets),s=ht(a,n),u=Me(s,t),l=Oe;return Oe++,J(r,{id:l,children:[],animatables:a,animations:s,duration:u.duration,delay:u.delay,endDelay:u.endDelay})}var L=[],Pe=function(){var e;function r(){!e&&(!Se()||!w.suspendWhenDocumentHidden)&&L.length>0&&(e=requestAnimationFrame(t))}function t(a){for(var s=L.length,u=0;u<s;){var l=L[u];l.paused?(L.splice(u,1),s--):(l.tick(a),u++)}e=u>0?requestAnimationFrame(t):void 0}function n(){w.suspendWhenDocumentHidden&&(Se()?e=cancelAnimationFrame(e):(L.forEach(function(a){return a._onDocumentVisibility()}),Pe()))}return typeof document<"u"&&document.addEventListener("visibilitychange",n),r}();function Se(){return!!document&&document.hidden}function w(e){e===void 0&&(e={});var r=0,t=0,n=0,a,s=0,u=null;function l(p){var y=window.Promise&&new Promise(function(E){return u=E});return p.finished=y,y}var i=vt(e);l(i);function m(){var p=i.direction;p!=="alternate"&&(i.direction=p!=="normal"?"normal":"reverse"),i.reversed=!i.reversed,a.forEach(function(y){return y.reversed=i.reversed})}function f(p){return i.reversed?i.duration-p:p}function h(){r=0,t=f(i.currentTime)*(1/w.speed)}function o(p,y){y&&y.seek(p-y.timelineOffset)}function v(p){if(i.reversePlayback)for(var E=s;E--;)o(p,a[E]);else for(var y=0;y<s;y++)o(p,a[y])}function d(p){for(var y=0,E=i.animations,P=E.length;y<P;){var x=E[y],q=x.animatable,$=x.tweens,B=$.length-1,T=$[B];B&&(T=H($,function(It){return p<It.end})[0]||T);for(var j=D(p-T.start-T.delay,0,T.duration)/T.duration,Q=isNaN(j)?1:T.easing(j),C=T.to.strings,le=T.round,fe=[],bt=T.to.numbers.length,V=void 0,W=0;W<bt;W++){var N=void 0,Ve=T.to.numbers[W],Fe=T.from.numbers[W]||0;T.isPath?N=st(T.value,Q*Ve,T.isPathTargetInsideSVG):N=Fe+Q*(Ve-Fe),le&&(T.isColor&&W>2||(N=Math.round(N*le)/le)),fe.push(N)}var $e=C.length;if(!$e)V=fe[0];else{V=C[0];for(var _=0;_<$e;_++){C[_];var We=C[_+1],ce=fe[_];isNaN(ce)||(We?V+=ce+We:V+=ce+" ")}}Ce[x.type](q.target,x.property,V,q.transforms),x.currentValue=V,y++}}function c(p){i[p]&&!i.passThrough&&i[p](i)}function b(){i.remaining&&i.remaining!==!0&&i.remaining--}function I(p){var y=i.duration,E=i.delay,P=y-i.endDelay,x=f(p);i.progress=D(x/y*100,0,100),i.reversePlayback=x<i.currentTime,a&&v(x),!i.began&&i.currentTime>0&&(i.began=!0,c("begin")),!i.loopBegan&&i.currentTime>0&&(i.loopBegan=!0,c("loopBegin")),x<=E&&i.currentTime!==0&&d(0),(x>=P&&i.currentTime!==y||!y)&&d(y),x>E&&x<P?(i.changeBegan||(i.changeBegan=!0,i.changeCompleted=!1,c("changeBegin")),c("change"),d(x)):i.changeBegan&&(i.changeCompleted=!0,i.changeBegan=!1,c("changeComplete")),i.currentTime=D(x,0,y),i.began&&c("update"),p>=y&&(t=0,b(),i.remaining?(r=n,c("loopComplete"),i.loopBegan=!1,i.direction==="alternate"&&m()):(i.paused=!0,i.completed||(i.completed=!0,c("loopComplete"),c("complete"),!i.passThrough&&"Promise"in window&&(u(),l(i)))))}return i.reset=function(){var p=i.direction;i.passThrough=!1,i.currentTime=0,i.progress=0,i.paused=!0,i.began=!1,i.loopBegan=!1,i.changeBegan=!1,i.completed=!1,i.changeCompleted=!1,i.reversePlayback=!1,i.reversed=p==="reverse",i.remaining=i.loop,a=i.children,s=a.length;for(var y=s;y--;)i.children[y].reset();(i.reversed&&i.loop!==!0||p==="alternate"&&i.loop===1)&&i.remaining++,d(i.reversed?i.duration:0)},i._onDocumentVisibility=h,i.set=function(p,y){return De(p,y),i},i.tick=function(p){n=p,r||(r=n),I((n+(t-r))*w.speed)},i.seek=function(p){I(f(p))},i.pause=function(){i.paused=!0,h()},i.play=function(){i.paused&&(i.completed&&i.reset(),i.paused=!1,L.push(i),h(),Pe())},i.reverse=function(){m(),i.completed=!i.reversed,h()},i.restart=function(){i.reset(),i.play()},i.remove=function(p){var y=ue(p);Be(y,i)},i.reset(),i.autoplay&&i.play(),i}function qe(e,r){for(var t=r.length;t--;)X(e,r[t].animatable.target)&&r.splice(t,1)}function Be(e,r){var t=r.animations,n=r.children;qe(e,t);for(var a=n.length;a--;){var s=n[a],u=s.animations;qe(e,u),!u.length&&!s.children.length&&n.splice(a,1)}!t.length&&!n.length&&r.pause()}function gt(e){for(var r=ue(e),t=L.length;t--;){var n=L[t];Be(r,n)}}function mt(e,r){r===void 0&&(r={});var t=r.direction||"normal",n=r.easing?G(r.easing):null,a=r.grid,s=r.axis,u=r.from||0,l=u==="first",i=u==="center",m=u==="last",f=g.arr(e),h=parseFloat(f?e[0]:e),o=f?parseFloat(e[1]):0,v=O(f?e[1]:e)||0,d=r.start||0+(f?h:0),c=[],b=0;return function(I,p,y){if(l&&(u=0),i&&(u=(y-1)/2),m&&(u=y-1),!c.length){for(var E=0;E<y;E++){if(!a)c.push(Math.abs(u-E));else{var P=i?(a[0]-1)/2:u%a[0],x=i?(a[1]-1)/2:Math.floor(u/a[0]),q=E%a[0],$=Math.floor(E/a[0]),B=P-q,T=x-$,j=Math.sqrt(B*B+T*T);s==="x"&&(j=-B),s==="y"&&(j=-T),c.push(j)}b=Math.max.apply(Math,c)}n&&(c=c.map(function(C){return n(C/b)*b})),t==="reverse"&&(c=c.map(function(C){return s?C<0?C*-1:-C:Math.abs(b-C)}))}var Q=f?(o-h)/b:h;return d+Q*(Math.round(c[p]*100)/100)+v}}function yt(e){e===void 0&&(e={});var r=w(e);return r.duration=0,r.add=function(t,n){var a=L.indexOf(r),s=r.children;a>-1&&L.splice(a,1);function u(o){o.passThrough=!0}for(var l=0;l<s.length;l++)u(s[l]);var i=J(t,te(K,e));i.targets=i.targets||e.targets;var m=r.duration;i.autoplay=!1,i.direction=r.direction,i.timelineOffset=g.und(n)?m:se(n,m),u(r),r.seek(i.timelineOffset);var f=w(i);u(f),s.push(f);var h=Me(s,e);return r.delay=h.delay,r.endDelay=h.endDelay,r.duration=h.duration,r.seek(0),r.reset(),r.autoplay&&r.play(),r},r}w.version="3.2.1",w.speed=1,w.suspendWhenDocumentHidden=!0,w.running=L,w.remove=gt,w.get=ie,w.set=De,w.convertPx=ne,w.path=it,w.setDashoffset=nt,w.stagger=mt,w.timeline=yt,w.easing=G,w.penner=ye,w.random=function(e,r){return Math.floor(Math.random()*(r-e+1))+e};class je{constructor(r="[data-av]",t){z(this,"options");z(this,"groups",[]);z(this,"previousScrollTop",0);z(this,"currentScrollTop",0);return document.querySelectorAll(r).forEach(a=>{a.setAttribute("hidden","hidden");let s=!!a.hasAttribute("data-av-typewriter");t!=null&&t.typewriter&&(s=t.typewriter);let u=a.getAttribute("data-av")??"";t!=null&&t.group&&(u=t.group);let l=a.getAttribute("data-av-sequential")??!1;l=l!==!1,t!=null&&t.sequential&&(l=t.sequential);let i=!!a.hasAttribute("data-av-resets");t!=null&&t.resets&&(i=t.resets);let m=!!a.hasAttribute("data-av-only-when-totally-in");t!=null&&t.onlyWhenTotallyIn&&(m=t.onlyWhenTotallyIn);let f=!!a.hasAttribute("data-av-only-when-totally-in");if(t!=null&&t.inline&&(f=t.inline),s){u=u+"--typewriter";let o=a.textContent,v=(o==null?void 0:o.trim().replace(/\s+/g," ").replace(/\r?\n|\r/g,"").split(""))??[];a.textContent="";let d=10,c=d;a.hasAttribute("data-av-animation-duration")&&(c=Number(a.getAttribute("data-av-animation-duration"))/v.length),c=c<d?d:c>d*100?d*100:c;for(let b=v.length-1;b>=0;b--){const I=document.createElement("span");a.insertAdjacentElement("afterend",I),I.textContent=v[b];let p=a.attributes;for(let y=0;y<p.length;y++){const E=p[y];I.setAttribute(E.name,E.value)}I.setAttribute("data-av",u),I.setAttribute("data-av-animation-duration",c.toString())}}let h={name:u,sequential:l,resets:i,onlyWhenTotallyIn:m,typewriter:s,inline:f,items:[]};this.groups.find(o=>o.name==h.name)||this.groups.push(h)}),this.groups.forEach(a=>{let s=document.querySelectorAll(`[data-av="${a.name}"]`);r!="[data-av]"&&(s=document.querySelectorAll(r));let u=Array.from(s);a.sequential&&u.sort((l,i)=>{let m=l.getAttribute("data-av-sequential")??"",f=i.getAttribute("data-av-sequential")??"",h=u.indexOf(l),o=u.indexOf(i);return t!=null&&t.optionsItem&&t.optionsItem[h].sequentialOrder&&(m=t.optionsItem[h].sequentialOrder??""),t!=null&&t.optionsItem&&t.optionsItem[o].sequentialOrder&&(f=t.optionsItem[o].sequentialOrder??""),m>f?1:m<f?-1:0}),u.forEach((l,i)=>{let m="600",f=a.items.length>0?a.items[a.items.length-1].duration:"0",h=a.items.length>0?a.items[a.items.length-1].delay:"0",o="av-style-01",v=l.getAttribute("data-av-animation")??o;t!=null&&t.animation&&(v=t.animation),t!=null&&t.optionsItem&&t.optionsItem[i].animation&&(v=t.optionsItem[i].animation??o);let d=l.getAttribute("data-av-animation-duration")??m;t!=null&&t.duration&&(d=t.duration),t!=null&&t.optionsItem&&t.optionsItem[i].duration&&(d=t.optionsItem[i].duration??m);let c=l.getAttribute("data-av-animation-delay")??0;t!=null&&t.delay&&(c=t.delay),t!=null&&t.optionsItem&&t.optionsItem[i].delay&&(c=t.optionsItem[i].delay??0),c=c||(a.sequential?Number(f)+Number(h):c);let b=l.hasAttribute("data-av-parallax")?l.getAttribute("data-av-parallax")?l.getAttribute("data-av-parallax"):"1":"0";t!=null&&t.parallax&&(b=t.parallax),t!=null&&t.optionsItem&&t.optionsItem[i].parallax&&(b=t.optionsItem[i].parallax??b);let I=!!l.hasAttribute("data-av-inline");t!=null&&t.inline&&(I=t.inline),t!=null&&t.optionsItem&&t.optionsItem[i].inline&&(I=t.optionsItem[i].inline??I),a.items.push({element:l,group:a,animation:v,duration:d,delay:c.toString(),parallax:b,inline:I})})}),this.init(),this.addListeners(),this}isInViewport(r){const t=r.element.getBoundingClientRect(),n={top:0,right:window.innerWidth||document.documentElement.clientWidth,bottom:window.innerHeight||document.documentElement.clientHeight,left:0};return t.bottom>=n.top&&t.right>=n.left&&t.top<=n.bottom&&t.left<=n.right?t.top>=n.top&&t.left>=n.left&&t.bottom<=n.bottom&&t.right<=n.right?A.In:A.Partial:A.Out}init(){this.groups.forEach(r=>{r.items.forEach(t=>{ze(t.element,()=>{var n,a;t.element.removeAttribute("hidden"),this.elAddWrapper(t),(n=t.wrapper)==null||n.setAttribute("class",`av-animation av-animation--${t.animation} av-animation-duration av-animation-delay ${r.typewriter?"av-animation-typewriter":""} ${t.inline?"av-animation--inline":""}`),(a=t.wrapper)==null||a.setAttribute("style",`transition-duration:${t.duration}ms;animation-duration:${t.duration}ms;transition-delay:${t.delay}ms;animation-delay:${t.delay}ms;`),window.dispatchEvent(new Event("resize"))})})})}listenersCallback(r){this.groups.forEach(t=>{t.items.forEach(n=>{var a,s,u,l,i,m,f,h;if(this.isInViewport(n)==A.In||!t.onlyWhenTotallyIn&&this.isInViewport(n)==A.Partial){if(t.sequential){let o=1;if(!((a=n.wrapper)!=null&&a.classList.contains("av-ani-end"))&&(this.isInViewport(n)==A.In||!t.onlyWhenTotallyIn&&this.isInViewport(n)==A.Partial)){switch((s=n.wrapper)==null||s.classList.add("av-ani-end"),(u=n.wrapper)==null||u.setAttribute("style",`transition-duration:${n.duration}ms;animation-duration:${n.duration}ms;transition-delay:${Number(n.delay)*o}ms;animation-delay:${Number(n.delay)*o}ms;`),n.animation){case"av-style-12":w({targets:n.element.querySelectorAll("path"),strokeDashoffset:[w.setDashoffset,0],easing:"linear",duration:Number.parseInt(n.duration),delay:Number(n.delay)*o,direction:"normal",loop:!1});break}o++}}else if(!((l=n.wrapper)!=null&&l.classList.contains("av-ani-end")))switch((i=n.wrapper)==null||i.classList.add("av-ani-end"),(m=n.wrapper)==null||m.setAttribute("style",`transition-duration:${n.duration}ms;animation-duration:${n.duration}ms;transition-delay:${n.delay}ms;animation-delay:${n.delay}ms;`),n.animation){case"av-style-12":w({targets:n.element.querySelectorAll("path"),strokeDashoffset:[w.setDashoffset,0],easing:"linear",duration:Number.parseInt(n.duration),delay:Number.parseInt(n.delay),direction:"normal",loop:!1});break}if(Number.parseFloat(n.parallax)>0&&r.type=="scroll"&&(this.isInViewport(n)==A.Partial||this.isInViewport(n)==A.In)){let o=window.getComputedStyle(n.element).getPropertyValue("transform");o!="none"?o=o.split(",")[5].trim().replace(")",""):o=0;let d=Number.parseFloat(n.parallax)*10;this.currentScrollTop=window.pageYOffset||document.documentElement.scrollTop,this.currentScrollTop>this.previousScrollTop?o=Number(o)-d:this.currentScrollTop<this.previousScrollTop&&(o=Number(o)+d),n.element.setAttribute("style",`transition-property: transform; transition-duration: 400ms; transition-timing-function: ease; transform: translateY(${o}px);`)}}else if(t.resets){switch((f=n.wrapper)==null||f.classList.remove("av-ani-end"),(h=n.wrapper)==null||h.setAttribute("style",`transition-duration:${n.duration}ms;animation-duration:${n.duration}ms;`),n.animation){case"av-style-12":w({targets:n.element.querySelectorAll("path"),strokeDashoffset:[0,w.setDashoffset],easing:"linear",duration:Number.parseInt(n.duration),delay:Number.parseInt(n.delay),direction:"normal",loop:!1});break}Number.parseFloat(n.parallax)>0&&n.element.setAttribute("style","transition-property: transform; transition-duration: 600ms; transition-timing-function: ease; transform: translateY(0);")}})}),this.previousScrollTop=this.currentScrollTop}addListeners(){window.addEventListener("scroll",r=>{this.listenersCallback(r)},{passive:!0}),window.addEventListener("wheel",r=>{this.listenersCallback(r)},{passive:!0}),window.addEventListener("resize",r=>{this.listenersCallback(r)},{passive:!0}),window.dispatchEvent(new Event("resize"))}elAddWrapper(r){const t=document.createElement("div");r.element.insertAdjacentElement("afterend",t),t.appendChild(r.element),r.wrapper=t}}const xt="";function pt(e,r){return new je(e,r)}return new je,pt});
