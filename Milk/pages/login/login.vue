<template>
	<view class="login-box">
		<image src="../../static/logo.png" mode='aspectFit' class="login-logo"></image>
		<view class="login-title">智能鲜奶机</view>
		<view class="login-form">
			<input v-model="loginPhone" class="login-input" placeholder-class placeholder="请输入手机号" type="number" maxlength="11" />
			<input v-model="loginPassword" class="login-input" placeholder-class password placeholder="请输入密码"/>
			<view style="padding: 0 10%;">
				<text style="color: red;">{{message}}</text>
			</view>
			<button class="login-btn" @click="goLogin">立即登录</button>
			<navigator url="register" hover-class="none" class="login-label">还没有账号？点此注册.</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginPhone: '',
				loginPassword: '',
				message: ''
			}
		},
		onLoad() {
			console.log('login页面onLoad');
		},
		methods: {
			goLogin() {
				let loginPhone = this.loginPhone;
				let loginPassword = this.loginPassword;
				if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(loginPhone))) {
					this.message = "手机号码有误，请重填";
					return false;
				}
				if (!loginPassword) {
					this.message = "密码为空";
					return false;
				}
				uni.showLoading({
					title: '登录中。。。',
					mask: false
				});
				let headers = {};
				headers['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
				let PHPSESSID = uni.getStorageSync('PHPSESSID'); 
				if (PHPSESSID) {
					headers['cookie'] = 'PHPSESSID=' + PHPSESSID;//将PHPSESSID放入请求头中,如你有其他cookies都可以缀后面，分号分割。浏览器端本身就有cookies机制，不设置
				}
				uni.request({
					url: this.$url + '/php/login.php',//此处使用了全局变量拼接url（main.js文件中），关于全局变量官方问答里有
					method: 'POST',//get或post
					header: headers,
					data: {
						phone: this.loginPhone,
						password: this.loginPassword
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
							uni.reLaunch({
								url: '../me/me'
							});
						} else {
							uni.removeStorageSync('userinfo');
							this.message = data.msg;
							uni.hideLoading();
						}
					},
					fail: () => {
						uni.hideLoading();
						this.message = "网络连接失败";
					},
					complete: () => {}
				});
			}
		}
	}
</script>


<style>
	.login-box{
		padding: 0 100upx;
		position: relative;
	}
	.login-logo{
		margin-top: 100upx;
		width: 100%;
		width: 100%;
		height: 310upx;
	}
	.login-title{
		position: absolute;
		top: 0;
		line-height: 360upx;
		font-size: 68upx;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-left: -100upx;
		margin-top: 100upx;
	}
	.login-form{
		margin-top: 200upx;
	}
	.login-input{
		background: #e2f5fc;
		margin-top: 30upx;
		border-radius: 100upx;
		padding: 20upx 40upx;
		font-size: 36upx;
	}
	.input-placeholder, .login-input{
		color: #94afce;
	}
	.login-label{
		padding: 60upx 0;
		text-align: center;
		font-size: 30upx;
		color: #a7b6d0;
	}
	.login-btn{
		background: #4191ea;
		color: #fff;
		border: 0;
		border-radius: 100upx;
		font-size: 36upx;
		margin-top: 100upx;
	}
	.login-btn:after{
		border: 0;
	}
	/*按钮点击效果*/
	.login-btn.button-hover{
		transform: translate(1upx, 1upx);
	}
</style>
