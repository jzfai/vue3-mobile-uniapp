<template>
  <view class="content">
    <div>svg-icon 使用示例(只有在h5中能使用)</div>
    <svg-icon icon-class="dashboard" class="dashboard" />
    <view>vuex测试</view>
    <view @click="getterFunc">获取getter:{{ getterValue }}</view>
    <div class="mt-2">commit</div>
    <view @click="c_openVuexTest">c_openVuexTest</view>
    <view @click="c_closeVuexTest">c_closeVuexTest</view>
    <div class="mt-2">action</div>
    <view @click="openVuexTest">openVuexTest</view>
    <view @click="closeVuexTest">closeVuexTest</view>
    <div>test的store值：{{ getterValue }}</div>
    <view @click="testReq">{{ appStore.test }}</view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
let title = ref('这是vue3版本')
let getterValue = ref(null)
import { useAppStore } from '@/store/app'
const appStore = useAppStore()
const getterFunc = () => {
  getterValue.value = appStore.cachedViews
}
//request
import uniRequest from '@/utils/uniRequest'
const testReq = () => {
  let reqConfig = {
    url: '/integration-front/user/loginOut',
    method: 'post'
  }
  uniRequest(reqConfig).then((res) => {})
}

/*mutations*/
/*建议commit用M_开头 action用A_开头*/
const c_openVuexTest = () => {
  appStore.M_vuex_test(true)
}
const c_closeVuexTest = () => {
  appStore.M_vuex_test(true)
}
/*actions*/
const openVuexTest = () => {
  appStore.A_vuex_test(true)
}
const closeVuexTest = () => {
  appStore.A_vuex_test(false)
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
