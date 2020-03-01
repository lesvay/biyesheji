<template>
	<view id="getvalue">
		<view class="header">
			<view class="bg">
				<view class="box" >
					<view class="box-hd">
						<view class="avator">
							<img src="../../static/user/face.jpg">
						</view>
						<view class="member_name">你好！{{name}}</view>
					</view>
					<view class="box-bd">
						<view class="item">
							<view class="icon"><img src="../../static/user/wealth.png"></view>
							<view class="text">余额:{{wealth}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-content">
			<view class="list">
				<view class="li noborder" @click="mejumprfid">
					<view class="icon"><image src="../../static/user/card.png"></image></view>
					<view class="text">绑卡解卡</view>
					<view class="rfid">{{rfid}}</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
			</view>
			<view class="list">
				<view class="li "  @click="mejumpwealth">
					<view class="icon"><image src="../../static/user/recharge.png"></image></view>
					<view class="text">余额充值</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " @click="mejumpbill">
					<view class="icon"><image src="../../static/user/bill.png"></image></view>
					<view class="text">消费分析</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " @click="mejumphelp">
					<view class="icon"><image src="../../static/user/help.png"></image></view>
					<view class="text">帮助中心</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " @click="mejumpabout">
					<view class="icon"><image src="../../static/user/about.png"></image></view>
					<view class="text">关于我们</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
			</view>
			<view class="list">
				<view class="li noborder" @click="mejumpexit">
					<view class="icon"><image src="../../static/user/logout.png"></image></view>
					<view class="text">退出登录</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	var _self;
	export default {
		data() {
			return {
				name: '',
				wealth: '',
				rfid:''
			};
		},
		onLoad() {
			_self = this;
		},
		onReady() {
			this.getServerData();
		},
		onNavigationBarButtonTap(e) {
			//刷新
			this.getServerData();
		},
		methods: {
			getServerData() {
				let userinfo = uni.getStorageSync('userinfo');
				let id=userinfo.member_id;			
				let headers = {};
				headers['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
				let PHPSESSID = uni.getStorageSync('PHPSESSID'); 
				if (PHPSESSID) {
					headers['cookie'] = 'PHPSESSID=' + PHPSESSID;//将PHPSESSID放入请求头中,如你有其他cookies都可以缀后面，分号分割。浏览器端本身就有cookies机制，不设置
				}
				uni.request({
					url: this.$url + '/php/me.php',//此处使用了全局变量拼接url（main.js文件中），关于全局变量官方问答里有
					method: 'POST',//get或post
					header: headers,
					data: {
						id:id
					},
					success: res => {
						console.log(res);
						let cookies = res.cookies;
						if (cookies) {
							for (let i = 0; i < cookies.length; i++) {
								if (cookies[i].name == 'PHPSESSID') {//PHPSESSID从cookies取出，放入本地储存
									uni.setStorageSync('PHPSESSID', cookies[i].value);
									break;
								}
							}
						}
						//返回的基本信息做本地缓存
						let data = res.data;
						if (data.ec === 0) {
							uni.setStorageSync('userinfo', data.user);
							_self.name = userinfo.member_name;
							_self.wealth =userinfo.member_wealth;
							if(userinfo.member_rfid){
								_self.rfid ='我的卡号:'+userinfo.member_rfid;
							}else{
								_self.rfid ='未绑定卡片';
							}
						} else {
							uni.reLaunch({
								url: '../login/login'
							});
						}
					},
					fail: () => {
						uni.hideLoading();
						this.message = "网络连接失败";
					},
					complete: () => {}
				});
			},
			mejumprfid(){
				uni.navigateTo({
					url: 'rfid'
				})
			},
			mejumpwealth(){
				uni.navigateTo({
					url: 'wealth'
				})
			},
			mejumpbill(){
				uni.navigateTo({
					url: 'bill'
				})
			},
			mejumphelp(){
				uni.navigateTo({
					url: 'help'
				})
			},
			mejumpabout(){
				uni.navigateTo({
					url: 'about'
				})
			},
			mejumpexit(){
				uni.removeStorageSync('userinfo');
				uni.reLaunch({
					url: '../login/login'
				});
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color:#f1f1f1;
	font-size: 30upx;
}
.header{
	background: #fff;
	height: 290upx;
	padding-bottom: 110upx;
	.bg{
		width: 100%;
		height:200upx;
		padding-top:100upx;
		background-color:#4191ea;
	}
}
.box{
	width: 650upx;
	height: 280upx;
	border-radius: 20upx;
	margin: 0 auto;
	background: #fff;
	box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2); 
	.box-hd{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		.avator{
			width: 160upx;
			height: 160upx;
			background: #fff;
			border: 5upx solid #fff;
			border-radius: 50%;
			margin-top: -80upx;
			overflow: hidden;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.member_name{
			width: 100%;
			text-align: center;
		}
	}
	.box-bd{
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: center;
		.item{
			flex: 1 1 auto;
			display: flex;
			flex-wrap: wrap;
			flex-direction:row;
			justify-content: center;
			border-right: 1px solid #f1f1f1;
			margin: 15upx 0;
			&:last-child{
				border: none;
			}
			.icon{
				width: 60upx;
				height: 60upx;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.text{
				width: 100%;
				text-align: center;
				margin-top: 10upx;
			}
		}
	}
}
.list-content{
	background: #fff;
}
.list{ 
	width:100%;
	border-bottom:15upx solid  #f1f1f1;
	background: #fff;
	&:last-child{
		border: none;
	}
	.li{
		width:92%;
		height:100upx;
		padding:0 4%;
		border-bottom:1px solid rgb(243,243,243);
		display:flex;
		align-items:center;
	&.noborder{
		border-bottom:0
		}
		.icon{
			flex-shrink:0;
			width:50upx;
			height:50upx;
			image{
				width:50upx;
				height:50upx;
			}
		}
		.text{
			padding-left:20upx;
			width:100%;
			color:#666;
		}
		.rfid{
			color:#CCC;
			width:80%;
		}
		.to{
			flex-shrink:0;
			width:40upx;
			height:40upx;
		}
	}
}
</style>
