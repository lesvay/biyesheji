(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/p-scan/scan"],{2260:function(t,e,a){"use strict";a.r(e);var n=a("23b9"),r=a("9001");for(var o in r)"default"!==o&&function(t){a.d(e,t,function(){return r[t]})}(o);var c=a("2877"),u=Object(c["a"])(r["default"],n["a"],n["b"],!1,null,null,null);e["default"]=u.exports},"23b9":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},r=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return r})},"76ac":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{barcode:[plus.barcode.QR,plus.barcode.EAN13,plus.barcode.EAN8,plus.barcode.UPCA,plus.barcode.UPCE,plus.barcode.CODABAR,plus.barcode.CODE39,plus.barcode.CODE93,plus.barcode.CODE128,plus.barcode.ITF]}},created:function(){t.getSystemInfoSync().statusBarHeight;var e=getCurrentPages(),a=e[e.length-1],n=a.$getAppWebview();this.barcode=plus.barcode.create("barcode",this.barcode,{top:"0",left:"0px",width:"100%",height:"100%",position:"static"}),this.barcode.onmarked=this.onmarked,n.append(this.barcode);var r=t.getSystemInfoSync();"android"==r.platform&&this.barcode.start()},onUnload:function(){clearTimeout(this.t)},methods:{onmarked:function(t,e){var a=this;this.$emit("getCode",e),this.t=setTimeout(function(){a.barcode.start()},1e3)}}};e.default=a}).call(this,a("6e42")["default"])},9001:function(t,e,a){"use strict";a.r(e);var n=a("76ac"),r=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,function(){return n[t]})}(o);e["default"]=r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/p-scan/scan-create-component',
    {
        'components/p-scan/scan-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("2260"))
        })
    },
    [['components/p-scan/scan-create-component']]
]);
