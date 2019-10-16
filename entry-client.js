import Vue from 'vue'
import createApp from './src/index.js'

const { app, router, store } = createApp();

// 挂载之前
Vue.mixin({
  beforeMount () {
    const { asyncData } = this.$options
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  }
})
// /user/1 或者user/2
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

// 如果有__INITIAL_STATE__变量，则将store的状态用它替换
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  // 通过路由勾子，执行拉取数据逻辑
  // router.beforeResolve((to, from, next) => {
  //   console.log(to, from)
  //   // 找到增量组件，拉取数据 
  //   const matched = router.getMatchedComponents(to) 
  //   const prevMatched = router.getMatchedComponents(from) 
  //   let diffed = false
  //   const activated = matched.filter((c, i) => {
  //     return diffed || (diffed = (prevMatched[i] !== c))
  //   })
  //   // 组件数据通过执行asyncData方法获取
  //   const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
  //   console.log(asyncDataHooks, '===asyncDataHooks')
  //   if (!asyncDataHooks.length) {
  //     return next()
  //   }
  //   // 要注意asyncData方法要返回promise，asyncData调用的vuex action也必须返回promise
  //   Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
  //     .then(() => {
  //       next()
  //     })
  //     .catch(next)
  // })
  console.log(router.currentRoute)
  // 将Vue实例挂载到dom中，完成浏览器端应用启动
  app.$mount('#app')
  // router.start(app, '#app')
})
