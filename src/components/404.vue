<template>
  <div>
    <Child1 ref="children1" v-on:hello="sayHello" :name="name" :age="age" :say="say" />
  </div>
</template>

<script>
import Child1 from '@/components/children'
export default {
  data(){
    return {
      name: '123',
      age: 23,
      say: 'hello'
    }
  },
  mounted(){
    console.log(this.$refs.children1.name)
  },
  components: {
    Child1
  },
  methods: {
    sayHello(){
      console.log("hello")
    }
  }
};
</script>

<style>
</style>
