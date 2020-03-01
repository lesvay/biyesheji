<template>
	<view>
		<view class="about-box">
			<image src="../../static/logo.png" mode='aspectFit' class="about-logo"></image>
			<view class="about-title">关于我们</view>		
		</view>
		<view class="info-box">
			<view class="line">
				<view class="row">
					<view class="text">作者：</view>
					<view class="content"><view class="serviceitem">李紫薇</view></view>
				</view>
				<view class="row">
					<view class="text">班级：</view>
					<view class="content"><view class="serviceitem">物联网162</view></view>
				</view>
				<view class="row">
					<view class="text">学号：</view>
					<view class="content"><view class="serviceitem">2016212033</view></view>
				</view>
				<view class="row">
					<view class="text">名称：</view>
					<view class="content"><view class="serviceitem">基于RFID的智能鲜奶贩卖系统设计与实现</view></view>
				</view>
				<view class="row">
					<view class="text">简介：</view>
					<view class="content"><view class="serviceitem">该作品由商家APP、顾客APP、贩卖机单片机三部分组成</view></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
.about-box{
	padding: 0 100upx;
	position: relative;
}
.about-logo{
	width: 100%;
	width: 100%;
	height: 310upx;
	margin-top: 50upx;
}
.about-title{
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
}
.serviceitem{
	margin-right: 10upx;
}
</style>
