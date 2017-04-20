<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" theme="dark" unique-opened router>
      <el-menu-item index="/admin/order">订单
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">USER</template>
        <el-menu-item index="/admin/user/user">用户管理</el-menu-item>
        <el-menu-item index="/admin/user/admin">管理员管理</el-menu-item>
        <el-menu-item index="/admin/user/guide">导游管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">旅游产品</template>
        <el-menu-item index="/admin/dest">目的地管理</el-menu-item>
        <el-menu-item index="/admin/route">路线管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<style>
  .sidebar {
    display: block;
    position: absolute;
    width: 250px;
    left: 0;
    top: 70px;
    bottom:0;
    background: #2E363F;
  }
  .sidebar ul {
    height: 100%;
  }
</style>

<script>
  export default {
    computed: {
      onRoutes () {
        return this.$route.path
      }
    }
  }
</script>
