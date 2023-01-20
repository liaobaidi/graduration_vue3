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
      redirect: '/home/dashboard',
      component: () => import('/@/views/Home/index.vue'),
      meta: {
        name: '/首页'
      },
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          redirect: '/home/dashboard/homepage',
          meta: {
            name: '/首页'
          },
          children: [
            {
              path: 'homepage',
              name: 'homepage',
              meta: {
                name: '/首页/数据面板'
              },
              component: () => import('/@/views/dashboard/homepage/HomePage.vue')
            }
          ]
        },
        {
          name: '404',
          path: '404',
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
        },
        {
          path: 'appointmentlist',
          name: 'appointmentlist',
          meta: {
            name: '/实验管理/预约列表'
          },
          component: () => import('/@/views/experiment/appointmentlist/AppointmentList.vue')
        },
        {
          path: 'experiencelist',
          name: 'experiencelist',
          meta: {
            name: '/实验管理/实验列表'
          },
          component: () => import('/@/views/experiment/experiencelist/ExperienceList.vue')
        }
      ]
    },
    {
      path: 'message',
      name: 'message',
      meta: {
        name: '/信息管理'
      },
      children: [
        {
          path: 'noticelist',
          name: 'noticelist',
          meta: {
            name: '/信息管理/公告列表'
          },
          component: () => import('/@/views/message/noticelist/NoticeList.vue')
        },
        {
          path: 'createnotice',
          name: 'createnotice',
          meta: {
            name: '/信息管理/创建公告'
          },
          component: () => import('/@/views/message/createnotice/CreateNotice.vue')
        },
        {
          path: 'noticeinfo',
          name: 'noticeinfo',
          meta: {
            name: '/信息管理/公告详情'
          },
          component: () => import('/@/views/message/noticeinfo/NoticeInfo.vue')
        }
      ]
    },
    {
      path: 'homework',
      name: 'homework',
      meta: {
        name: '/作业管理'
      },
      children: [
        {
          path: 'homeworklist',
          name: 'homeworklist',
          meta: {
            name: '/作业管理/作业列表'
          },
          component: () => import('/@/views/homework/homeworklist/HomeworkList.vue')
        },
        {
          path: 'createhomework',
          name: 'createhomework',
          meta: {
            name: '/作业管理/发布作业'
          },
          component: () => import('/@/views/homework/createhomework/CreateHomework.vue')
        },
        {
          path: 'checkhomework',
          name: 'checkhomework',
          meta: {
            name: '/作业管理/批改作业'
          },
          component: () => import('/@/views/homework/checkhomework/CheckHomework.vue')
        },
        {
          path: 'homeworkinfo',
          name: 'homeworkinfo',
          meta: {
            name: '/作业管理/作业详情（批改）'
          },
          component: () => import('/@/views/homework/homeworkinfo/HomeworkInfo.vue')
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
        },
        {
          path: 'appointmentlist',
          name: 'appointmentlist',
          meta: {
            name: '/实验管理/预约列表'
          },
          component: () => import('/@/views/experiment/appointmentlist/AppointmentList.vue')
        },
        {
          path: 'experiencelist',
          name: 'experiencelist',
          meta: {
            name: '/实验管理/实验列表'
          },
          component: () => import('/@/views/experiment/experiencelist/ExperienceList.vue')
        }
      ]
    },
    {
      path: 'message',
      name: 'message',
      meta: {
        name: '/信息管理'
      },
      children: [
        {
          path: 'noticelist',
          name: 'noticelist',
          meta: {
            name: '/信息管理/公告列表'
          },
          component: () => import('/@/views/message/noticelist/NoticeList.vue')
        },
        {
          path: 'createnotice',
          name: 'createnotice',
          meta: {
            name: '/信息管理/创建公告'
          },
          component: () => import('/@/views/message/createnotice/CreateNotice.vue')
        },
        {
          path: 'noticeinfo',
          name: 'noticeinfo',
          meta: {
            name: '/信息管理/公告详情'
          },
          component: () => import('/@/views/message/noticeinfo/NoticeInfo.vue')
        }
      ]
    },
    {
      path: 'homework',
      name: 'homework',
      meta: {
        name: '/作业管理'
      },
      children: [
        {
          path: 'homeworklist',
          name: 'homeworklist',
          meta: {
            name: '/作业管理/作业列表'
          },
          component: () => import('/@/views/homework/homeworklist/HomeworkList.vue')
        },
        {
          path: 'createhomework',
          name: 'createhomework',
          meta: {
            name: '/作业管理/发布作业'
          },
          component: () => import('/@/views/homework/createhomework/CreateHomework.vue')
        },
        {
          path: 'checkhomework',
          name: 'checkhomework',
          meta: {
            name: '/作业管理/批改作业'
          },
          component: () => import('/@/views/homework/checkhomework/CheckHomework.vue')
        },
        {
          path: 'homeworkinfo',
          name: 'homeworkinfo',
          meta: {
            name: '/作业管理/作业详情（批改）'
          },
          component: () => import('/@/views/homework/homeworkinfo/HomeworkInfo.vue')
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
        },
        {
          path: 'appointmentlist',
          name: 'appointmentlist',
          meta: {
            name: '/实验管理/预约列表'
          },
          component: () => import('/@/views/experiment/appointmentlist/AppointmentList.vue')
        },
        {
          path: 'experiencelist',
          name: 'experiencelist',
          meta: {
            name: '/实验管理/实验列表'
          },
          component: () => import('/@/views/experiment/experiencelist/ExperienceList.vue')
        }
      ]
    },
    {
      path: 'message',
      name: 'message',
      meta: {
        name: '/信息管理'
      },
      children: [
        {
          path: 'noticelist',
          name: 'noticelist',
          meta: {
            name: '/信息管理/公告列表'
          },
          component: () => import('/@/views/message/noticelist/NoticeList.vue')
        },
        {
          path: 'noticeinfo',
          name: 'noticeinfo',
          meta: {
            name: '/信息管理/公告详情'
          },
          component: () => import('/@/views/message/noticeinfo/NoticeInfo.vue')
        }
      ]
    },
    {
      path: 'homework',
      name: 'homework',
      meta: {
        name: '/作业管理'
      },
      children: [
        {
          path: 'homeworklist',
          name: 'homeworklist',
          meta: {
            name: '/作业管理/作业列表'
          },
          component: () => import('/@/views/homework/homeworklist/HomeworkList.vue')
        },
        {
          path: 'commithomework',
          name: 'commithomework',
          meta: {
            name: '/作业管理/提交作业'
          },
          component: () => import('/@/views/homework/commithomework/CommitHomework.vue')
        },
        {
          path: 'homeworkinfo',
          name: 'homeworkinfo',
          meta: {
            name: '/作业管理/作业详情（批改）'
          },
          component: () => import('/@/views/homework/homeworkinfo/HomeworkInfo.vue')
        }
      ]
    }
  ]
}
