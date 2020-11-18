import { refreshToken } from "@/api/user";
import { removeToken, setReToken, setToken, removeReToken, getToken } from "@/utils/auth";
import { getStore, removeStore, setStore } from "@/utils/localStorage";

const state = {
  userInfo: getStore({ name: 'userInfo' }) || {},
}

const getters = {
  userInfo: state => state.userInfo
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
  }
}

const actions = {
  refreshToken: async () => {
    const data = await refreshToken(getToken());
    console.log("refreshToken", data)
    return data;
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