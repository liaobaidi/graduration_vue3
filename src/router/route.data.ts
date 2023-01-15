import type { RouteRecordRaw } from 'vue-router'

interface ExpandRoute {
  [key: string]: RouteRecordRaw[]
}
export const expandRoutes: ExpandRoute = {
  common: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: 'home',
      path: '/home',
      component: () => import('/@/views/Home/index.vue'),
      meta: {
        name: '/首页'
      },
      children: [
        {
          name: '404',
          path: '/404',
          meta: {
            name: '/页面没有找到'
          },
          component: () => import('/@/views/404/index.vue')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('/@/views/Login/index.vue')
    }
  ],
  admin: [
    {
      path: 'usermanage',
      name: 'usermanage',
      meta: {
        name: '/用户管理'
      },
      children: [
        {
          path: 'userlist',
          name: 'userlist',
          meta: {
            name: '/用户管理/用户列表'
          },
          component: () => import('/@/views/usermanage/UserList/index.vue')
        }
      ]
    },
    {
      path: 'experiment',
      name: 'experiment',
      meta: {
        name: '/实验管理'
      },
      children: [
        {
          path: 'experimentlist',
          name: 'experimentlist',
          meta: {
            name: '/实验管理/实验室列表'
          },
          component: () => import('/@/views/experiment/experimentList/ExperimentList.vue')
        }
      ]
    }
  ],
  teacher: [
    {
      path: 'experiment',
      name: 'experiment',
      meta: {
        name: '/实验管理'
      },
      children: [
        {
          path: 'experimentlist',
          name: 'experimentlist',
          meta: {
            name: '/实验管理/实验室列表'
          },
          component: () => import('/@/views/experiment/experimentList/ExperimentList.vue')
        }
      ]
    }
  ],
  student: [
    {
      path: 'experiment',
      name: 'experiment',
      meta: {
        name: '/实验管理'
      },
      children: [
        {
          path: 'experimentlist',
          name: 'experimentlist',
          meta: {
            name: '/实验管理/实验室列表'
          },
          component: () => import('/@/views/experiment/experimentList/ExperimentList.vue')
        }
      ]
    }
  ]
}
