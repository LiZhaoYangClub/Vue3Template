<template>
  <div class="h-100 head d-flex">
    <div class="logo h-100 cursor-pointer" @click="handleToHome">
      Flink实时数仓
    </div>
    <div class="route d-flex pl-3">
      <SvgIcon :icon-class="currentRoute.meta.icon" style="margin-top: 18px;" />
      <div class="breadCrumb px-1">{{ currentRoute.meta.title }}</div>
    </div>
    <div class="user pr-2 cursor-pointer">
      <el-dropdown trigger="click">
        <div class="drop">
          <SvgIcon icon-class="user" style="margin-top: 18px;" />
          <div class="username px-2">admin</div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="el-icon-switch-button" @click="handleLogout"
              >注销</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance } from 'vue'
import { removeToken } from '@/utils/auth'

export default defineComponent({
  name: 'Head',
  setup() {
    const { ctx } = getCurrentInstance()
    const currentRoute = ctx.$router.currentRoute.value
    const handleLogout = () => {
      removeToken()
      ctx.$router.push('/login')
    }
    const handleToHome = () => {
      ctx.$router.push('/')
    }
    return {
      currentRoute,
      handleLogout,
      handleToHome
    }
  }
})
</script>

<style lang="scss" scoped>
$bg: #305680;
.head {
  position: relative;
  background: $bg;
  .logo {
    width: 220px;
    font-size: 20px;
    font-weight: 400;
    line-height: 60px;
    color: #fff;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
  }
  .route {
    font-size: 24px;
    .breadCrumb {
      font-size: 18px;
      color: #fff;
      line-height: 60px;
    }
  }
  .user {
    position: absolute;
    right: 0;
    height: 60px;
    font-size: 24px;
    .username {
      display: inline-block;
      font-size: 14px;
      line-height: 60px;
      color: #fff;
      vertical-align: top;
    }
    .drop {
      font-size: 24px;
    }
  }
}
</style>
