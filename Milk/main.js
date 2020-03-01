import Vue from 'vue'
import App from './App'

import scan from './components/p-scan/scan.vue'
Vue.component('scan',scan)
//Vue.prototype.$url = 'http://www.lesvay.fun/'; 
//Vue.prototype.$url = 'http://localhost/'; 
Vue.prototype.$url = 'http://106.54.76.24'; 
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
