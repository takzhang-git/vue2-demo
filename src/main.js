import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './common/style/main.css';
import echarts from 'echarts';

import Message from './common/components/message/message.js';
Vue.use(Message);
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);

Vue.config.productionTip = false 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
