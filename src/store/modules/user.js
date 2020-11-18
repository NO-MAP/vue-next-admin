import { getRouters, refreshToken } from "@/api/user";
import router from "@/router";
import { removeToken, setReToken, setToken, removeReToken, getReToken } from "@/utils/auth";
import { getStore, removeStore, setStore } from "@/utils/localStorage";

const state = {
  userInfo: getStore({ name: 'userInfo' }) || {},
  navs: getStore({ name: "navs" }) || [],
}

const getters = {
  userInfo: state => state.userInfo,
  navs: state => state.navs
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
    state.navs = data;
    setStore({
      name: 'navs',
      content: data
    })
  }
}

const actions = {
  refreshToken: async () => {
    const data = await refreshToken(getReToken());
    setToken(data.access_token);
    setReToken(data.refresh_token)
    return data;
  },
  generateRouters: async () => {
    const data = await getRouters();
    console.log(data)
    console.log(router)
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