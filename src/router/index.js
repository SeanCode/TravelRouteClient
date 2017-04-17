import Router from 'vue-router'
import Home from '@/components/pages/home/Home'
import HomeIndex from '@/components/pages/home/Index'

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/index'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'index',
          name: 'HomeIndex',
          component: HomeIndex
        }
      ]
    }
  ]
})
