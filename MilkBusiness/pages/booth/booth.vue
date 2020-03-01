<!-- 
1正常#f8e4e5
2售出#f3c5ab
3空瓶#ace0eb
4过期#f3f5c3
 -->
<template>
	<view class="warp">	
		<view class="example-body">
			<uni-grid :column="column" :show-border="false" :highlight="true">
				<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
					<view class="grid-item-box">
						<view class="grid_unit" :style="{'background-color':item.booth_color}">
							<view class='grid_unit_id'>ID：{{item.booth_id}}</view>
							<view class='grid_unit_status'>{{item.booth_status}}</view>
						</view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	var _self;
	export default {
		components: {
			uniSection,
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				list: [],
				column:4
			}
		},
		onLoad(e) {
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
				uni.showLoading({
					title: "正在加载数据..."
				});
				let headers = {};
				headers['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
				uni.request({
					url: this.$url + '/php/booth.php',//此处使用了全局变量拼接url（main.js文件中），关于全局变量官方问答里有
					method: 'POST',//get或post
					header: headers,
					data: {
						id:'1'
					},
					success: function(res) {
						let data = res.data;
						if (data.ec === 0) {
							_self.list=data.user;
							//alert(Math.sqrt(_self.list.length));
							for(let i=0;i<_self.list.length;i++){
								if(_self.list[i].booth_status=='1'){_self.list[i].booth_color='#5fc248';_self.list[i].booth_status="出售中"}
								else if(_self.list[i].booth_status=='2'){_self.list[i].booth_color='#766186';_self.list[i].booth_status='空箱';}
								else if(_self.list[i].booth_status=='3'){_self.list[i].booth_color='#57b7df';_self.list[i].booth_status='空瓶';}
								else if(_self.list[i].booth_status=='4'){_self.list[i].booth_color='#ff4b4b';_self.list[i].booth_status='过期';}
								else{_self.list[i].booth_color='#f8e4e5'; _self.list.booth_status='数据错误';}
								//1正常#f8e4e5
								//2售出#f3c5ab
								//3空瓶#ace0eb
								//4过期#f3f5c3
							}
							_self.column=String(Math.sqrt(_self.list.length));
						} else {
							uni.showLoading({
								title: data.msg,
								mask: false
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
			// godetail(rfid){
			// 	uni.navigateTo({
			// 		url: '../other/detail?rfid='+rfid
			// 	});
			// 	console.log(rfid);
			// 	//let url='../QRcode/detail?rfid='+rfid;
			// 	// uni.navigateTo({
			// 	//  	url: url
			// 	// })
			// }
		},
		
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}
	view {
		font-size: 14px;
		line-height: inherit;
	}
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		font-size: 14px;
		background-color: #ffffff;
		flex-direction: column;
		padding: 15px;
	}
	.grid-item-box{
		width: 90%;
		height: 90%;
		padding: 5%;
	}
	.grid_unit {
		width:100%;
		height:100%;
		color: #FFFFFF;
	}
	.grid_unit_id{
		font-size: 30upx;
		position:absolute;
		left:20upx;
		top:20upx;
	}
	.grid_unit_status{
		position:absolute;
		right:20upx;
		bottom:20upx;
		font-size: 40upx;
	}
</style>