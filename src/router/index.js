import Router from 'vue-router'
import Home from '@/components/pages/home/Home'
import HomeIndex from '@/components/pages/home/Index'
import HomeDestination from '@/components/pages/home/Destination'
import HomeRouteList from '@/components/pages/home/RouteList'
import HomeRouteDetail from '@/components/pages/home/RouteDetail'
import HomeUser from '@/components/pages/home/User'
import HomeOrderList from '@/components/pages/home/OrderList'

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
        },
        {
          path: 'dest/{name}',
          name: 'HomeDestination',
          component: HomeDestination
        },
        {
          path: 'route/{dest_id}',
          name: 'HomeRouteList',
          component: HomeRouteList
        },
        {
          path: 'route/{dest_id}/{route_id}',
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
    }
  ]
})
