const state = {
  appSize: {
    w: 0,
    h: 0,
  },
  sidebar: {
    collapse: false,
    navs: [],
  },
  size: 'small'
}

const getters = {
  appSize: state => state.appSize,
  collapse: (state) => state.sidebar.collapse,
  sidebarNavs: state => state.sidebar.navs
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
  }
}


const app = {
  namespaced: true,
  state,
  getters,
  mutations,
}


export default app
