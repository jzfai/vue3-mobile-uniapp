import momentMini from 'moment-mini'
export const useCommonExample = () => {
  const state = reactive({
    params: {},
    centerModalShow: false,
    buttonModalShow: false,
    userInfo: null,
    userIsLogin: true,
    VUE_APP_BASE_URL: '',
    VUE_APP_BASE_IMAGE_URL: '',
    packingAddrArr: [],
    /* 时间相关 */
    currentTime: '',
    afterOneTime: '',
    currentDay: '',
    afterOneDay: '',
    /* 分页相关 */
    pageNum: 1,
    pageSize: 5,
    isHasData: true,
    listData: [],
    /*canvas相关*/
    canvasBgWidth: null,
    canvasBgHeight: null,
    canvasUrl: '',
    lists: []
  })
  // 读取.env 多坏境里的数据
  state.VITE_APP_IMAGE_URL_PRE = import.meta.env.VITE_APP_BASE_URL
  state.VITE_APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL
  /* 获取时间点*/
  state.todayTime = momentMini().startOf('day').format('YYYY-MM-DD HH:mm:ss')
  state.currentTime = momentMini(new Date()).format('YYYY-MM-DD HH:mm:ss')
  state.todayTimeLast = momentMini().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  state.beforeThreeDateTime = momentMini().add(-3, 'days').format('YYYY-MM-DD HH:mm:ss')
  state.yesterdayTime = momentMini().add(-1, 'days').format('YYYY-MM-DD HH:mm:ss')

  const touchMoveStop = () => {
    return false
  }
  const closeCenterModal = () => {
    state.centerModalShow = false
  }
  const closeButtonModal = () => {
    state.buttonModalShow = false
  }
  const dillParams = (options) => {
    //state.params = options && options.params && JSON.parse(options.params)
  }
  const toNavigatePage = (path, param) => {
    console.log('toNavigatePage', path, param)
    //如果需要权限校验可以使用下面的代码
    // if (!uni.getStorageSync('USER_INFO')) {
    // 	state.wxShowToastNone("您还没登录，请先登录")
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
  }
  const toNavigateBack = (deep) => {
    uni.navigateBack({
      delta: 2
    })
  }

  const toRedirectToPage = (path, param) => {
    console.log('toRedirectToPage', path, param)
    // if (!uni.getStorageSync('USER_INFO')) {
    // 	state.wxShowToastNone("您还没登录，请先登录")
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
  }
  const toSwitchPage = (path, param) => {
    console.log("uni.getStorageSync('USER_INFO')", uni.getStorageSync('USER_INFO'))
    // if (!uni.getStorageSync('USER_INFO')) {
    // 	state.wxShowToastNone("您还没登录，请先登录")
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
  }
  //隐藏loading
  const hideLoading = (LoadingTitle) => {
    uni.hideLoading()
  }
  //显示loading
  const showLoading = (LoadingTitle) => {
    console.log('showLoading', LoadingTitle)
    uni.showLoading({ title: `${LoadingTitle}`, mask: true })
  }
  const wxShowToastSuccess = (title, duration) => {
    state.sleep(50).then(() => {
      uni.showToast({
        title: title,
        icon: 'success',
        duration: duration || 2000
      })
    })
  }
  const wxShowToastNone = (title, duration) => {
    state.sleep(50).then(() => {
      uni.showToast({
        title: title,
        icon: 'none',
        duration: duration || 2000
      })
    })
  }
  const getWxLoginCode = () => {
    return new Promise((resolve) => {
      uni.login({
        success: (res) => {
          console.log(res)
          resolve(res.code)
        },
        error: (err) => {
          state.wxShowToastNone('获取code失败')
        }
      })
    })
  }
  //获取用户的openId
  const getWxLoginOpenId = () => {
    return new Promise((resolve) => {
      if (uni.getStorageSync('USER_OPEN_ID')) {
        return uni.getStorageSync('USER_OPEN_ID')
      } else {
        uni.login({
          success: (res) => {
            //发动请求获取openId
            state
              .$uniRequest({
                url: '/applet-mini/mini/openId',
                method: 'get',
                isSBLoading: true,
                data: {
                  code: res.code
                },
                isHALoading: true,
                isParams: true
              })
              .then((res) => {
                //将openId存储到本地
                uni.setStorageSync('USER_OPEN_ID', res.data)
                resolve(res.data)
              })
          },
          error: (err) => {
            state.wxShowToastNone('获取code失败')
          }
        })
      }
    })
  }
  const sleep = (time) => {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        resolve(null)
      }, time)
    })
  }

  return {
    touchMoveStop,
    closeCenterModal,
    closeButtonModal,
    dillParams,
    toNavigatePage,
    toNavigateBack,
    toRedirectToPage,
    toSwitchPage,
    hideLoading,
    showLoading,
    wxShowToastSuccess,
    wxShowToastNone,
    getWxLoginCode,
    getWxLoginOpenId,
    sleep,
    ...toRefs(state)
  }
}

export const useCommon = useCommonExample

export default useCommonExample
