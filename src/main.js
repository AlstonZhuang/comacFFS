import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

//引入echarts
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts //可以全局使用 不用每次使用需要在页面导入

//引入阿里图标
import "../public/icons/iconfont.css"

Vue.use(ElementUI, { locale })


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
