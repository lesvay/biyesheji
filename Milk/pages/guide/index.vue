<template>
    <view class="content"></view>
</template>

<script>
export default {
    onLoad() {
        this.checkGuide();
        console.log( "onLoad" )
    },

    methods: {
        checkGuide() {
            // 思路： 检测是否有启动缓存，如果没有，就是第一次启动，第一次启动就去 启动介绍页面
            const launchFlag = uni.getStorageSync('launchFlag');
            if (launchFlag) {
               uni.reLaunch({
                    url: '../login/index'
                });
            } else {
                console.log('去启动介绍页');
                uni.reLaunch({
                    url: 'guide'
                });
            }
        }
    }
};
</script>

<style></style>
