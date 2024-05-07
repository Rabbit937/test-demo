// 推广路由
const promotionRoute = {
  path: 'promotion',
  name: 'promotion',
  redirect: '/promotion/ad/toutiaoupgrade/media',
  meta: {
    title: 'promotion'
  },
  children: [
    // 广告管理
    {
      path: 'ad',
      meta: {
        title: 'promotion',
        name: '广告管理'
      },
      children: [
        {
          path: 'toutiaoupgrade',
          meta: {
            title: 'promotion',
            name: '今日头条'
          },
          children: [
            {
              path: 'media',
              component: () => import('@/views/promotion/ad/toutiaoupgrade/media.vue'),
              meta: {
                title: 'promotion',
                name: '账户',
                index: '/promotion/ad/toutiaoupgrade/media'
              }
            },
            // {
            //   path: 'project',
            //   component: () => import('@/views/promotion/ad/toutiaoupgrade/project.vue'),
            //   meta: {
            //     title: 'promotion',
            //     name: '项目',
            //     index: '/promotion/ad/toutiaoupgrade/project'
            //   }
            // },
            // {
            //   path: 'ad',
            //   component: () => import('@/views/promotion/ad/toutiaoupgrade/ad.vue'),
            //   meta: {
            //     title: 'promotion',
            //     name: '广告',
            //     index: '/promotion/ad/toutiaoupgrade/ad'
            //   }
            // }
          ]
        },

        // {
        //   path: 'tencent/gdt-upgrade',
        //   meta: {
        //     title: 'promotion',
        //     name: '广点通3.0',
        //     index: '/promotion/ad/tencent/gdt-upgrade'
        //   },
        //   component: () => import('@/views/promotion/ad/tencent/gdt-upgrade.vue')
        // },

        // {
        //   path: 'tencent',
        //   meta: {
        //     title: 'promotion',
        //     name: '广点通'
        //   },
        //   children: [
        //     {
        //       path: 'media',
        //       component: () => import('@/views/promotion/ad/tencent/media.vue'),
        //       meta: {
        //         title: 'promotion',
        //         name: '媒体账户',
        //         index: '/promotion/ad/tencent/media'
        //       }
        //     },

        //     {
        //       path: 'campaign',
        //       component: () => import('@/views/promotion/ad/tencent/campaign.vue'),
        //       meta: {
        //         title: 'promotion',
        //         name: '推广计划',
        //         index: '/promotion/ad/tencent/campaign'
        //       }
        //     },

        //     {
        //       path: 'ad',
        //       component: () => import('@/views/promotion/ad/tencent/ad.vue'),
        //       meta: {
        //         title: 'promotion',
        //         name: '广告',
        //         index: '/promotion/ad/tencent/ad'
        //       }
        //     }
        //   ]
        // },

        // {
        //   path: 'kuaishou',
        //   meta: {
        //     title: 'promotion',
        //     name: '快手'
        //   },
        //   children: [
        //     {
        //       path: 'media',
        //       component: () => import('@/views/promotion/ad/kuaishou/media.vue'),
        //       meta: {
        //         title: 'promotion',
        //         name: '媒体账户',
        //         index: '/promotion/ad/kuaishou/media'
        //       }
        //     },

        //     {
        //       path: 'campaign',
        //       component: () => import('@/views/promotion/ad/kuaishou/campaign.vue'),
        //       meta: {
        //         title: 'promotion',
        //         name: '推广计划',
        //         index: '/promotion/ad/kuaishou/campaign'
        //       }
        //     },

        //     {
        //       path: 'ad',
        //       component: () => import('@/views/promotion/ad/kuaishou/ad.vue'),
        //       meta: {
        //         title: 'promotion',
        //         name: '广告',
        //         index: '/promotion/ad/kuaishou/ad'
        //       }
        //     }
        //   ]
        // },
        // {
        //   path: 'baidu',
        //   meta: {
        //     title: 'promotion',
        //     name: '百度信息流'
        //   },
        //   children: [
        //     {
        //       path: 'media',
        //       component: () => import('@/views/promotion/ad/baidu/media.vue'),
        //       meta: {
        //         title: 'promotion',
        //         name: '媒体账户',
        //         index: '/promotion/ad/baidu/media'
        //       }
        //     },

        //     {
        //       path: 'campaign',
        //       component: () => import('@/views/promotion/ad/baidu/campaign.vue'),
        //       meta: {
        //         title: 'promotion',
        //         name: '推广计划',
        //         index: '/promotion/ad/baidu/campaign'
        //       }
        //     },

        //     {
        //       path: 'ad',
        //       component: () => import('@/views/promotion/ad/baidu/ad.vue'),
        //       meta: {
        //         title: 'promotion',
        //         name: '推广单元',
        //         index: '/promotion/ad/baidu/ad'
        //       }
        //     }
        //   ]
        // }
      ]
    },

    // 账户管理
    // {
    //   path: 'media',
    //   meta: {
    //     title: 'promotion',
    //     name: '账户管理'
    //   },
    //   children: [
    //     {
    //       path: 'toutiao',
    //       component: () => import('@/views/promotion/media/toutiao.vue'),
    //       meta: {
    //         title: 'promotion',
    //         name: '今日头条',
    //         index: '/promotion/media/toutiao'
    //       }
    //     },
    //     {
    //       path: 'tencent',
    //       component: () => import('@/views/promotion/media/tencent.vue'),
    //       meta: {
    //         title: 'promotion',
    //         name: '广点通',
    //         index: '/promotion/media/tencent'
    //       }
    //     },
    //     {
    //       path: 'kuaishou',
    //       component: () => import('@/views/promotion/media/kuaishou.vue'),
    //       meta: {
    //         title: 'promotion',
    //         name: '快手',
    //         index: '/promotion/media/kuaishou'
    //       }
    //     },
    //     {
    //       path: 'baidu',
    //       component: () => import('@/views/promotion/media/baidu.vue'),
    //       meta: {
    //         title: 'promotion',
    //         name: '百度',
    //         index: '/promotion/media/baidu'
    //       }
    //     }
    //   ]
    // }
  ]
}

export default promotionRoute
