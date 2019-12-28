<template>
    <div id='child2'>
        {{name}}
        <h3>child2 {{$attrs}}</h3>
    </div>
</template>

<script>
export default {
    inheritAttrs: true,
    props: ["name"],
    created(){
         console.log(this.$attrs,this.$listeners)
     }
}

</script>

<style>

</style>
