import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/page1',
      name: 'page1',
      component: () => import('./pages/page1.vue'),
    },
    {
      path: '/page2',
      name: 'page2',
      component: () => import('./pages/page2.vue'),
    },
    {
      path: '*',
      redirect: '/page1'
    }
  ]
})
