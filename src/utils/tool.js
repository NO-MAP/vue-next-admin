/**
 * @description 防抖函数
 */
export const _debounce = (func, wait, immediate) => {
  let timer;

  return function () {
    let context = this;
    let args = arguments;

    if (timer) clearTimeout(timer);
    if (immediate) {
      var callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timer = setTimeout(function () {
        func.apply(context, args)
      }, wait);
    }
  }
}

/**
 * @returns {Router}
 * @param {服务端路由数据} routes Array
 */
export const generateRoutersByServiceData = (routes) => {
  let result = [];

  for (let route of routes) {
    const data = {
      path: route.path.toLocaleLowerCase(),
      name: route.name,
      meta: {
        icon: route.icon,
        title: route.title
      },
    }
    if (route.redirect) {
      data.redirect = route.redirect.toLocaleLowerCase();
    }

    if (route.children) {
      data.component = () => import('@/pages/ParentView')
      data.children = generateRoutersByServiceData(route.children)
    } else {
      data.component = () => import('@/views' + route.path)
    }
    result.push(data)
  }
  return result
}