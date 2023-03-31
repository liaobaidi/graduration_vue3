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
        },
        {
          path: '/home/experiment/courselist',
          name: '课程列表'
        },
        {
          path: '/home/experiment/signin',
          name: '上课签到'
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
        },
        {
          path: '/home/message/signincount',
          name: '考勤统计'
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
    },
    {
      path: '/home/datamanage',
      name: '资料管理',
      children: [
        {
          path: '/home/datamanage/videolist',
          name: '视频列表'
        },
        {
          path: '/home/datamanage/filelist',
          name: '资料列表'
        },
        {
          path: '/home/datamanage/createvideo',
          name: '创建视频'
        },
        {
          path: '/home/datamanage/createfile',
          name: '创建资料'
        }
      ]
    },
    {
      path: '/home/comment',
      name: '评论管理',
      children: [
        {
          path: '/home/comment/commentlist',
          name: '评论列表'
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
        },
        {
          path: '/home/experiment/courselist',
          name: '课程列表'
        },
        {
          path: '/home/experiment/signin',
          name: '上课签到'
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
    },
    {
      path: '/home/datamanage',
      name: '资料管理',
      children: [
        {
          path: '/home/datamanage/videolist',
          name: '视频列表'
        },
        {
          path: '/home/datamanage/filelist',
          name: '资料列表'
        },
        {
          path: '/home/datamanage/createvideo',
          name: '创建视频'
        },
        {
          path: '/home/datamanage/createfile',
          name: '创建资料'
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
        },
        {
          path: '/home/experiment/courselist',
          name: '课程列表'
        },
        {
          path: '/home/experiment/signin',
          name: '上课签到'
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
    },
    {
      path: '/home/datamanage',
      name: '资料管理',
      children: [
        {
          path: '/home/datamanage/videolist',
          name: '视频列表'
        },
        {
          path: '/home/datamanage/filelist',
          name: '资料列表'
        }
      ]
    }
  ]
}
