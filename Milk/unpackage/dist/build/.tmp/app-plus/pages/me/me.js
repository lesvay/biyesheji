(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/me"],{"0508":function(e,t,n){"use strict";(function(e){n("8460"),n("921b");a(n("66fd"));var t=a(n("9019"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},1208:function(e,t,n){"use strict";var a=n("58c9"),r=n.n(a);r.a},"457b":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,a=(e._self._c,n("16b7")),r=n("ef3b");e.$mp.data=Object.assign({},{$root:{m0:a,m1:r}})},r=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return r})},"58c9":function(e,t,n){},"6d9b":function(e,t,n){"use strict";(function(e,n){var a;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={data:function(){return{name:"",wealth:"",rfid:""}},onLoad:function(){a=this},onReady:function(){this.getServerData()},onNavigationBarButtonTap:function(e){this.getServerData()},methods:{getServerData:function(){var t=this,r=e.getStorageSync("userinfo"),o=r.member_id,u={"content-type":"application/x-www-form-urlencoded; charset=UTF-8"},i=e.getStorageSync("PHPSESSID");i&&(u["cookie"]="PHPSESSID="+i),e.request({url:this.$url+"/php/me.php",method:"POST",header:u,data:{id:o},success:function(t){console.log(n(t," at pages\\me\\me.vue:100"));var o=t.cookies;if(o)for(var u=0;u<o.length;u++)if("PHPSESSID"==o[u].name){e.setStorageSync("PHPSESSID",o[u].value);break}var i=t.data;0===i.ec?(e.setStorageSync("userinfo",i.user),a.name=r.member_name,a.wealth=r.member_wealth,r.member_rfid?a.rfid="我的卡号:"+r.member_rfid:a.rfid="未绑定卡片"):e.reLaunch({url:"../login/login"})},fail:function(){e.hideLoading(),t.message="网络连接失败"},complete:function(){}})},mejumprfid:function(){e.navigateTo({url:"rfid"})},mejumpwealth:function(){e.navigateTo({url:"wealth"})},mejumpbill:function(){e.navigateTo({url:"bill"})},mejumphelp:function(){e.navigateTo({url:"help"})},mejumpabout:function(){e.navigateTo({url:"about"})},mejumpexit:function(){e.removeStorageSync("userinfo"),e.reLaunch({url:"../login/login"})}}};t.default=r}).call(this,n("6e42")["default"],n("0de9")["default"])},"7f71":function(e,t,n){"use strict";n.r(t);var a=n("6d9b"),r=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);t["default"]=r.a},9019:function(e,t,n){"use strict";n.r(t);var a=n("457b"),r=n("7f71");for(var o in r)"default"!==o&&function(e){n.d(t,e,function(){return r[e]})}(o);n("1208");var u=n("2877"),i=Object(u["a"])(r["default"],a["a"],a["b"],!1,null,null,null);t["default"]=i.exports}},[["0508","common/runtime","common/vendor"]]]);