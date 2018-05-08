<template>
 <div>
    <h4>{{details.title}}</h4>
    <p>
        <span>{{details.add_time}}</span>
        <span class="mui-pull-right">点击：{{details.click}}次</span>
    </p>
    <hr>
    <slot name="pics"></slot>
    <div v-html="details.content"></div>
 </div>
</template>
<script>
export default {
  props:['details']
}
</script>
<style>
img {
  width: 100%;
}
</style>