import Vue from 'vue'
import store from './store/store'
import Fly from 'flyio/dist/npm/wx'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'
const fly = new Fly()
Vue.prototype.$store = store
Vue.prototype.$fly = fly

const app = new Vue(App)
app.$mount()

export {fly}
