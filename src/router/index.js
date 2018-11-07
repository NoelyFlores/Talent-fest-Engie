import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import prueba from '@/components/pruebapdf'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/prueba',
      name:'prueba',
      component: prueba
    }
  ]
})
