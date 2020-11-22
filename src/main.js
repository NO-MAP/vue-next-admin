import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import './styles/reset.css'
import 'element-plus/lib/theme-chalk/index.css';
import './styles/element-reset.scss';
import 'nprogress/nprogress.css'
import './styles/theme.scss'

import './router/router-permission'

import NProgress from "nprogress/nprogress";
NProgress.configure({showSpinner: false});

import dragable from "./directive/dragable"

const app = createApp(App)

app.config.errorHandler = (err) => {
  console.error("errorHandler", err)
}

app.directive('dragable', dragable)

app.use(store)

app.use(router)

app.use(ElementPlus, { size: 'mini', zIndex: 3000 })

app.mount('#app')
