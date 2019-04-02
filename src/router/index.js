import Vue from 'vue'
import Router from 'vue-router'
import cdialog from '@/views/cdialog.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dialog',
      component: cdialog
    }
  ]
})
