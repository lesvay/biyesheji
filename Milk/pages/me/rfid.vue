<template>
	<view class="rfid-box">
		<image src="../../static/logo.png" mode='aspectFit' class="rfid-logo"></image>
		<view class="rfid-title">智能鲜奶机</view>		
		<view class="rfid-form">
			<!-- 
			我的id是读取用户的id，不可操作
			输入卡号可以操作也可以限制操作
			打开界面判断用户是否绑卡，如果绑卡则显示解绑，如果未绑卡则立即绑定 	
			-->
			<input class="rfid-input" v-model="rfidvalue" type="text" v-bind:placeholder="placeholder"/>
			<button class="rfid-btn" @click="gorfid">{{btntext}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btntext:'',
				placeholder:''
			}
		},
		onLoad() {
			
		},
		onReady() {
			let userinfo = uni.getStorageSync('userinfo');
			if(userinfo.member_rfid){
				this.placeholder =userinfo.member_rfid;
				this.btntext='解绑卡片';
			}else{
				this.placeholder ='请输入卡号';
				this.btntext='绑定卡片';
			}
		},
		methods: {
			gorfid() {			
				let userinfo = uni.getStorageSync('userinfo');
				let id=userinfo.member_id;
				let rfidvalue='';
				if(userinfo.member_rfid)rfidvalue='';
				else rfidvalue=this.rfidvalue;
				uni.showLoading({
					title: "正在加载数据..."
				});
				let headers = {};
				headers['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
				let PHPSESSID = uni.getStorageSync('PHPSESSID'); 
				if (PHPSESSID) {
					headers['cookie'] = 'PHPSESSID=' + PHPSESSID;//将PHPSESSID放入请求头中,如你有其他cookies都可以缀后面，分号分割。浏览器端本身就有cookies机制，不设置
				}
				uni.request({
					url: this.$url + '/php/rfid.php',//此处使用了全局变量拼接url（main.js文件中），关于全局变量官方问答里有
					method: 'POST',//get或post
					header: headers,
					data: {
						id:id,
						rfid:rfidvalue
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
							uni.hideLoading();
							uni.redirectTo({
								url: 'rfid'
							});
						} else {
							uni.removeStorageSync('userinfo');
							uni.showLoading({
								title: data.msg,
								mask: false
							});
							uni.hideLoading();
						}
					},
					fail: () => {
						uni.hideLoading();
						uni.showLoading({
							title: "网络连接失败",
							mask: false
						});
					},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
.rfid-box{
		padding: 0 100upx;
		position: relative;
	}
	.rfid-logo{
		width: 100%;
		width: 100%;
		height: 310upx;
		margin-top: 50upx;
	}
	.rfid-title{
		position: absolute;
		top: 0;
		line-height: 360upx;
		font-size: 68upx;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-left: -100upx;
		margin-top: 50upx;
	}
	.rfid-form{
		margin-top: 200upx;
	}
	.rfid-input{
		background: #e2f5fc;
		margin-top: 30upx;
		border-radius: 100upx;
		padding: 20upx 40upx;
		font-size: 36upx;
	}
	.input-placeholder, .rfid-input{
		color: #94afce;
	}
	.rfid-label{
		padding: 60upx 0;
		text-align: center;
		font-size: 30upx;
		color: #a7b6d0;
	}
	.rfid-btn{
		background: #4191ea;
		color: #fff;
		border: 0;
		border-radius: 100upx;
		font-size: 36upx;
		margin-top: 60upx;
	}
	.rfid-btn:after{
		border: 0;
	}
	/*按钮点击效果*/
	.rfid-btn.button-hover{
		transform: translate(1upx, 1upx);
	}
</style>
