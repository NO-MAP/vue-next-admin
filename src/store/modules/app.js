const state = {
  appSize: {
    w: 0,
    h: 0,
  },
  sidebar: {
    opened: true,
    navs: [],
  },
  size: 'small'
}

const getters = {
  appSize: state => state.appSize,
  sidebarOpened: (state) => state.sidebar.opened,
  sidebarNavs: state => state.sidebar.navs
}

const mutations = {
  SET_APP_SIZE: (state, val) => {
    state.appSize = val;
  },
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened;
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
