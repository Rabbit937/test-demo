// 首页路由
const homeRoute = {
  // 首页
  path: 'home',
  component: () => import('@/views/home/index.vue'),
  name: 'Home',
  meta: {
    title: 'home'
  },
  children: []
}

export default homeRoute
