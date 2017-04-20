<template>
  <div class="wrapper">
    <admin-header></admin-header>
    <admin-sider></admin-sider>
    <div class="content">
      <transition name="move" mode="out-in"><router-view></router-view></transition>
    </div>
  </div>
</template>

<style>
</style>

<script>
  import AdminHeader from '@/components/layout/admin/Header'
  import AdminSider from '@/components/layout/admin/Sider'

  export default {
    components: {
      'admin-header': AdminHeader,
      'admin-sider': AdminSider
    }
  }

</script>
