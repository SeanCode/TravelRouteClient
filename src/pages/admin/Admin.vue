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
  .content {
    background: none repeat scroll 0 0 #fff;
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    width: auto;
    padding: 40px;
    box-sizing: border-box;
    overflow-y: scroll;
  }
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
