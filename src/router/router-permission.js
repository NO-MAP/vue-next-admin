import router from "./index";
import { getToken } from "@/utils/auth"
import NProgress from "nprogress/nprogress";

router.beforeEach((to, from, next) => {
  const token = getToken();
  NProgress.start();
  if (!token && to.name != 'Login') {
    next({
      name: 'Login',
      query: {
        redirect: to.fullPath
      }
    });
    NProgress.done();
  } else if (!token && to.name == 'Login') {
    next();
    NProgress.done();
  } else if (token && to.name == 'Login') {
    next({ name: 'Home' });
    NProgress.done();
  } else {
    next();
    NProgress.done();
  }
})