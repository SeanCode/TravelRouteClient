<template>
  <div>
    <el-breadcrumb separator="/" class="crumb">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>路线管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="admin-user-box-card" :body-style="{ padding: '0px' }">
          <el-table :data="destList"
            @row-click="renderRouteTable"
            stripe
            style="width: 100%">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              label="名称"
              prop="name">
            </el-table-column>
            <el-table-column
              label="地点"
              prop="dest">
            </el-table-column>
          </el-table>
          <el-pagination @current-change="handleCurrentDestChange" small layout="total, prev, pager, next" :total="totalDest" :current-page="currentDestPage" style="margin: 10px 0;"></el-pagination>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card class="admin-user-box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">路线管理</span>
            <el-button style="float: right;" type="primary" @click="$router.push('/admin/route/save')">新增</el-button>
          </div>
          <el-table :data="routeList"
            style="width: 100%">
            <el-table-column type="expand">
              <template scope="props">
                <el-form label-position="left" inline class="order-table-expand">
                  <el-form-item label="ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="名称">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="地点">
                    <span>{{ props.row.dest.dest }}</span>
                  </el-form-item>
                  <el-form-item label="简介">
                    <span>{{ props.row.intro }}</span>
                  </el-form-item>
                  <el-form-item label="介绍">
                    <span>{{ props.row.info }}</span>
                  </el-form-item>
                  <el-form-item label="创建时间">
                    <span>{{ props.row.create_time_formatted }}</span>
                  </el-form-item>
                  <el-form-item label="更新时间">
                    <span>{{ props.row.update_time_formatted }}</span>
                  </el-form-item>
                  <el-form-item label="图片">
                    <el-carousel style="width: 400px; height: 260px">
                      <el-carousel-item v-for="(item, index) in props.row.img_list" :key=index>
                        <img :src="item" style="width: 400px; height: 260px">
                      </el-carousel-item>
                    </el-carousel>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              label="名称"
              prop="name">
            </el-table-column>
            <el-table-column
              label="地点"
              prop="dest.dest">
            </el-table-column>
            <el-table-column
              label="更新时间"
              prop="update_time_formatted">
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button
                  size="small"
                  type="warning"
                  @click="editRoute(scope.row)">编辑</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="showConfirmDialog(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="handleCurrentRouteChange" small layout="total, prev, pager, next" :total="totalRoute" :current-page="currentRoutePage" style="margin: 10px 0;"></el-pagination>
        </el-card>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
  import Core from '@/core/core'

  export default {
    data () {
      return {
        destList: [],
        routeList: [],
        totalDest: 0,
        totalRoute: 0,
        currentDestPage: 1,
        currentRoutePage: 1,
        showRouteEditing: false,
        routeEditing: {},
        destId: 0
      }
    },
    methods: {
      handleCurrentDestChange (page) {
        this.getDestList(page)
      },
      getDestList (page) {
        Core.Api.DESTINATION.getDestList(page - 1).then((data) => {
          this.destList = data.dest_list
          this.currentDestPage = data.number + 1
          this.totalDest = data.totalElements
        }, (error) => {
          this.$message.error('获取列表失败: ' + error.message)
        })
      },
      renderRouteTable (row, event, column) {
        this.destId = row.id
        this.getRouteList(1)
      },
      handleCurrentRouteChange (page) {
        this.getRouteList(1)
      },
      getRouteList (page) {
        Core.Api.ROUTE.getRouteList(this.destId, page - 1).then((data) => {
          this.routeList = data.route_list
          this.currentRoutePage = data.number + 1
          this.totalRoute = data.totalElements
        }, (error) => {
          this.$message.error('获取列表失败: ' + error.message)
        })
      },
      showConfirmDialog (route) {
        this.routeEditing = route
        this.showRouteEditing = true
      },
      deleteRoute () {
        this.showRouteEditing = false
        Core.Api.ROUTE.deleteRoute(this.routeEditing.id).then(() => {
          this.$message.success('删除成功')
          this.routeEditing = {}
          this.getRouteList(1)
        }, (error) => {
          this.$message.error('删除失败: ' + error.message)
        })
      },
      editRoute (route) {
        this.$router.push('/admin/route/save/' + route.id)
      }
    },
    mounted () {
      this.getDestList(1)
    }
  }
</script>

<style>
</style
