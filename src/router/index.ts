import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../views/layout/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/ruleChain',
    children: [
      {
        path: 'ruleChain',
        name: 'RuleChain',
        component: () => import(/* webpackChunkName: "ruleChain" */ '../views/ruleChain/index.vue'),
        meta: {
          icon: 'code-working',
          title: '规则链库'
        }
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import(/* webpackChunkName: "test" */ '../views/test/index.vue'),
        meta: {
          icon: 'code-working',
          title: '测试'
        }
      },
      {
        path: 'test1',
        name: 'Test1',
        component: () => import(/* webpackChunkName: "test" */ '../views/test/index.vue'),
        meta: {
          icon: 'code-working',
          title: '测试111'
        },
        children: [
          {
            path: 'test22',
            name: 'Test22',
            component: () => import(/* webpackChunkName: "test" */ '../views/test/index.vue'),
            meta: {
              icon: 'code-working',
              title: '测试22'
            }
          },
          {
            path: 'test33',
            name: 'Test33',
            component: () => import(/* webpackChunkName: "test" */ '../views/test/index.vue'),
            meta: {
              icon: 'code-working',
              title: '测试333'
            }
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
