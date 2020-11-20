import router from "./index";
import { getReToken, getToken } from "@/utils/auth"
import NProgress from "nprogress/nprogress";
import store from "@/store";

const whiteList = ['Login', 'Register', 'NotFound', 'Forbidden']

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

  if (tokenFlag) {
    if (isWhite(to.name)) {
      if (to.name == 'Login' || to.name == 'Register') {
        next({ name: 'Home' });
      } else {
        next()
      }
      NProgress.done();
    } else {
      if (navRoutes.length == 0) {
        await dispatch("user/generateRouters")
        next({ ...to, replace: true })
        NProgress.done();
      } else {
        next();
        NProgress.done();
      }
    }
  } else {
    if (isWhite(to.name)) {
      next();
      NProgress.done();
    } else {
      next({
        name: 'Login',
        query: {
          redirect: to.fullPath
        }
      });
      NProgress.done();
    }
  }
})

router.afterEach((to) => {
  if (!isWhite(to.name)) {
    store.commit("app/ADD_TAG", to)
  }
})

