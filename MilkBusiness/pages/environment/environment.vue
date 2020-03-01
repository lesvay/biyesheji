<template>
	<view>
		<view class="envir-box">
			<image src="../../static/logo.png" mode='aspectFit' class="envir-logo"></image>
			<view class="envir-title">智能鲜奶机</view>		
		</view>
		<view class="info-box">
			<view class="line">
				<view class="row">
					<view class="text">温度：</view>
					<view class="content"><view class="serviceitem">{{tempervalue}}°C</view></view>
				</view>
				<view class="row">
					<view class="text">湿度：</view>
					<view class="content"><view class="serviceitem">{{humidvalue}}%RH</view></view>
				</view>
				<view class="row">
					<view class="text" style="font-size: 10upx;">此功能需与单片机联动</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mqtt from '../../components/mqtt/mqtt.js';
	export default {
		data() {
			return {
				tempervalue:'loading',
				humidvalue:'loading',
				client: null,
				//记录重连的次数
				reconnectCounts: 0,
				//MQTT连接的配置
				options: {
				  protocolVersion: 4, //MQTT连接协议版本
				  clientId: 'milkbusiness',
				  clean: true,
				  password: 'public',
				  username: 'admin',
				  reconnectPeriod: 1000, //1000毫秒，两次重新连接之间的间隔
				  connectTimeout: 30 * 1000, //1000毫秒，两次重新连接之间的间隔
				  resubscribe: true //如果连接断开并重新连接，则会再次自动订阅已订阅的主题（默认true）
				}
			}
		},
		onReady() {
			this.connect();
		},
		onNavigationBarButtonTap(e) {
			//刷新
			this.connect();
		},
		methods: {
			connect() {
				var self = this
				// #ifdef H5
				var host = 'ws://106.54.76.24:8083/mqtt'
				// #endif
				// #ifdef MP-WEIXIN||APP-PLUS
				var host = 'wx://106.54.76.24:8083/mqtt'
				// #endif
				self.client = mqtt.connect(host, self.options);
				console.log('connect');
				self.client.on('connect', function() {
					console.log('on connect');
					//self.logs.push('on connect')
					self.client.subscribe('temper', function(err) {
						if (!err) {
							//console.log('temper on err');
							self.client.publish('temper', 'loading')
						}
					})
					self.client.subscribe('humid', function(err) {
						if (!err) {
							//console.log('humid on err');
							self.client.publish('humid', 'loading')
						}
					})
				}).on('reconnect', function() {
					console.log('on reconnect');
					//self.logs.push('on reconnect')
				}).on('error', function() {
					console.log('on error');
					//self.logs.push('on error')
				}).on('end', function() {
					console.log('on end');
					//self.logs.push('on end')
				}).on('message', function(topic, message) {
					console.log(topic);
					//self.logs.push(topic)
					if(topic.toString()=='temper'){
						self.tempervalue=message.toString();
						console.log(topic);
						console.log(message.toString());
					}
					else if(topic.toString()=='humid'){
						self.humidvalue=message.toString();
						console.log(topic);
						console.log(message.toString());
					}
					//self.logs.push(message.toString())
				})
			}
		}
	}
</script>

<style>
	.envir-box{
		padding: 0 100upx;
		position: relative;
		height: 360upx;
	}
	.envir-logo{
		width: 100%;
		width: 100%;
		height: 310upx;
		margin-top: 50upx;
	}
	.envir-title{
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
		margin-top: 50upx;
		width: 100%;
		display: flex;
		align-items: center;
		margin-left: 40upx;
		margin-bottom: 20upx;
	}
	.text {
		font-size: 50upx;
		color: #666;
		margin-right: 20upx;
	}
	.content {
		font-size: 50upx;
		color: #666;
	}
	.serviceitem{
		margin-right: 10upx;
	}
</style>
