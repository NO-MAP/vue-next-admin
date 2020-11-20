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

router.beforeEach(async (to) => {
  const token = getToken();
  const reToken = getReToken();
  const tokenFlag = !!(token && reToken)
  NProgress.start();

  const { dispatch, getters } = store;
  const navRoutes = getters["user/navRoutes"];

  if (tokenFlag && !isWhite(to.name) && navRoutes.length == 0) {
    await dispatch("user/generateRouters")
    NProgress.done();
    return { ...to }
  }

  NProgress.done();
  if (tokenFlag && isWhite(to.name) && (to.name == 'Login' || to.name == 'Register')) return {
    name: 'Home'
  }

  if (!tokenFlag && !isWhite(to.name)) return {
    name: 'Login',
    query: {
      redirect: to.fullPath
    }
  }

  return true
})

router.afterEach((to) => {
  if (!isWhite(to.name)) {
    const matchedPath = router.resolve(to).matched[0].path;
    if (matchedPath != '/:pathMatch(.*)*') {
      store.commit("app/ADD_TAG", to)
    }
  }
})
