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

/**
 * @description 动态生成css 插入head
 */
export const addCSS = (cssText, id) => {
  const style = document.createElement('style');  //创建一个style元素
  style.id = id;
  const head = document.head || document.getElementsByTagName('head')[0]; //获取head元素

  style.type = 'text/css'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
  return new Promise((resolve, reject) => {
    if (style.styleSheet) { //IE
      try { //防止IE中stylesheet数量超过限制而发生错误
        style.styleSheet.cssText = cssText;
        head.appendChild(style); //把创建的style元素插入到head中    
        resolve();
      } catch (e) {
        reject(e)
      }
    } else { //w3c
      //w3c浏览器中只要创建文本节点插入到style元素中就行了
      var textNode = document.createTextNode(cssText);
      style.appendChild(textNode);
      head.appendChild(style); //把创建的style元素插入到head中    
      resolve();
    }

  })
}

/**
 * @description js通过id 删除 style 标签
 */
export const delCSS = (id) => {
  if (document.getElementById(id)) {
    document.getElementsByTagName('head').item(0).removeChild(document.getElementById(id))
  }
}


/**
 * @description 判断设备是否为pc
 */
export const IsPC = () => {  
  var userAgentInfo = navigator.userAgent;
  var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
  var flag = true;  
  for (var v = 0; v < Agents.length; v++) {  
      if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
  }  
  return flag;  
}