<template>
	<view>
		<view class="help-box">
			<image src="../../static/logo.png" mode='aspectFit' class="help-logo"></image>
			<view class="help-title">帮助文档</view>		
		</view>
		<view class="info-box">
		</view>
	</view>
</template>

<script>
</script>

<style>
.help-box{
	padding: 0 100upx;
	position: relative;
}
.help-logo{
	width: 100%;
	width: 100%;
	height: 310upx;
	margin-top: 50upx;
}
.help-title{
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
</style>
