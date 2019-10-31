import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Disclaimer from './views/disclaimer.vue'
import Form from './views/form.vue'
import Search from './views/search.vue'
import Admin from './views/admin.vue'
import Demo from './views/demo.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'index', component: Index },
    { path: '/disclaimer', name: 'disclaimer', component: Disclaimer },
    { path: '/search', name: 'search', component: Search },
    { path: '/form', name: 'form', component: Form },
    { path: '/admin', name: 'admin', component: Admin },
    { path: '/demo', name: 'demo', component: Demo }
  ]
})
