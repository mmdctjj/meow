<template>
    <div id='children1'>
        <h3>child {{ $attrs }}</h3>
        <Child2 v-bind="$attrs" />
    </div>
</template>

<script>
import Child2 from "@/components/child2"
export default {
    data(){
        return{
            name: 'jjjj'
        }
    },
     inheritAttrs: true,
     props: [],
     components: {
         Child2
     },
     created(){
         console.log(this.$parent.name)
         this.name = this.$parent.name;
         console.log(this.$parent.name)
         console.log(this.$children)
         this.name = 'jpj'
     }
}

</script>

<style>

</style>
