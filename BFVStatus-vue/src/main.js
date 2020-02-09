// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Tab from 'vant/lib/tab'
import 'vant/lib/tab/style'
import Tabs from 'vant/lib/tabs'
import 'vant/lib/tabs/style'
import PullRefresh from 'vant/lib/pull-refresh'
import 'vant/lib/pull-refresh/style'
import { Swipe, SwipeItem } from 'vant'
import Popup from 'vant/lib/popup'
import 'vant/lib/popup/style'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Popup)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
