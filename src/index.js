import Vue from 'vue'
import App from './app.vue'
import createStore from './vuex/store'
import { createRouter } from './router/index'

export default function (ssrContext) {
  const store = createStore(); // 创建全新store实例
  const router = createRouter();
  const app = new Vue({
    store,
    router,
    ssrContext,
    render: (h) => h(App)
  })
  return { app, store, router }
}