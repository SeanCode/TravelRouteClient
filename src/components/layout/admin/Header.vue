<template>
  <div class="admin-header">
    <div class="logo" @click="goToAdminIndex()">后台管理系统</div>
    <el-dropdown class="admin-user-dropdown" @command="handleCommand">
      <span class="el-dropdown-link">
        {{user.name}}<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="0">网站首页</el-dropdown-item>
        <el-dropdown-item command="1">个人信息</el-dropdown-item>
        <el-dropdown-item command="2">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<style>
  .admin-header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
    background-color: #242f42;
  }
  .admin-header .logo {
    float: left;
    width:250px;
    text-align: center;
    cursor: pointer;
  }
  .admin-user-dropdown {
    float: right;
    padding: 0 20px;
    cursor: pointer;
  }
</style>

<script>
  import Core from '@/core/core'

  export default {
    data () {
      return {
        user: Core.Data.getUser()
      }
    },
    methods: {
      goToAdminIndex () {
        this.$router.push('/admin')
      },
      handleCommand (command) {
        switch (command) {
          case '0':
            this.$router.push('/')
            break
          case '1':
            break
          case '2':
            this.logout()
            break
          default:
            break
        }
      },
      logout () {
        this.user = undefined
        Core.Data.setUser(undefined)
        Core.Data.setToken(undefined)
        this.$router.push('/admin/login')
      }
    }
  }
</script>
