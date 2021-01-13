<template>
  <div class="login-page w-100 h-100 overflow-hidden">
    <div class="login position-center">
      <div class="f24 text-center" style="line-height: 100px;">{{ title }}</div>
      <el-form
        :model="userform"
        ref="userForm"
        :rules="rules"
        class="loginForm position-center"
      >
        <div class="label text-left f18 font-weight-normal">密码登录</div>
        <el-form-item prop="username">
          <el-input
            v-model.trim="userform.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="userform.password"
            autocomplete="off"
            placeholder="请输入登录密码"
            @keyup.enter="handleLogin"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click.stop="handleLogin">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, unref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Login',
  setup() {
    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 20, message: '长度在 2 到 20 个字符' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 25, message: '长度在 5 到 25个字符' },
        { pattern: /^(\w){5,25}$/, message: '只能输入5-25个字母、数字、下划线' }
      ]
    }
    const userform = reactive({
      username: '',
      password: ''
    })
    const userForm = ref(null)
    const store = useStore()
    const instance: any = getCurrentInstance()
    const handleLogin = async () => {
      const form: any = unref(userForm)
      if (!form) return
      form.validate((valid: boolean) => {
        valid &&
          store.dispatch('app/toLogin', unref(userform)).then(() => {
            instance.ctx.$router.push('/')
          })
      })
    }
    return {
      title: 'Flink实时数仓',
      userform,
      handleLogin,
      rules,
      userForm
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.login-page {
  background-image: url('../../assets/images/bg.jpg');
  background-size: cover;
  .login {
    width: 500px;
    height: 500px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
    left: 75% !important;
    position: relative;
    .loginForm {
      width: 330px;
      .label {
        height: 54px;
      }
      /deep/ .el-input__inner {
        color: $inputColor;
        border-radius: 0;
        border: 1px solid $borderColor;
        background: #fff !important;
        height: 42px;
        padding-left: 10px;
        outline: none;
        box-sizing: border-box;
        font-size: 12px;
        &:hover {
          border-color: $inputHover;
        }
        &:focus {
          border-color: $inputHover;
        }
      }
      /deep/.el-button {
        height: 42px;
        width: 100%;
        border-radius: 0;
      }
    }
  }
}
</style>
