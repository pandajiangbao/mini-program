import Vue from 'vue'
import Fly from 'flyio/dist/npm/wx'
import store from './store/store'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$fly = new Fly()
Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()
