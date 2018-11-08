import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import prueba from '@/components/pruebapdf'
import login from '@/components/login'


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
      name: 'prueba',
      component: prueba
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
