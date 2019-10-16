<template>
  <div @click="clickme()">
    {{title}}
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'a-component',
  data () {
    return {
      title: '我是A'
    }
  },
  mounted() {
    console.log('我是A')
  },
  methods: {
    clickme() {
      console.log('aaaa=>',1111)
    }
  }
}
</script>

<style>

</style>