import Vue from 'vue'
import App from './src/app.vue'
import createApp from './src/index'

export default function (context) {
  return new Promise((resolve, reject) => {
    const { app, router, store} = createApp(context);
    // 找到所有 prefetchData 方法
    // let components = App.components;
    // let prefetchFns = [];
    // for (let key in components) {
    //     if (!components.hasOwnProperty(key)) continue;
    //     let component = components[key];
    //     if(component.prefetchData) {
    //         prefetchFns.push(component.prefetchData(key))
    //     }
    // }
    // 设置路由
    router.push(context.url)


    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      console.log(matchedComponents,'111', context.url)
      if (!matchedComponents.length) {
        return reject({code: 404})
      }

      // 执行asyncData方法，预拉去数据
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store: store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        context.state = store.state;
        resolve(app);
      }).catch(reject)
    }, resolve => {resolve(app)})

    // return Promise.all(prefetchFns).then((res) => {
    //     res.forEach((item, key) => {
    //         Vue.set(store.state, `${item.tagName}`, item.data);
    //     });
    //     context.state = store.state;
    //     return app;
    // });
  })
}
