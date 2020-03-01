<template>
	<view>
		<view class="member-box">
			<image src="../../static/logo.png" mode='aspectFit' class="member-logo"></image>
			<view class="member-title">会员详情</view>		
		</view>
		<view class="info-box">
			<view class="title">{{memberList.member_name}}</view>
		</view>
		<view class="info-box">
			<view class="line">
				<view class="row">
					<view class="text">会员ID：</view>
					<view class="content"><view class="serviceitem">{{memberList.member_id}}</view></view>
				</view>
				<view class="row">
					<view class="text">会员卡号：</view>
					<view class="content"><view class="serviceitem">{{memberList.member_rfid}}</view></view>
				</view>
				<view class="row">
					<view class="text">账户余额：</view>
					<view class="content"><view class="serviceitem">{{memberList.member_wealth}}</view></view>
				</view>
				<view class="row">
					<view class="text">购买次数：</view>
					<view class="content"><view class="serviceitem">{{memberList.member_buycount}}</view></view>
				</view>
				<view class="row">
					<view class="text">注册时间：</view>
					<view class="content"><view class="serviceitem">{{memberList.member_regitime}}</view></view>
				</view>
				<view class="row">
					<view class="text">最后购买：</view>
					<view class="content"><view class="serviceitem">{{memberList.member_lastbuytime}}</view></view>
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
				memberList:''
			}
		},
		onLoad(e) {
			_self = this;
			this.getServerData(e);
		},
		onReady() {
			
		},
		methods: {
			getServerData(e) {
				let id=e.id;
				console.log(id);
				uni.showLoading({
					title: "正在加载数据..."
				});
				let headers = {};
				headers['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
				uni.request({
					url: this.$url + '/php/memberdetail.php',//此处使用了全局变量拼接url（main.js文件中），关于全局变量官方问答里有
					method: 'POST',//get或post
					header: headers,
					data: {
						id:id
					},
					success: function(res) {
						let data = res.data;
						if (data.ec === 0) {
							_self.memberList=data.user;
						} else {
							uni.showToast({
								title: data.msg
							});
						}
					},
					fail: () => {
						uni.showToast({
							title: '网络错误'
						});
					},
					complete() {
						uni.hideLoading();
					}
				});
			},
		}
	}
</script>

<style>
.member-box{
	padding: 0 100upx;
	position: relative;
}
.member-logo{
	width: 100%;
	width: 100%;
	height: 310upx;
	margin-top: 50upx;
}
.member-title{
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
.info-box {
	margin-left: 50upx;
	margin-right: 50upx;
	background-color: #fff;
	margin-bottom: 20upx;
}
.price {
	text-align: right;
	font-size: 46upx;
	font-weight: 600;
	color: #f47925;
	float: right;
	margin-top: 50upx;
	margin-bottom: 50upx;
}
.title {
	font-size: 50upx;
	margin-top: 50upx;
	margin-bottom: 50upx;
	float: left;
}
.line{
	width: 100%;
	border-top: #CCC 1upx solid;
	padding-top: 20upx;
}
.row {
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 20upx;
}
.text {
	font-size: 35upx;
	color: #666;
	margin-right: 20upx;
}
.content {
	font-size: 35upx;
	color: #666;
	display: flex;
	flex-wrap: wrap;
}
.serviceitem{
	margin-right: 10upx;
}
</style>
