<template>
  <div class="w-100 h-100 overflow-hidden layout position-relative">
    <div class="head"><Head /></div>
    <div
      class="main position-relative"
      :style="`padding-left: ${iconClass === 'close' ? '220px' : '64px'};`"
    >
      <div
        class="menu h-100 overflow-hidden"
        :style="`width: ${iconClass === 'close' ? '220px' : '64px'};`"
      >
        <div class="ctrl cursor-pointer">
          <SvgIcon :icon-class="iconClass" @click="handleExpand" />
        </div>
        <Menu />
      </div>
      <div class="article h-100 overflow-hidden position-relative">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance, ref } from 'vue'
import Head from './components/header/index.vue'
import Menu from './components/sidebar/index.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Layout',
  components: {
    Head,
    Menu
  },
  setup() {
    const store = useStore()
    const { ctx }: any = getCurrentInstance()
    const iconClass = computed(() =>
      store.state.app.menu.opened ? 'open' : 'close'
    )
    const handleExpand = () => {
      store.dispatch('app/expand')
    }
    const key = ref(ctx.$router.currentRoute.value.path)
    const cachedViews = computed(() => store.state.app.cachedViews)
    return {
      iconClass,
      handleExpand,
      cachedViews,
      key
    }
  }
})
</script>

<style lang="scss" scoped>
.layout {
  .head {
    height: 60px;
  }
  .main {
    height: calc(100% - 60px);
    // transition: all 0.3s ease-in-out;
  }
  .menu {
    transition: all 0.3s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    .ctrl {
      position: absolute;
      bottom: 10px;
      left: 0;
      width: 100%;
      background: transparent;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
