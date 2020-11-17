import { removeToken, setToken } from "@/utils/auth";
import { getStore, removeStore, setStore } from "@/utils/localStorage";

const state = {
  userInfo: getStore({ name: 'userInfo' }) || {},
}

const getters = {
  userInfo: state => state.userInfo
}

const mutations = {
  SET_USERINFO: (state, data) => {
    state.userInfo = data;
    const { usename, token } = data;
    setToken(token);
    setStore({
      name: 'userInfo',
      content: {
        usename
      }
    })
  },
  CLEAR_USERINFO: (state) => {
    state.userInfo = {};
    removeToken()
    removeStore({ name: 'userInfo' })
  }
}

const user = {
  namespaced: true,
  state,
  getters,
  mutations
}

export default user