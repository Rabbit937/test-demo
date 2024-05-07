// 素材路由
const materialRoute = {
  path: 'material',
  name: 'Material',
  redirect: '/material/material',
  children: [
    // 概览
    // {
    //   path: 'generalview',
    //   name: 'Generalview',
    //   component: () => import('@/views/material/generalview/index.vue'),
    //   meta: {
    //     title: 'material',
    //     name: '概览',
    //     activeMenu: '/material',
    //     index: '/material/generalview'
    //   }
    // },
    // 本地素材
    {
      path: 'material',
      name: 'Material',
      component: () => import('@/views/material/material/index.vue'),
      meta: {
        title: 'material',
        name: '本地素材',
        activeMenu: '/material',

        index: '/material/material'
      }
    }
    // 巨量素材
    // {
    //   path: 'mediamaterial',
    //   name: 'Mediamaterial',
    //   component: () => import('@/views/material/mediamaterial.vue'),
    //   meta: {
    //     title: 'material',
    //     name: '巨量素材',
    //     activeMenu: '/material',

    //     index: '/material/mediamaterial'
    //   }
    // },
    // 热门素材
    // {
    //   path: 'dataEye',
    //   name: 'DataEye',
    //   component: () => import('@/views/material/dataEye.vue'),
    //   meta: {
    //     title: 'material',
    //     name: '热门素材',
    //     activeMenu: '/material',

    //     index: '/material/dataEye'
    //   }
    // },
    // 收藏夹
    // {
    //   path: 'collect',
    //   name: 'Collect',
    //   component: () => import('@/views/material/collect.vue'),
    //   meta: {
    //     title: 'material',
    //     name: '收藏夹',
    //     activeMenu: '/material',

    //     index: '/material/collect'
    //   }
    // },

    // 素材审核
    // {
    //   path: 'materialcheck',
    //   name: 'Materialcheck',
    //   component: () => import('@/views/material/materialcheck.vue'),
    //   meta: {
    //     title: 'material',
    //     name: '素材审核',
    //     activeMenu: '/material',

    //     index: '/material/materialcheck'
    //   }
    // }
  ]
}

export default materialRoute
