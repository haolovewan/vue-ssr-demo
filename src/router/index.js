import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../view/home/index.vue'
import Detail from '../view/detail/index.vue'

Vue.use(VueRouter)

export function createRouter () {
  return new VueRouter({
    mode: 'history',
    fallback: false,
    routes: [
      {
        path: '/index',
        name: 'index',
        component: Index
      },
      {
        path: '/detail/:aid',
        name: 'detail',
        component: Detail
      },
      {
        path: '*',
        redirect: '/index',
      }
    ]
  })
}