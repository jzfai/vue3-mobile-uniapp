<template>
  <div>navigateOne</div>
</template>

<script setup>
import { onMounted, getCurrentInstance, watch, ref, toRefs, reactive, computed } from 'vue'
//获取store和router
// import {useRouter} from 'vue-router'
// import {useStore} from 'vuex'
let { proxy } = getCurrentInstance()
onMounted(() => {
  console.log('proxy.paramsMixin', proxy.paramsMixin)
})
// const props = defineProps({
</script>

<style scoped lang="scss"></style>
