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
        },
        {
          path: 'courselist',
          name: 'courselist',
          meta: {
            name: '/实验管理/课程列表',
          },
          component: () => import('/@/views/experiment/courselist/CourseList.vue')
        },
        {
          path: 'signin',
          name: 'signin',
          meta: {
            name: '/实验管理/上课签到',
          },
          component: () => import('/@/views/experiment/signin/SignIn.vue')
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
        },
        {
          path: 'signincount',
          name: 'signincount',
          meta: {
            name: '/信息管理/考勤统计'
          },
          component: () => import('/@/views/message/signincount/SigninCount.vue')
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
        },
        {
          path: 'homeworkcount',
          name: 'homeworkcount',
          meta: {
            name: '/作业管理/作业统计'
          },
          component: () => import('/@/views/homework/homeworkcount/HomeworkCount.vue')
        }
      ]
    },
    {
      path: 'datamanage',
      name: 'datamanage',
      meta: {
        name: '/资料管理'
      },
      children: [
        {
          path: 'videolist',
          name: 'videolist',
          meta: {
            name: '/资料管理/视频列表'
          },
          component: () => import('/@/views/datamanage/videolist/VideoList.vue')
        },
        {
          path: 'filelist',
          name: 'filelist',
          meta: {
            name: '/资料管理/资料列表'
          },
          component: () => import('/@/views/datamanage/filelist/FileList.vue')
        },
        {
          path: 'createvideo',
          name: 'createvideo',
          meta: {
            name: '/资料管理/创建视频'
          },
          component: () => import('/@/views/datamanage/createvideo/CreateVideo.vue')
        },
        {
          path: 'videoinfo',
          name: 'videoinfo',
          meta: {
            name: '/资料管理/视频详情'
          },
          component: () => import('/@/views/datamanage/videoinfo/VideoInfo.vue')
        },
        {
          path: 'createfile',
          name: 'createfile',
          meta: {
            name: '/资料管理/创建资料'
          },
          component: () => import('/@/views/datamanage/createfile/CreateFile.vue')
        }
      ]
    },
    {
      path: 'comment',
      name: 'comment',
      meta: {
        name: '/评论管理'
      },
      children: [
        {
          path: 'commentlist',
          name: 'commentlist',
          meta: {
            name: '/评论管理/评论列表'
          },
          component: () => import('/@/views/comment/commentlist/CommentList.vue')
        },
        {
          path: 'commentinfo',
          name: 'commentinfo',
          meta: {
            name: '/评论管理/评论详情'
          },
          component: () => import('/@/views/comment/commentinfo/CommentInfo.vue')
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
        },
        {
          path: 'courselist',
          name: 'courselist',
          meta: {
            name: '/实验管理/课程列表',
          },
          component: () => import('/@/views/experiment/courselist/CourseList.vue')
        },
        {
          path: 'signin',
          name: 'signin',
          meta: {
            name: '/实验管理/上课签到',
          },
          component: () => import('/@/views/experiment/signin/SignIn.vue')
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
        },
        {
          path: 'signincount',
          name: 'signincount',
          meta: {
            name: '/信息管理/考勤统计'
          },
          component: () => import('/@/views/message/signincount/SigninCount.vue')
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
        },
        {
          path: 'homeworkcount',
          name: 'homeworkcount',
          meta: {
            name: '/作业管理/作业统计'
          },
          component: () => import('/@/views/homework/homeworkcount/HomeworkCount.vue')
        }
      ]
    },
    {
      path: 'datamanage',
      name: 'datamanage',
      meta: {
        name: '/资料管理'
      },
      children: [
        {
          path: 'videolist',
          name: 'videolist',
          meta: {
            name: '/资料管理/视频列表'
          },
          component: () => import('/@/views/datamanage/videolist/VideoList.vue')
        },
        {
          path: 'filelist',
          name: 'filelist',
          meta: {
            name: '/资料管理/资料列表'
          },
          component: () => import('/@/views/datamanage/filelist/FileList.vue')
        },
        {
          path: 'createvideo',
          name: 'createvideo',
          meta: {
            name: '/资料管理/创建视频'
          },
          component: () => import('/@/views/datamanage/createvideo/CreateVideo.vue')
        },
        {
          path: 'videoinfo',
          name: 'videoinfo',
          meta: {
            name: '/资料管理/视频详情'
          },
          component: () => import('/@/views/datamanage/videoinfo/VideoInfo.vue')
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
        },
        {
          path: 'courselist',
          name: 'courselist',
          meta: {
            name: '/实验管理/课程列表',
          },
          component: () => import('/@/views/experiment/courselist/CourseList.vue')
        },
        {
          path: 'signin',
          name: 'signin',
          meta: {
            name: '/实验管理/上课签到',
          },
          component: () => import('/@/views/experiment/signin/SignIn.vue')
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
    },
    {
      path: 'datamanage',
      name: 'datamanage',
      meta: {
        name: '/资料管理'
      },
      children: [
        {
          path: 'videolist',
          name: 'videolist',
          meta: {
            name: '/资料管理/视频列表'
          },
          component: () => import('/@/views/datamanage/videolist/VideoList.vue')
        },
        {
          path: 'filelist',
          name: 'filelist',
          meta: {
            name: '/资料管理/资料列表'
          },
          component: () => import('/@/views/datamanage/filelist/FileList.vue')
        },
        {
          path: 'videoinfo',
          name: 'videoinfo',
          meta: {
            name: '/资料管理/视频详情'
          },
          component: () => import('/@/views/datamanage/videoinfo/VideoInfo.vue')
        }
      ]
    }
  ]
}
