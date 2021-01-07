import { getRouters, getProfile } from "@/api/login";
import router from "@/router";
import { removeToken, setToken } from "@/utils/auth";
import { getStore, removeStore, setStore } from "@/utils/localStorage";
import { generateRoutersByServiceData } from "@/utils/tool";
import { ElMessageBox } from "element-plus";


const state = {
  userInfo: getStore({ name: 'userInfo' }) || {},
  navRoutes: [],
  navLoading: false,
}

const getters = {
  userInfo: state => state.userInfo,
  roleInfo: state => state.userInfo.roles,
  navRoutes: state => state.navRoutes,
  navLoading: state => state.navLoading
}

const mutations = {
  SET_TOKEN: (state, data) => {
    const token = data.access_token;
    setToken(token);
  },
  SET_USERINFO: (state, data) => {
    state.userInfo = data;
    setStore({
      name: 'userInfo',
      content: data
    })
  },
  CLEAR_USERINFO: (state) => {
    state.userInfo = {};
    removeToken()
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
  GET_USERINFO: async ({ commit }) => {
    const userInfo = await getProfile();
    commit("SET_USERINFO", userInfo)
    console.log("GET_USERINFO")
    return true
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
    await ElMessageBox.confirm('此操作将退出系统, 是否继续?', '提示', {
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