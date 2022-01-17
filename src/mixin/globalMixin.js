import config from '@/config'
export default {
  data() {
    return {
      paramsMixin: {},
      centerModalShowMixin: false,
      buttonModalShowMixin: false,
      userInfoMixin: null,
      userIsLoginMixin: true,
      VUE_APP_BASE_URL: '',
      VUE_APP_BASE_IMAGE_URL: '',
      packingAddrArr: [],
      /* 时间相关 */
      currentTimeMixin: '',
      afterOneTimeMixin: '',
      currentDayMixin: '',
      afterOneDayMixin: '',
      /* 分页相关 */
      pageNumMixin: 1,
      pageSizeMixin: 5,
      isHasDataMixin: true,
      listDataMixin: [],
      /*canvas相关*/
      canvasBgWidthMixin: null,
      canvasBgHeightMixin: null,
      canvasUrlMixin: '',
      listsMixin: []
    }
  },

  //create
  onLoad(options) {
    /* 获取今天的时间*/
    this.currentTimeMixin = this.$momentMini().format('YYYY-MM-DD HH:mm:ss')
    this.currentDayMixin = this.$momentMini().format('YYYY-MM-DD')
    this.afterOneTimeMixin = this.$momentMini().add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
    this.afterOneDayMixin = this.$momentMini().add(1, 'days').format('YYYY-MM-DD')
    this.paramsMixin = options && options.params && JSON.parse(options.params)
    this.userInfoMixin = uni.getStorageSync('USER_INFO')
  },
  //mounter
  onShow() {},
  methods: {
    reshowDataMixin(row, form) {
      Object.keys(row).forEach((fItem) => {
        Object.keys(form).forEach((sItem) => {
          if (fItem === sItem) {
            // console.log('复制了', sItem)
            form[sItem] = row[sItem]
          }
        })
      })
    },
    touchMoveStopMixin() {
      return false
    },
    closeCenterModalMixin() {
      this.centerModalShowMixin = false
    },
    closeButtonModalMixin() {
      this.buttonModalShowMixin = false
    },
    dillParams(options) {
      //this.paramsMixin = options && options.params && JSON.parse(options.params)
    },
    toNavigatePageMixin(path, param) {
      console.log('toNavigatePageMixin', path, param)
      //如果需要权限校验可以使用下面的代码
      // if (!uni.getStorageSync('USER_INFO')) {
      // 	this.wxShowToastNone("您还没登录，请先登录")
      // 	return;
      // }
      if (param) {
        uni.navigateTo({
          url: `${path}?params=${JSON.stringify(param)}`
        })
      } else {
        uni.navigateTo({
          url: `${path}`
        })
      }
    },
    toNavigateBackMixin(deep) {
      uni.navigateBack({
        delta: 2
      })
    },

    toRedirectToPageMixin(path, param) {
      console.log('toRedirectToPageMixin', path, param)
      // if (!uni.getStorageSync('USER_INFO')) {
      // 	this.wxShowToastNone("您还没登录，请先登录")
      // 	return;
      // }
      if (param) {
        uni.redirectTo({
          url: `${path}?params=${JSON.stringify(param)}`
        })
      } else {
        uni.redirectTo({
          url: `${path}`
        })
      }
    },
    toSwitchPageMixin(path, param) {
      console.log("uni.getStorageSync('USER_INFO')", uni.getStorageSync('USER_INFO'))
      // if (!uni.getStorageSync('USER_INFO')) {
      // 	this.wxShowToastNone("您还没登录，请先登录")
      // 	return;
      // }
      if (param) {
        uni.switchTab({
          url: `${path}?params=${JSON.stringify(param)}`
        })
      } else {
        uni.switchTab({
          url: `${path}`
        })
      }
    },
    //隐藏loading
    hideLoadingMixin(LoadingTitle) {
      uni.hideLoading()
    },
    //显示loading
    showLoadingMixin(LoadingTitle) {
      console.log('showLoading', LoadingTitle)
      uni.showLoading({ title: `${LoadingTitle}`, mask: true })
    },
    wxShowToastSuccess(title, duration) {
      this.sleepMixin(50).then(() => {
        uni.showToast({
          title: title,
          icon: 'success',
          duration: duration || 2000
        })
      })
    },
    wxShowToastNone(title, duration) {
      this.sleepMixin(50).then(() => {
        uni.showToast({
          title: title,
          icon: 'none',
          duration: duration || 2000
        })
      })
    },
    getWxLoginCodeMixin() {
      return new Promise((resolve) => {
        uni.login({
          success: (res) => {
            console.log(res)
            resolve(res.code)
          },
          error: (err) => {
            this.wxShowToastNone('获取code失败')
          }
        })
      })
    },
    //获取用户的openId
    getWxLoginOpenIdMixin() {
      return new Promise((resolve) => {
        if (uni.getStorageSync('USER_OPEN_ID')) {
          return uni.getStorageSync('USER_OPEN_ID')
        } else {
          uni.login({
            success: (res) => {
              //发动请求获取openId
              this.$uniRequest({
                url: '/applet-mini/mini/openId',
                method: 'get',
                isSBLoading: true,
                data: {
                  code: res.code
                },
                isHALoading: true,
                isParams: true
              }).then((res) => {
                //将openId存储到本地
                uni.setStorageSync('USER_OPEN_ID', res.data)
                resolve(res.data)
              })
            },
            error: (err) => {
              this.wxShowToastNone('获取code失败')
            }
          })
        }
      })
    },
    //类似java 的线程阻塞
    sleepMixin(time) {
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          clearTimeout(timer)
          resolve()
        }, time)
      })
    }
  }
}
