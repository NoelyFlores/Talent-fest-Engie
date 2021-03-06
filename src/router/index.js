import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import prueba from '@/components/pruebapdf'
import dfamily from '@/components/familyData'
import login from '@/components/login'
import dpersonal from '@/components/personalData'
import bankdata from '@/components/bankdata'
import profData from '@/components/professionalData'
import formEditFamily from '@/components/form-edit-family'
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
      path: '/dfamily',
      name:'dfamily',
      component: dfamily
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/dpersonal',
      name: 'dpersonal',
      component: dpersonal
    },
    {
      path:'/bankdata',
      name:'bankdata',
      component: bankdata
    },
    {
      path:'/profData',
      name:'profData',
      component: profData
    },
    {
      path:'/formEditFamily',
      name:'formEditFamily',
      component: formEditFamily
    }
  ]
})
