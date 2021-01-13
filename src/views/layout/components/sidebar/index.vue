<template>
  <div class="h-100">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="h-100"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permissionRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import SidebarItem from './SidebarItem.vue'
import { getCurrentInstance, computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
const variables = require('../../../../styles/variables.scss')

export default defineComponent({
  name: 'Menu',
  components: { SidebarItem },
  setup() {
    const { ctx }: any = getCurrentInstance()
    const route = ctx.$router.currentRoute.value
    const store = useStore()
    const activeMenu = computed(() => {
      return route.path
    })
    const isCollapse = computed(() => store.state.app.menu.opened)
    const permissionRoutes = computed(() => store.state.app.permissionRoutes)
    return {
      activeMenu,
      variables,
      isCollapse,
      permissionRoutes
    }
  }
})
</script>
