<template>
  <div>
    <router-view></router-view>
    <Acomponent ref="aaa">你好</Acomponent>
  </div>
</template>

<script>
import '../registerGlobals.js'
import Acomponent from './components/a'
export default {
  name: 'app',
  components: {
    Acomponent,
  },
  beforeCreate() {
    console.log('App beforeCreate');
  },
  created() {
    console.log('App created');
  },
  beforeMount() {
    console.log('App beforeMount');
  },
  mounted() {
    console.log('App mounted');
    console.log(this.$refs.aaa.$slots.default[0].text)
  },
  methods: {
  }
}
</script>

<style>

</style>