import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import createPosts from '@/pages/createPosts'
import signUp from '@/pages/signUp'
import signIn from '@/pages/signIn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/createPosts',
      name: 'createPosts',
      component: createPosts
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: signIn
    },
    {
      path: '/editPosts/:id',
      name: 'editPosts',
      component: createPosts
    }
  ]
})
