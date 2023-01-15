export default {
  admin: [
    {
      path: '/home',
      name: 'Dashboard',
      children: [
        {
          path: '/home/test',
          name: '首页'
        }
      ]
    },
    {
      path: '/home/usermanage',
      name: '用户管理',
      children: [
        {
          path: '/home/usermanage/userlist',
          name: '用户列表'
        }
      ]
    },
    {
      path: '/home/experiment',
      name: '实验管理',
      children: [
        {
          path: '/home/experiment/experimentlist',
          name: '实验室列表'
        }
      ]
    }
  ],
  teacher: [
    {
      path: '/home',
      name: 'Dashboard',
      children: [
        {
          path: '/home/test',
          name: '首页'
        }
      ]
    },
    {
      path: '/home/experiment',
      name: '实验管理',
      children: [
        {
          path: '/home/experiment/experimentlist',
          name: '实验室列表'
        }
      ]
    }
  ],
  student: [
    {
      path: '/home',
      name: 'Dashboard',
      children: [
        {
          path: '/home/test',
          name: '首页'
        }
      ]
    },
    {
      path: '/home/experiment',
      name: '实验管理',
      children: [
        {
          path: '/home/experiment/experimentlist',
          name: '实验室列表'
        }
      ]
    }
  ]
}
