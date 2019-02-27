import Vue from 'vue'
import store from './store/store'
import Fly from 'flyio/dist/npm/wx'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'
const fly = new Fly()
fly.config.baseURL = 'http://localhost:8082'

// 添加请求拦截器
fly.interceptors.request.use((request) => {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
})

// 添加响应拦截器
fly.interceptors.response.use((response) => {
  wx.hideLoading()
})

Vue.prototype.$store = store
Vue.prototype.$fly = fly
const app = new Vue(App)
app.$mount()

export {fly}
