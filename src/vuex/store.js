import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    state: {
      detail: '',
    },
    getters: {
      getDetail(state) {
        return state.detail;
      }
    },
    mutations: {
      detail(state, arg) {
        state.detail = arg;
        console.log(state)
      }
    },
    actions: {
      getDetail({commit}, payload) {
        console.log('1111111111112222222')
        var p = new Promise((resolve) => {
          setTimeout(() => {
            resolve({data: '我是数据'})
          })
        })
        return p.then(data => {
          console.log(data);
          commit('detail', data.data);
        })
      }
    }
  })
}
