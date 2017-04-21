<template>
  <div>
    <el-breadcrumb separator="/" class="crumb">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>目的地管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="admin-user-box-card" :body-style="{ padding: '0px' }">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">目的地管理</span>
        <el-button style="float: right;" type="primary" @click="$router.push('/admin/dest/save')">新增</el-button>
      </div>
      <el-table :data="destList"
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
                <span>{{ props.row.dest }}</span>
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
          prop="dest">
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
              @click="editDest(scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="showConfirmDialog(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" small layout="total, prev, pager, next" :total="total" :current-page="currentPage" style="margin: 10px 0;"></el-pagination>
    </el-card>
          <el-dialog title="提示" v-model="showDestEditing" size="tiny">
            <span>确定删除[ {{destEditing.name}} ] ?</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="showDestEditing = false">取 消</el-button>
              <el-button type="danger" @click="deleteDest()">确 定</el-button>
            </span>
          </el-dialog>
  </div>
</template>

<script>
  import Core from '@/core/core'

  export default {
    data () {
      return {
        destList: [],
        total: 0,
        currentPage: 1,
        showDestEditing: false,
        destEditing: {}
      }
    },
    methods: {
      handleCurrentChange (page) {
        this.getDestList(1)
      },
      getDestList (page) {
        Core.Api.DESTINATION.getDestList(page - 1).then((data) => {
          this.destList = data.dest_list
          this.currentPage = data.number + 1
          this.total = data.totalElements
        }, (error) => {
          this.$message.error('获取列表失败: ' + error.message)
        })
      },
      showConfirmDialog (dest) {
        this.destEditing = dest
        this.showDestEditing = true
      },
      deleteDest () {
        this.showDestEditing = false
        Core.Api.DESTINATION.delete(this.destEditing.id).then(() => {
          this.$message.success('删除成功')
          this.destEditing = {}
          this.getDestList(1)
        }, (error) => {
          this.$message.error('删除失败: ' + error.message)
        })
      },
      editDest (dest) {
        this.$router.push('/admin/dest/save/' + dest.id)
      }
    },
    mounted () {
      this.getDestList(1)
    }
  }
</script>

<style>
</style
