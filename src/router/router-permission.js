import router from "./index";
import { getReToken, getToken } from "@/utils/auth"
import NProgress from "nprogress/nprogress";

router.beforeEach((to, from, next) => {
  const token = getToken();
  const reToken = getReToken();
  const tokenFlag = !!(token && reToken)
  NProgress.start();
  if (!tokenFlag && to.name != 'Login') {
    next({
      name: 'Login',
      query: {
        redirect: to.fullPath
      }
    });
    NProgress.done();
  } else if (!tokenFlag && to.name == 'Login') {
    next();
    NProgress.done();
  } else if (tokenFlag && to.name == 'Login') {
    next({ name: 'Home' });
    NProgress.done();
  } else {
    next();
    NProgress.done();
  }
})