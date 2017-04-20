<template>
  <div class="home-user">
    <div class="home-dest-header"></div>
    <div class="home-user-main">
      <el-form ref="userForm" class="home-user-form" :label-position="labelPosition" :model="userForm" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="E-mail">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userForm.password" type=password></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="userForm.passwordChecked" type=password></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" v-loading.fullscreen.lock="loading" element-loading-text="更新中..."  @click="updateUser(userForm)">更新</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style>
  .home-user {
    width: 100%;
  }
  .home-user-main {
    position: relative;
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
    font-size: 13px;
  }
  .home-user-form {
    margin: 20px 100px;
    width: 400px;
  }
</style>

<script>
  import Core from '../../core/core'

  export default {
    data () {
      return {
        userForm: {},
        labelPosition: 'left',
        loading: false
      }
    },
    methods: {
      updateUser (user) {
        if (user.password !== user.passwordChecked) {
          this.$message.error('两次密码不一致！')
          return
        }
        this.loading = true
        Core.Api.USER.update(user.name, user.username, user.password, user.phone, user.email).then((data) => {
          this.loading = false
          this.$message.success('更新成功,请重新登录')
          Core.Data.logout()
          this.$router.push('/')
        }, (error) => {
          this.loading = false
          this.$message.error('更新失败: ' + error.message)
        })
      }
    },
    mounted () {
      this.userForm = Core.Data.getUser()
      if (this.userForm === undefined) {
        this.$message.error('尚未登录')
        this.$router.replace('/')
      }
    }
  }
</script>
