const state = {
  sidebar: {
    opened: true
  },
  size: 'small'
}

const getters = {
  sidebar: (state) => state.sidebar
}

const mutations = {
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
