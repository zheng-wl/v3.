/*
 * @Autor: zwl
 * @Date: 2020-07-14 15:13:05
 * @LastEditors: zwl
 * @LastEditTime: 2020-07-14 16:18:01
 */ 
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import VueCompositionAPI from '@vue/composition-api'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(VueCompositionAPI)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
