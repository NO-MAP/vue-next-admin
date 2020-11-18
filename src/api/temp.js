export const routers = [
  {
    name: '网站',
    icon: 'el-icon-grape',
    path: '/WebSite',
  }, {
    name: '文章',
    icon: 'el-icon-chat',
    path: '/Article',
    redirect: '/Article/Manager',
    children: [
      {
        name: '总览',
        icon: 'el-icon-chat',
        path: '/Article/Manager',
      }, {
        name: '详情',
        icon: 'el-icon-chat',
        path: '/Article/Detail',
        hide: true
      }, {
        name: '写文',
        icon: 'el-icon-sugar',
        path: '/Article/New',
        hide: true
      }
    ]
  }, {
    name: '系统管理',
    icon: 'el-icon-ship',
    path: '/System',
    redirect: '/System/User',
    children: [
      {
        name: '用户',
        icon: 'el-icon-user',
        path: '/System/User',
      }, {
        name: '菜单',
        icon: 'el-icon-menu',
        path: '/System/Menu',
      }
    ]
  }
]