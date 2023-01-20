export default {
  admin: [
    {
      path: '/home/dashboard',
      name: 'Dashboard',
      children: [
        {
          path: '/home/dashboard/homepage',
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
        },
        {
          path: '/home/experiment/appointmentlist',
          name: '预约列表'
        },
        {
          path: '/home/experiment/experiencelist',
          name: '实验列表'
        }
      ]
    },
    {
      path: '/home/message',
      name: '信息管理',
      children: [
        {
          path: '/home/message/noticelist',
          name: '公告列表'
        }
      ]
    },
    {
      path: '/home/homework',
      name: '作业管理',
      children: [
        {
          path: '/home/homework/homeworklist',
          name: '作业列表'
        },
        {
          path: '/home/homework/createhomework',
          name: '发布作业'
        },
        {
          path: '/home/homework/checkhomework',
          name: '批改作业'
        }
      ]
    }
  ],
  teacher: [
    {
      path: '/home/dashboard',
      name: 'Dashboard',
      children: [
        {
          path: '/home/dashboard/homepage',
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
        },
        {
          path: '/home/experiment/appointmentlist',
          name: '预约列表'
        },
        {
          path: '/home/experiment/experiencelist',
          name: '实验列表'
        }
      ]
    },
    {
      path: '/home/message',
      name: '信息管理',
      children: [
        {
          path: '/home/message/noticelist',
          name: '公告列表'
        }
      ]
    },
    {
      path: '/home/homework',
      name: '作业管理',
      children: [
        {
          path: '/home/homework/homeworklist',
          name: '作业列表'
        },
        {
          path: '/home/homework/createhomework',
          name: '发布作业'
        },
        {
          path: '/home/homework/checkhomework',
          name: '批改作业'
        }
      ]
    }
  ],
  student: [
    {
      path: '/home/dashboard',
      name: 'Dashboard',
      children: [
        {
          path: '/home/dashboard/homepage',
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
        },
        {
          path: '/home/experiment/appointmentlist',
          name: '预约列表'
        },
        {
          path: '/home/experiment/experiencelist',
          name: '实验列表'
        }
      ]
    },
    {
      path: '/home/message',
      name: '信息管理',
      children: [
        {
          path: '/home/message/noticelist',
          name: '公告列表'
        }
      ]
    },
    {
      path: '/home/homework',
      name: '作业管理',
      children: [
        {
          path: '/home/homework/homeworklist',
          name: '作业列表'
        }
      ]
    }
  ]
}
