import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import Error from '@/pages/404'
import createPosts from '@/pages/createPosts'
import signUp from '@/pages/signUp'
import signIn from '@/pages/signIn'
import store from '@/store'
import localStorage from '@/plugins/localStorage'

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
    },
    {
      path: '/detail',
      name: 'detail',
      component: home
    },
    {
      path: '*',
      name: '404',
      component: Error
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 如果localStorage没有_id则表示未登录，强制跳转到登录页(如果进入的是主页，则不需要登录,detail代表文章详情页,任何人可以查看)
  if (!localStorage.get('_id')) {
    if (to.path !== '/signUp' && to.path !== '/signIn' && to.path !== '/' && to.path !== '/detail') {
      next('/signIn')
    } else {
      next()
    }
  } else {
    store.commit('checkLogin', true)
    if (to.path === '/signIn') {
      next('/')
    } else {
      next()
    }
  }
})

export default router
