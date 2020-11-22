import router from "@/router";
import { getStore, setStore } from "@/utils/localStorage";

const state = {
  isMobile: false,
  appSize: {
    w: 0,
    h: 0,
  },
  sidebar: {
    collapse: false,
  },
  tagView: getStore({ name: 'tags' }) || [{
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页',
      unclose: true
    }
  }],
  size: 'small',
  theme: getStore({ name: 'theme' }) || {
    mainColor: "#EDB2B2",
    reverseColor: "rgb(212, 154, 155)",
    reverseColor2: "rgb(169, 121, 121)",
    reverseColor3: "rgb(127, 87, 88)",
    reverseColor4: "rgb(105, 70, 71)",
  }
}

const getters = {
  appSize: state => state.appSize,
  collapse: (state) => state.sidebar.collapse,
  sidebarNavs: state => state.sidebar.navs,
  tagView: state => state.tagView,
  isMobile: state => state.isMobile,
  theme: state => state.theme
}

const mutations = {
  SET_APP_SIZE: (state, val) => {
    state.appSize = val;
    if (val.w <= 800) {
      state.isMobile = true;
    } else {
      state.isMobile = false;
    }
  },
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.collapse = !state.sidebar.collapse;
  },
  SET_SIZE: (state, size) => {
    state.size = size;

  },
  ADD_TAG: (state, route) => {
    const tagPathArr = state.tagView.map(item => item.path);
    if (tagPathArr.indexOf(route.path) != -1) return;
    state.tagView.push(route);
    setStore({
      name: 'tags',
      content: state.tagView
    })
  },
  DEL_TAG: (state, { currentPath, route }) => {
    const tagPathArr = state.tagView.map(item => item.path);
    const index = tagPathArr.indexOf(route.path);
    state.tagView.splice(index, 1);
    if (route.path == currentPath) {
      router.push({
        name: state.tagView[index - 1].name
      })
    }
    setStore({
      name: 'tags',
      content: state.tagView
    })
  },
  CLEAR_TAG: (state, { currentPath }) => {
    state.tagView = [{
      path: '/home',
      name: 'Home',
      meta: {
        title: '首页',
        unclose: true
      }
    }];
    setStore({
      name: 'tags',
      content: state.tagView
    })
    if (currentPath != '/home') {
      router.push({
        name: 'Home'
      })
    }
  },
  CLEAR_OTHER_TAG: (state, { currentPath }) => {
    if (currentPath == '/home') {
      state.tagView = [{
        path: '/home',
        name: 'Home',
        meta: {
          title: '首页',
          unclose: true
        }
      }];
    } else {
      state.tagView = [
        {
          path: '/home',
          name: 'Home',
          meta: {
            title: '首页',
            unclose: true
          }
        },
        ...state.tagView.filter(item => item.path == currentPath)
      ];
    }
    setStore({
      name: 'tags',
      content: state.tagView
    })
  },
  SET_THEME: (state, theme) => {
    state.theme = theme;
    setStore({
      name: 'theme',
      content: theme
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
