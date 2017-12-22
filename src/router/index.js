import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import createPosts from '@/pages/createPosts'
import signUp from '@/pages/signUp'
import signIn from '@/pages/signIn'

Vue.use(Router)

const router = new Router({
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
router.beforeEach((to, from, next) => {
  // 如果localStorage没有_id则表示未登录，强制跳转到登录页
  if (!localStorage.getItem('_id')) {
    if (to.path !== '/signUp' && to.path !== '/signIn') {
      next('/signIn')
    } else {
      next()
    }
  } else {
    if (to.path === '/signIn') {
      next('/')
    } else {
      next()
    }
  }
})

export default router
