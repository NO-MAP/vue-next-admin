import { getStore, setStore } from "@/utils/localStorage";

const state = {
  appSize: {
    w: 0,
    h: 0,
  },
  sidebar: {
    collapse: false,
  },
  tagView: getStore({ name: 'tags' }) || [{
    path: '/Home',
    name: 'Home',
    meta: {
      title: '首页',
      unclose: true
    }
  }],
  size: 'small'
}

const getters = {
  appSize: state => state.appSize,
  collapse: (state) => state.sidebar.collapse,
  sidebarNavs: state => state.sidebar.navs,
  tagView: state => state.tagView
}

const mutations = {
  SET_APP_SIZE: (state, val) => {
    state.appSize = val;
  },
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.collapse = !state.sidebar.collapse;
  },
  SET_SIZE: (state, size) => {
    state.size = size
  },
  ADD_TAG: (state, route) => {
    const tagNameArr = state.tagView.map(item => item.name);
    if (tagNameArr.indexOf(route.name) != -1) return;
    state.tagView.push(route);
    setStore({
      name: 'tags',
      content: state.tagView
    })
  }
}


const app = {
  namespaced: true,
  state,
  getters,
  mutations,
}


export default app
