import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import './styles/index.scss'
import './styles/element-variables.scss'
import './permission'
import { MyComponent } from './components/index'
require('./icons/index.js')

createApp(App).use(store).use(router).use(ElementPlus).use(MyComponent).mount('#app')
