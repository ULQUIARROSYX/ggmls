import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import Cube from 'cube-ui'
Vue.use(Cube)

const axiosInstance = axios.create({
    'baseURL': 'https://www.30mi.com:3002',
    'timeout': 5000, // 超时时间
})
Vue.prototype.$axios = axiosInstance


// request拦截器==>对请求做处理
axiosInstance.interceptors.request.use(config => {
    return config
})
// response拦截器==>对响应做处理
axiosInstance.interceptors.response.use(
    response => {
        return response
    },
    err => {
        return Promise.reject(err)
    }
)
// 时间戳
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
