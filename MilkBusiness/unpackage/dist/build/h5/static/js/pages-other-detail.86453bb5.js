(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-other-detail"],{"089d":function(t,i,e){var a=e("6b1e");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=e("4f06").default;s("4cb0bd65",a,!0,{sourceMap:!1,shadowMode:!1})},"08f5":function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",[e("v-uni-view",{staticClass:"rfid-box"},[e("v-uni-image",{staticClass:"rfid-logo",attrs:{src:"../../static/logo.png",mode:"aspectFit"}}),e("v-uni-view",{staticClass:"rfid-title"},[t._v("产品详情")])],1),e("v-uni-view",{staticClass:"info-box"},[e("v-uni-view",{staticClass:"title"},[t._v(t._s(t.rfidList.goods_name))]),e("v-uni-view",{staticClass:"price"},[t._v("￥"+t._s(t.rfidList.goods_price)+"元")])],1),e("v-uni-view",{staticClass:"info-box"},[e("v-uni-view",{staticClass:"line"},[e("v-uni-view",{staticClass:"row"},[e("v-uni-view",{staticClass:"text"},[t._v("购买会员：")]),e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"serviceitem"},[t._v(t._s(t.rfidList.goods_member))])],1)],1),e("v-uni-view",{staticClass:"row"},[e("v-uni-view",{staticClass:"text"},[t._v("机器编号：")]),e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"serviceitem"},[t._v(t._s(t.rfidList.goods_machnum))])],1)],1),e("v-uni-view",{staticClass:"row"},[e("v-uni-view",{staticClass:"text"},[t._v("唯一标识号：")]),e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"serviceitem"},[t._v(t._s(t.rfidList.goods_rfid))])],1)],1),e("v-uni-view",{staticClass:"row"},[e("v-uni-view",{staticClass:"text"},[t._v("购买时间：")]),e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"serviceitem"},[t._v(t._s(t.rfidList.goods_buytime))])],1)],1),e("v-uni-view",{staticClass:"row"},[e("v-uni-view",{staticClass:"text"},[t._v("保质期：")]),e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"serviceitem"},[t._v(t._s(t.rfidList.goods_deadtime))])],1)],1),e("v-uni-view",{staticClass:"row"},[e("v-uni-view",{staticClass:"text"},[t._v("产地：")]),e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"serviceitem"},[t._v(t._s(t.rfidList.goods_orign))])],1)],1),e("v-uni-view",{staticClass:"row"},[e("v-uni-view",{staticClass:"text"},[t._v("介绍：")]),e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"serviceitem"},[t._v(t._s(t.rfidList.goods_introduce))])],1)],1)],1)],1)],1)},s=[];e.d(i,"a",function(){return a}),e.d(i,"b",function(){return s})},"509e":function(t,i,e){"use strict";var a=e("089d"),s=e.n(a);s.a},"5a0c":function(t,i,e){"use strict";e.r(i);var a=e("08f5"),s=e("64bd");for(var n in s)"default"!==n&&function(t){e.d(i,t,function(){return s[t]})}(n);e("509e");var o=e("2877"),r=Object(o["a"])(s["default"],a["a"],a["b"],!1,null,"63e24a62",null);i["default"]=r.exports},"64bd":function(t,i,e){"use strict";e.r(i);var a=e("eb11"),s=e.n(a);for(var n in a)"default"!==n&&function(t){e.d(i,t,function(){return a[t]})}(n);i["default"]=s.a},"6b1e":function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,".rfid-box[data-v-63e24a62]{padding:0 %?100?%;position:relative}.rfid-logo[data-v-63e24a62]{width:100%;width:100%;height:%?310?%;margin-top:%?50?%}.rfid-title[data-v-63e24a62]{position:absolute;top:0;line-height:%?360?%;font-size:%?68?%;color:#fff;text-align:center;width:100%;margin-left:%?-100?%;margin-top:%?50?%}.info-box[data-v-63e24a62]{margin-left:%?50?%;margin-right:%?50?%;background-color:#fff;margin-bottom:%?20?%}.price[data-v-63e24a62]{text-align:right;font-size:%?46?%;font-weight:600;color:#f47925;float:right;margin-top:%?50?%;margin-bottom:%?50?%}.title[data-v-63e24a62]{font-size:%?50?%;margin-top:%?50?%;margin-bottom:%?50?%;float:left}.line[data-v-63e24a62]{width:100%;border-top:#ccc %?1?% solid;padding-top:%?20?%}.row[data-v-63e24a62]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-bottom:%?20?%}.text[data-v-63e24a62]{font-size:%?35?%;color:#666;margin-right:%?20?%}.content[data-v-63e24a62]{font-size:%?35?%;color:#666;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap}.serviceitem[data-v-63e24a62]{margin-right:%?10?%}",""])},eb11:function(t,i,e){"use strict";var a;Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s={data:function(){return{rfidList:""}},onLoad:function(t){a=this,this.getServerData(t)},onReady:function(){},methods:{getServerData:function(t){var i=t.rfid;console.log(i),uni.showLoading({title:"正在加载数据..."});var e={"content-type":"application/x-www-form-urlencoded; charset=UTF-8"};uni.request({url:this.$url+"/php/detail.php",method:"POST",header:e,data:{rfid:i},success:function(t){var i=t.data;0===i.ec?a.rfidList=i.user:uni.showToast({title:i.msg})},fail:function(){uni.showToast({title:"网络错误"})},complete:function(){uni.hideLoading()}})}}};i.default=s}}]);