export const routers = [
  {
    title: '网站',
    name: 'Website',
    icon: 'el-icon-grape',
    path: '/WebSite',
  }, {
    title: '文章',
    name: 'Article',
    icon: 'el-icon-chat',
    path: '/Article',
    redirect: '/Article/Manager',
    children: [
      {
        title: '总览',
        name: 'ArticleManager',
        icon: 'el-icon-chat',
        path: '/Article/Manager',
      }, {
        title: '详情',
        name: 'ArticleDetail',
        icon: 'el-icon-chat',
        path: '/Article/Detail',
        hide: true
      }, {
        title: '写文',
        name: 'ArticleNew',
        icon: 'el-icon-sugar',
        path: '/Article/New',
        hide: true
      }
    ]
  }, {
    title: '系统管理',
    name: 'System',
    icon: 'el-icon-ship',
    path: '/System',
    redirect: '/System/User',
    children: [
      {
        title: '用户',
        name: 'SystemUser',
        icon: 'el-icon-user',
        path: '/System/User',
      }, {
        title: '菜单',
        name: 'SystemMenu',
        icon: 'el-icon-menu',
        path: '/System/Menu',
      }
    ]
  }
]