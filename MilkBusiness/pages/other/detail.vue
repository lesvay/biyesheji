<template>
	<view>
		<view class="rfid-box">
			<image src="../../static/logo.png" mode='aspectFit' class="rfid-logo"></image>
			<view class="rfid-title">产品详情</view>		
		</view>
		<view class="info-box">
			<view class="title">{{rfidList.goods_name}}</view>
			<view class="price">￥{{rfidList.goods_price}}元</view>		
		</view>
		<view class="info-box">
			<view class="line">
				<view class="row">
					<view class="text">购买会员：</view>
					<view class="content"><view class="serviceitem">{{rfidList.goods_member}}</view></view>
				</view>
				<view class="row">
					<view class="text">机器编号：</view>
					<view class="content"><view class="serviceitem">{{rfidList.goods_machnum}}</view></view>
				</view>
				<view class="row">
					<view class="text">唯一标识号：</view>
					<view class="content"><view class="serviceitem">{{rfidList.goods_rfid}}</view></view>
				</view>
				<view class="row">
					<view class="text">购买时间：</view>
					<view class="content"><view class="serviceitem">{{rfidList.goods_buytime}}</view></view>
				</view>
				<view class="row">
					<view class="text">保质期：</view>
					<view class="content"><view class="serviceitem">{{rfidList.goods_deadtime}}</view></view>
				</view>
				<view class="row">
					<view class="text">产地：</view>
					<view class="content"><view class="serviceitem">{{rfidList.goods_orign}}</view></view>
				</view>
				<view class="row">
					<view class="text">介绍：</view>
					<view class="content"><view class="serviceitem">{{rfidList.goods_introduce}}</view></view>
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
				rfidList:''
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
				let rfid=e.rfid;
				console.log(rfid);
				uni.showLoading({
					title: "正在加载数据..."
				});
				let headers = {};
				headers['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
				uni.request({
					url: this.$url + '/php/detail.php',//此处使用了全局变量拼接url（main.js文件中），关于全局变量官方问答里有
					method: 'POST',//get或post
					header: headers,
					data: {
						rfid:rfid
					},
					success: function(res) {
						let data = res.data;
						if (data.ec === 0) {
							_self.rfidList=data.user;
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
