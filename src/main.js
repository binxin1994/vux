import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AlertPlugin from 'vux/src/plugins/alert/index.js'
import toast from "vux/src/plugins/toast/index.js"
// import './utils/rem.js'
import 'lib-flexible'
Vue.use(AlertPlugin)
Vue.use(toast)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
