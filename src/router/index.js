import Router from 'vue-router'
import Core from '@/core/core'
import Home from '@/pages/home/Home'
import HomeIndex from '@/pages/home/Index'
import HomeDestination from '@/pages/home/Destination'
import HomeRouteList from '@/pages/home/RouteList'
import HomeRouteDetail from '@/pages/home/RouteDetail'
import HomeUser from '@/pages/home/User'
import HomeOrderList from '@/pages/home/OrderList'
import AdminLogin from '@/pages/admin/Login'
import Admin from '@/pages/admin/Admin'

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/index'
    },
    {
      path: '/home',
      name: 'Home',
      redirect: '/home/index',
      component: Home,
      children: [
        {
          path: 'index',
          name: 'HomeIndex',
          component: HomeIndex
        },
        {
          path: 'dest',
          name: 'HomeDestination',
          component: HomeDestination
        },
        {
          path: 'route/:destId',
          name: 'HomeRouteList',
          component: HomeRouteList
        },
        {
          path: 'route/:destId/:routeId',
          name: 'HomeRouteDetail',
          component: HomeRouteDetail
        },
        {
          path: 'user',
          name: 'HomeUser',
          component: HomeUser
        },
        {
          path: 'order',
          name: 'HomeOrderList',
          component: HomeOrderList
        }
      ]
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/admin') && !(to.path.startsWith('/admin/login'))) {
    if (!Core.Data.getAdmin()) {
      next('/admin/login')
    }
  }
  next()
})
export default router
