<template>
  <div>
    {{$route.params.aid}}-{{fetchData}}-{{detail}}
    <router-link to="/index">返回</router-link>
    <a href="/index">点我返回</a>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      detail: ''
    }
  },
  asyncData({store}) {
    console.log(store, '详情')
    return store.dispatch('getDetail', 1);
  },
  computed: {
    fetchData() {
      console.log(this.$store)
      return this.$store.state.detail || (window.__INITIAL_STATE__ && window.__INITIAL_STATE__.detail)
    }
  },
  mounted() {
    console.log(this.$route.params.aid)
    var p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('我是详情');
      })
    })
    p.then(data => {
      this.detail =data;
    })
  }
}
</script>

<style>

</style>