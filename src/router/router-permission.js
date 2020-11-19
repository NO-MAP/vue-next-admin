import router from "./index";
import { getReToken, getToken } from "@/utils/auth"
import NProgress from "nprogress/nprogress";
import store from "@/store";

const whiteList = ['Login', 'Register', '401', '404']

/**
 * @description 判断是否是白名单路由
 * @param {route name} name 
 */
const isWhite = (name) => whiteList.indexOf(name) != -1

router.beforeEach(async (to, from, next) => {
  const token = getToken();
  const reToken = getReToken();
  const tokenFlag = !!(token && reToken)
  NProgress.start();

  // 动态加载路由
  const { dispatch, getters } = store;
  const navRoutes = getters["user/navRoutes"];
  if (tokenFlag && !isWhite(to.name) && navRoutes.length == 0) {
    await dispatch("user/generateRouters")
    next({ ...to, replace: true })
  }



  if (!tokenFlag && !isWhite(to.name)) {
    next({
      name: 'Login',
      query: {
        redirect: to.fullPath
      }
    });
    NProgress.done();
  } else if (!tokenFlag && isWhite(to.name)) {
    next();
    NProgress.done();
  } else if (tokenFlag && isWhite(to.name)) {
    next({ name: 'Home' });
    NProgress.done();
  } else {
    next();
    NProgress.done();
  }
})

router.afterEach((to) => {
  if(!isWhite(to.name)) {
    store.commit("app/ADD_TAG", to)
  }
})

