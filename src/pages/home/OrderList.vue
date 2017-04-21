<template>
  <div class="home-order-list">
    <div class="home-dest-header"></div>
    <div class="home-order-main">
      <el-table :data="orderList"
        style="width: 100%">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="order-table-expand">
              <el-form-item label="订单名称">
                <span>{{ props.row.route.name }} * {{props.row.count}}</span>
              </el-form-item>
              <el-form-item label="订单ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="目的地">
                <span>{{ props.row.destination.dest }}</span>
              </el-form-item>
              <el-form-item label="订单金额">
                <span>{{ props.row.money }}</span>
              </el-form-item>
              <el-form-item label="创建用户">
                <span>{{ props.row.user.name }}</span>
              </el-form-item>
              <el-form-item label="联系人">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="联系方式">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.create_time_formatted }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ props.row.update_time_formatted }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.note }}</span>
              </el-form-item>
              <el-form-item label="其他">
                <span>{{ props.row.reply }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="订单名称"
          prop="route.name">
        </el-table-column>
        <el-table-column
          label="数量"
          prop="count">
        </el-table-column>
        <el-table-column
          label="目的地"
          prop="destination.dest">
        </el-table-column>
        <el-table-column
          label="金额"
          prop="money">
        </el-table-column>
        <el-table-column label="状态">
          <template scope="scope">
            <el-tag type="primary">{{getStatus(scope.row.status)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              type="warning"
              @click="cancelOrder(scope.$index, scope.row)" v-if="scope.row.status === 0">取消</el-button>
            <el-button
              size="small"
              type="danger"
              @click="deleteOrder(scope.$index, scope.row)" v-if="scope.row.status === 0">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" small layout="total, prev, pager, next" :total="total" :current-page="currentPage" style="margin: 10px 0;"></el-pagination>
    </div>
  </div>
</template>

<style>
  .home-order-list {
    width: 100%;
    border-bottom: 1px solid #e4e4e4;
  }
  .home-order-main {
    position: relative;
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
    font-size: 13px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  
  .order-table-expand {
    font-size: 0;
  }
  .order-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .order-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: auto;
    min-width: 50%;
  }
</style>

<script>
  import Core from '@/core/core'

  export default {
    data () {
      return {
        orderList: [],
        currentPage: 1,
        total: 0
      }
    },
    methods: {
      handleCurrentChange (page) { // 分页请求
        this.getOrderList(page)
      },
      cancelOrder (index, order) {
        this.updateOrderStatus(order, -1)
      },
      deleteOrder (index, order) {
        Core.Api.ORDER.deleteOrder(order.id).then(() => {
          this.$message.success('订单删除成功')
          this.getOrderList(1)
        }, () => {
          this.$message.error('订单删除失败')
        })
      },
      getOrderList (page) {
        Core.Api.ORDER.getListCreated(page - 1).then((data) => {
          this.orderList = data.order_list
          this.currentPage = data.number + 1
          this.total = data.totalElements
        }, () => {
          this.$message.error('获取订单列表失败')
        })
      },
      getStatus (status) {
        switch (status) {
          case 0:
            return '待审核'
          case 1:
            return '审核成功'
          case -1:
            return '已取消'
          case -2:
            return '已回绝'
          default:
            return '未知'
        }
      },
      updateOrderStatus (order, status) {
        Core.Api.ORDER.updateStatus(order.id, status).then(() => {
          this.$message.success('操作成功')
          this.getOrderList(this.currentPage)
        }, (error) => {
          this.$message.error('操作失败: ' + error.message)
        })
      }
    },
    mounted () {
      this.getOrderList(1)
    }
  }
</script>
