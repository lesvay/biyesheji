(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-other-memberdetail"],{"2ead":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".member-box[data-v-185e16ca]{padding:0 %?100?%;position:relative}.member-logo[data-v-185e16ca]{width:100%;width:100%;height:%?310?%;margin-top:%?50?%}.member-title[data-v-185e16ca]{position:absolute;top:0;line-height:%?360?%;font-size:%?68?%;color:#fff;text-align:center;width:100%;margin-left:%?-100?%;margin-top:%?50?%}.info-box[data-v-185e16ca]{margin-left:%?50?%;margin-right:%?50?%;background-color:#fff;margin-bottom:%?20?%}.price[data-v-185e16ca]{text-align:right;font-size:%?46?%;font-weight:600;color:#f47925;float:right;margin-top:%?50?%;margin-bottom:%?50?%}.title[data-v-185e16ca]{font-size:%?50?%;margin-top:%?50?%;margin-bottom:%?50?%;float:left}.line[data-v-185e16ca]{width:100%;border-top:#ccc %?1?% solid;padding-top:%?20?%}.row[data-v-185e16ca]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-bottom:%?20?%}.text[data-v-185e16ca]{font-size:%?35?%;color:#666;margin-right:%?20?%}.content[data-v-185e16ca]{font-size:%?35?%;color:#666;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap}.serviceitem[data-v-185e16ca]{margin-right:%?10?%}",""])},"3f3e":function(t,e,i){"use strict";i.r(e);var a=i("cd49"),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e["default"]=s.a},"7b2b":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"member-box"},[i("v-uni-image",{staticClass:"member-logo",attrs:{src:"../../static/logo.png",mode:"aspectFit"}}),i("v-uni-view",{staticClass:"member-title"},[t._v("会员详情")])],1),i("v-uni-view",{staticClass:"info-box"},[i("v-uni-view",{staticClass:"title"},[t._v(t._s(t.memberList.member_name))])],1),i("v-uni-view",{staticClass:"info-box"},[i("v-uni-view",{staticClass:"line"},[i("v-uni-view",{staticClass:"row"},[i("v-uni-view",{staticClass:"text"},[t._v("会员ID：")]),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"serviceitem"},[t._v(t._s(t.memberList.member_id))])],1)],1),i("v-uni-view",{staticClass:"row"},[i("v-uni-view",{staticClass:"text"},[t._v("会员卡号：")]),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"serviceitem"},[t._v(t._s(t.memberList.member_rfid))])],1)],1),i("v-uni-view",{staticClass:"row"},[i("v-uni-view",{staticClass:"text"},[t._v("账户余额：")]),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"serviceitem"},[t._v(t._s(t.memberList.member_wealth))])],1)],1),i("v-uni-view",{staticClass:"row"},[i("v-uni-view",{staticClass:"text"},[t._v("购买次数：")]),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"serviceitem"},[t._v(t._s(t.memberList.member_buycount))])],1)],1),i("v-uni-view",{staticClass:"row"},[i("v-uni-view",{staticClass:"text"},[t._v("注册时间：")]),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"serviceitem"},[t._v(t._s(t.memberList.member_regitime))])],1)],1),i("v-uni-view",{staticClass:"row"},[i("v-uni-view",{staticClass:"text"},[t._v("最后购买：")]),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"serviceitem"},[t._v(t._s(t.memberList.member_lastbuytime))])],1)],1)],1)],1)],1)},s=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})},"88dc":function(t,e,i){var a=i("2ead");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("4f06").default;s("2720a3cc",a,!0,{sourceMap:!1,shadowMode:!1})},bd7d:function(t,e,i){"use strict";var a=i("88dc"),s=i.n(a);s.a},cd49:function(t,e,i){"use strict";var a;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={data:function(){return{memberList:""}},onLoad:function(t){a=this,this.getServerData(t)},onReady:function(){},methods:{getServerData:function(t){var e=t.id;console.log(e),uni.showLoading({title:"正在加载数据..."});var i={"content-type":"application/x-www-form-urlencoded; charset=UTF-8"};uni.request({url:this.$url+"/php/memberdetail.php",method:"POST",header:i,data:{id:e},success:function(t){var e=t.data;0===e.ec?a.memberList=e.user:uni.showToast({title:e.msg})},fail:function(){uni.showToast({title:"网络错误"})},complete:function(){uni.hideLoading()}})}}};e.default=s},f79e:function(t,e,i){"use strict";i.r(e);var a=i("7b2b"),s=i("3f3e");for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);i("bd7d");var r=i("2877"),o=Object(r["a"])(s["default"],a["a"],a["b"],!1,null,"185e16ca",null);e["default"]=o.exports}}]);