import Vue from 'vue'
import './common'
import App from './App.vue'
import store from './store'
import 'vant/lib/index.css'

Vue.config.productionTip = false


new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
