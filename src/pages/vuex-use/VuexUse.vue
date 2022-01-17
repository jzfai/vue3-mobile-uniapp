<template>
  <div>
    <div>getter</div>
    <van-button @click="getterFunc">获取getter:{{ getterValue }}</van-button>
    <div class="mt-2">commit</div>
    <van-button @click="c_openSideBar">c_openSideBar</van-button>
    <van-button @click="c_closeSideBar">c_closeSideBar</van-button>
    <div class="mt-2">action</div>
    <van-button @click="openSideBar">openSideBar</van-button>
    <van-button @click="closeSideBar">closeSideBar</van-button>
    <div>是否开启：{{ opened }}</div>
  </div>
</template>

<script>
/*可以设置默认的名字*/
import { mapState } from 'vuex'
export default {
  name: 'Login',
  computed: {
    ...mapState({
      opened: (state) => state.app,
      opened2: (state) => state.app
    })
  }
}
</script>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
/*getter*/
let getterValue = ref(null)
const getterFunc = () => {
  getterValue.value = store.getters.cachedViews
}

/*mutations*/
/*建议commit用M_开头 action用A_开头*/
const c_openSideBar = () => {
  store.commit('app/M_vuex_test', true)
}
const c_closeSideBar = () => {
  store.commit('app/M_vuex_test', false)
}
/*actions*/
const openSideBar = () => {
  store.dispatch('app/A_vuex_test', true)
}
const closeSideBar = () => {
  store.dispatch('app/A_vuex_test', false)
}
</script>

<style scoped lang="scss"></style>
