import { getRouters, refreshToken } from "@/api/user";
import router from "@/router";
import { removeToken, setReToken, setToken, removeReToken, getReToken } from "@/utils/auth";
import { getStore, removeStore, setStore } from "@/utils/localStorage";
import { generateRoutersByServiceData } from "@/utils/tool";
import { MessageBox } from "element-plus/lib/message-box";

const state = {
  userInfo: getStore({ name: 'userInfo' }) || {},
  navRoutes: [],
  navLoading: false,
}

const getters = {
  userInfo: state => state.userInfo,
  roleInfo: state => state.userInfo.sysRoleInfo,
  navRoutes: state => state.navRoutes,
  navLoading: state => state.navLoading
}

const mutations = {
  SET_USERINFO: (state, data) => {
    const { token, userInfo } = data;
    state.userInfo = userInfo;
    setToken(token.access_token);
    setReToken(token.refresh_token)
    setStore({
      name: 'userInfo',
      content: userInfo
    })
  },
  CLEAR_USERINFO: (state) => {
    state.userInfo = {};
    removeToken()
    removeReToken()
    removeStore({ name: 'userInfo' })
  },
  SET_NAVS: (state, data) => {
    state.navRoutes = data;
  },
  NAV_LOADING: (state) => {
    state.navLoading = true;
  },
  NAV_LOADED: (state) => {
    state.navLoading = false;
  }
}

const actions = {
  refreshToken: async () => {
    const data = await refreshToken(getReToken());
    setToken(data.access_token);
    setReToken(data.refresh_token)
    return data;
  },
  generateRouters: async ({ commit }) => {
    commit("NAV_LOADING")
    const data = await getRouters();
    const routes = generateRoutersByServiceData(data);
    commit("NAV_LOADED")
    commit("SET_NAVS", data)
    routes.forEach(item => {
      router.addRoute('Layout', item);
    })
    return data
  },
  logout: async ({ commit }) => {
    await MessageBox.confirm('此操作将退出系统, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    console.log("退出登录")
    commit("CLEAR_USERINFO");
    commit("app/CLEAR_TAG", {}, { root: true });
    router.push({
      name: 'Login'
    })
    return true;
  }
}

const user = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default user