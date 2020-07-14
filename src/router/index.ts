/*
 * @Autor: zwl
 * @Date: 2020-07-14 15:13:05
 * @LastEditors: zwl
 * @LastEditTime: 2020-07-14 17:07:32
 */ 
import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    name:'ceshi',
    component:() => import( '../views/ceshi.vue')
  },
  {
    path:'/edit',
    name:'edit',
    component:() => import( '../views/edit.vue')
  }

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
