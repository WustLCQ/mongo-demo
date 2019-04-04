import Vue from 'vue'
import App from './App.vue'
import './plugins/iview.js'
import axios from '@/common/axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
