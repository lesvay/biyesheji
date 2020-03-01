<template>
    <view class="content"></view>
</template>

<script>
export default {
    onLoad() {
        this.checkLogin();
        console.log( "onLoad" )
    },

    methods: {
        checkLogin() {
            // 思路： 检测是否有启动缓存，如果没有，就是第一次启动，第一次启动就去 启动介绍页面
            const userinfo = uni.getStorageSync('userinfo');
            if (userinfo) {
               uni.reLaunch({
                    url: '../me/me'
                });
            } else {
                console.log('去登录页');
                uni.reLaunch({
                    url: 'login'
                });
            }
        }
    }
};
</script>

<style></style>
