<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show', import.meta.env)
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
/*引入公共样式不能用在main.js中 app不兼容*/
@import '@/common/index.scss';
</style>
