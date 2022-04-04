import { createApp } from 'vue'
const app = createApp(App)
import App from './App.vue'

//svg icon
// #ifdef H5
import 'virtual:svg-icons-register'
import svgIcon from '@/icons/SvgIcon.vue'
app.component('SvgIcon', svgIcon)
// #endif

//globalMixin
// import globalMixin from '@/mixin/globalMixin.js'
// app.mixin(globalMixin)

//momentMini
// import momentMini from 'moment-mini'
// app.config.globalProperties.$momentMini = momentMini

//uView support vue3 Not yet
// import uView from 'uview-ui'
// app.use(uView)

//import vuex5
import { createPinia } from 'pinia'
app.use(createPinia())

app.mount('#app')
