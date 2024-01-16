/*
 * @Date: 2023-09-19 13:38:14
 * @LastEditors: @yujie
 * @LastEditTime: 2023-12-20 16:34:21
 * @Description:
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { decimals, thousands, vDebounce, Store, EnumInstance } from './utils/directive.js'
import 'animate.css';

const app = createApp(App)

import * as echarts from 'echarts'
app.config.globalProperties.$echarts = echarts

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

// 权限指令
app.directive('hasPermission', (el, binding) => {
  const permissionCode = binding.value
  const permissionCodeList = ['edit']
  if (!permissionCodeList.includes(permissionCode)) {
    el.parentNode && el.parentNode.removeChildren(el)
  }
})

// 防抖指令
app.directive('debounce', (el, binding) => {
  vDebounce(el, binding)
})

// 输入框保留两位小数
const store = new Store()
app.directive('decimals', {
  mounted(el, binding, vNode:any) {
    const key = vNode.ctx.uid
    store.set(key, '')
    decimals(el, binding, store, key)
  },
  updated(el, binding, vNode:any) {
    const key = vNode.ctx.uid
    decimals(el, binding, store, key)
  }
})

// 输入框展示千分位
app.directive('thousands', (el, binding, vNode) => {
  thousands(el)
})

// 枚举：根据key获取对应枚举值
app.directive('enumValue', (el, binding, vNode)=>{
  EnumInstance(el, binding, vNode)
})

app.mount('#app')
