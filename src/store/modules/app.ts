import { login } from '@/api'
import { Commit } from 'vuex'
import { setToken } from '@/utils/auth'
import { routes } from '@/router/index'

interface Ctx {
  commit: Commit;
}
interface User {
  username: string;
  password: string;
}
const state = {
  userInfo: {},
  menu: {
    opened: true
  },
  permissionRoutes: routes[1].children,
  cachedViews: []
}

const mutations = {
  TO_LOGIN (state: any, data: any) {
    state.userInfo = data
  },
  EXPAND (state: any) {
    state.menu.opened = !state.menu.opened
  }
}

const actions = {
  toLogin: ({ commit }: Ctx, data: User) => {
    return new Promise(async (resolve) => {
      const res: any = await login(data)
      if (res.token) {
        setToken(res.token)
        commit('TO_LOGIN', res.token)
        resolve(res.token)
      }
    })
  },
  expand: ({ commit }: Ctx) => {
    commit('EXPAND')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
