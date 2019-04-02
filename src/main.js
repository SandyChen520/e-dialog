// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Dialog,
  Input,
  Button,
  Form,
  FormItem
} from 'element-ui'
import customDialog from './components/custom_dialog/custom_dialog-test.vue'
import './components/custom_dialog/directives-test.js'
Vue.component('custom-dialog', customDialog)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
