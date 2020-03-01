<template>
	<view class="billainer">
		<view class="qiun-charts">
			<view style="text-align: center; width: 100%;">{{newuser}}</view>
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			<!-- 使用图表拖拽功能时，建议给canvas增加disable-scroll=true属性，在拖拽时禁止屏幕滚动 -->
			<!--#endif-->
		</view>
		<view class="billBg">
			<view class="billOver" v-for="(item,index) in billList" :key="index" @click="godetail(item.goods_rfid)" >
				<view class="idxMainBox">
					<view class="billOverLt">
						<view class="billName">{{item.goods_name}}</view>
						<view class="billBuytime">购买日期：{{item.goods_buytime}}</view>
						<view class="billdeadtime">截止日期：{{item.goods_deadtime}}</view>	
						<view class="billmachnum">机器编号：{{item.goods_machnum}}</view>
					</view>
					<view class="billOverRt">
						<view class="billPrice">￥{{item.goods_price}}元</view>
						<view class="billMore">查看更多>></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '../../components/u-charts/u-charts.js';
	var _self;
	var canvasObj = {};
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				itemCount: 30, //x轴单屏数据密度
				sliderMax: 50,
				//billList:[{name:'标题标题', buytime:'2019-7-30', deadtime:'2019-7-30', price:'20' }],
				billList:[],
				newuser:'',
			}
		},
		onLoad(e) {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
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

				//let billList=this.billList;
				uni.showLoading({
					title: "正在加载数据..."
				});
				let headers = {};
				headers['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
				uni.request({
					url: this.$url + '/php/bill.php',//此处使用了全局变量拼接url（main.js文件中），关于全局变量官方问答里有
					method: 'POST',//get或post
					header: headers,
					data: {
						id:id
					},
					success: function(res) {
						let data = res.data;
						if (data.ec === 0) {
							_self.billList=data.user;
							_self.fillData(data);
						} else {
							_self.newuser='暂无数据';
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
			fillData(data) {
				this.serverData = data;
				let LineA = {
					categories: [],
					series: []
				};
				LineA.categories = data.LineA.categories;
				LineA.series = data.LineA.series;
				this.showLineA("canvasLineA", LineA);
			},
			showLineA(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					padding:[15,15,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:5,
					},
					dataLabel: false,
					dataPointShape: false,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						disableGrid: false,
						type: 'grid',
						gridType: 'dash',
						itemCount: 5, 
						scrollShow: false, 
						scrollAlign: 'left',
						scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						scrollColor:'#4191ea',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						//disabled:true
						gridType: 'dash',
						splitNumber: 5,
						min: 0,
						max: 50,
						format: (val) => {
							return val.toFixed(0) + '瓶'
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						lineStyle: 'straight'
					},
				});		
			},
			touchLineA(e) {
				canvasObj['canvasLineA'].scrollStart(e);
			},
			moveLineA(e) {
				canvasObj['canvasLineA'].scroll(e);
			},
			touchEndLineA(e) {
				canvasObj['canvasLineA'].scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvasObj['canvasLineA'].showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			godetail(rfid){
				uni.navigateTo({
					url: '../QRcode/detail?rfid='+rfid
				});
				console.log(rfid);
				//let url='../QRcode/detail?rfid='+rfid;
				// uni.navigateTo({
				//  	url: url
				// })
			}
		}
	}
</script>
<style>
	page {
		display: block;
		height: 100%;
		background-color: #efeff4;
	}
	.billainer {
		box-sizing: border-box;
		height: 100%;
		background-color: #efeff4;
	}
	.qiun-charts {
		width: 750upx;
		height: 40%;
		background-color: #FFFFFF;
	}
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	.idxMain{ width: 100%;padding-top: 100upx; }
	.idxMainBox{ width: 92%;margin: 0 auto; }
	.billBg{ 
		background: #FFFFFF;
		overflow: hidden;
		height:60%;
		overflow-x: hidden;       /* 解决左右可以滑动的问题 */
		overflow-y: auto;       /* 解决左右可以滑动的问题 */
		overflow-scrolling: touch;   /*兼容性 ios5+、android4+ */}
	
	.billOver{ border-bottom: 1px #EDEDED solid;overflow: hidden;transition: all 0.4s; }
	.billOver:active{ background: #E2E2E2; }
	.billOver:last-child{ border-bottom: none; }
	.billOverLt{ float: left;width: 60%; }
	.billName{
		color: #333333;
		font-size: 30upx;
		width: 100%;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient:vertical;
		overflow: hidden;
		padding-top: 30upx;
	}
	.billBuytime,.billdeadtime,.billmachnum{ color: #888888;font-size: 24upx;margin-top: 10upx; }
	.billMore{ color: #888888;font-size: 24upx;margin-top: 30upx; }
	.billOverRt{ float: right;width: 35%;height: 155upx;margin: 30upx 0; }
	.billPrice{
		margin-top: 30upx;
		margin-left: 40%;
	}
	.billMore{
		float: right;
	}
</style>
