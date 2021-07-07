import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './common/style/main.css';
import echarts from 'echarts';
import filterRules from './common/utils/validate/validate';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import Message from './common/components/message/message.js';
Vue.use(Message);
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);
Vue.use(filterRules);
Vue.use(Viewer);
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
});


Vue.config.productionTip = false 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
