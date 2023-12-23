import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'//导入axios
import './plugin/antui'//导入antui.js中的antui
import './assets/style.css'
import 'ant-design-vue/dist/antd.css';//导入antdesign库

axios.defaults.baseURL="http://localhost:8888/api/v1"//地址,配置默认基础URL,后期改为后端的路由

// axios.interceptors.request.use(config => {//它在请求发送之前，为请求的头部添加了一个名为 "Authorization" 的字段，给后端传递token，后端暂未实现
//   config.headers.Authorization=`Bearer ${window.sessionStorage.getItem('token')}`
//   return config
// })


Vue.prototype.$http=axios//并将 Axios 实例挂载到 Vue 的原型上，使得在 Vue 组件中可以通过this.$http来发起 HTTP 请求。

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
