<template>
	<view class="register-box">
		<image src="../../static/logo.png" mode='aspectFit' class="register-logo"></image>
		<view class="register-title">智能鲜奶机</view>
		<view class="register-form">
			<input class="register-input" v-model="registerName" placeholder-class placeholder="请输入用户名" />
			<input class="register-input" v-model="registerPhone" placeholder-class placeholder="请输入手机号" type="number"/>
			<input class="register-input" v-model="registerPassword" placeholder-class password placeholder="请输入密码"/>
			<input class="register-input" v-model="confirmPassword" placeholder-class password placeholder="请再输入一次密码"/>
			<view style="padding: 0 10%;">
				<text style="color: red;">{{message}}</text>
			</view>
			<button class="register-btn" @click="goRegister">立即注册</button>
			<navigator url="login" open-type='navigateBack' hover-class="none" class="register-label">已有账号，点此去登录.</navigator>
		</view>
	</view>
</template>

<script>
	export default {
			data() {
				return {
					registerPhone: '',
					registerPassword: '',
					confirmPassword: '',
					registerName: '',
					message: ''
				}
			},
			onLoad() {
				
			},
			methods: {
				goRegister() {
					let registerName = this.registerName;
					let registerPhone = this.registerPhone;
					let registerPassword = this.registerPassword;
					let confirmPassword = this.confirmPassword;
					if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(registerPhone))) {
						this.message = "手机号码有误，请重填";
						return false;
					}     
					if (!registerPassword) {
						this. message = "密码为空";
						return false;
					}
					if (!registerName) {
						this. message = "用户名为空";
						return false;
					}
					if (confirmPassword != registerPassword) {
						this.message = "两次密码不同";
						return false;
					}
					uni.showLoading({
						title: '加载中。。。',
						mask: false
					});
					let headers = {};
					headers['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
					let PHPSESSID = uni.getStorageSync('PHPSESSID');
					if (PHPSESSID) {
						headers['cookie'] = 'PHPSESSID=' + PHPSESSID;//将PHPSESSID放入请求头中,如你有其他cookies都可以缀后面，分号分割。浏览器端本身就有cookies机制，不设置
					}
					uni.request({
						url: this.$url + '/php/register.php',//此处使用了全局变量拼接url（main.js文件中），关于全局变量官方问答里有
						method: 'POST',
						header: headers,
						data: {
							name : this.registerName,
							phone : this.registerPhone,
							password : this.registerPassword
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
	.register-box{
		padding: 0 100upx;
		position: relative;
	}
	.register-logo{
		width: 100%;
		width: 100%;
		height: 310upx;
		margin-top: 100upx;
	}
	.register-title{
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
	.register-form{
		margin-top: 100upx;
	}
	.register-input{
		background: #e2f5fc;
		margin-top: 30upx;
		border-radius: 100upx;
		padding: 20upx 40upx;
		font-size: 36upx;
	}
	.input-placeholder, .register-input{
		color: #94afce;
	}
	.register-label{
		padding: 60upx 0;
		text-align: center;
		font-size: 30upx;
		color: #a7b6d0;
	}
	.register-btn{
		background: #4191ea;
		color: #fff;
		border: 0;
		border-radius: 100upx;
		font-size: 36upx;
		margin-top: 60upx;
	}
	.register-btn:after{
		border: 0;
	}
	/*按钮点击效果*/
	.register-btn.button-hover{
		transform: translate(1upx, 1upx);
	}
</style>
