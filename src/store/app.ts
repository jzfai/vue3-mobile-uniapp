import defaultSettings from '@/settings'
import { defineStore } from 'pinia'
export const useAppStore = defineStore('app', {
  state: () => {
    return {
      settings: defaultSettings,
      cachedViews: [] as Array<string>,
      test: false
    }
  },
  actions: {
    M_vuex_test(data) {
      this.$patch((state) => {
        state.test = data
      })
    },
    /*keepAlive relative*/
    M_ADD_CACHED_VIEW(view) {
      this.$patch((state) => {
        if (state.cachedViews.includes(view)) return
        state.cachedViews.push(view)
      })
    },
    M_DEL_CACHED_VIEW(view) {
      this.$patch((state) => {
        const index = state.cachedViews.indexOf(view)
        index > -1 && state.cachedViews.splice(index, 1)
      })
    },
    M_RESET_CACHED_VIEW() {
      this.$patch((state) => {
        state.cachedViews = []
      })
    },
    A_vuex_test(data) {
      this.$patch(() => {
        this.M_vuex_test(data)
      })
    }
  }
})
