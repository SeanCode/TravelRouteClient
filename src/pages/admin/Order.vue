<template>
  <div>
    <el-breadcrumb separator="/" class="crumb">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单</el-breadcrumb-item>
    </el-breadcrumb>
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
                <span>{{ props.row.destination.name }}</span>
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
                <span>{{ props.row.create_time }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ props.row.update_time }}</span>
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
          label="金额"
          prop="money">
        </el-table-column>
        <el-table-column
          label="创建人"
          prop="user.name">
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
              type="danger"
              @click="rejectOrder(scope.$index, scope.row)" v-if="scope.row.status === 0">回绝
            </el-button>
            <el-button
              size="small"
              type="success"
              @click="approveOrder(scope.$index, scope.row)" v-if="scope.row.status === 0">通过
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" small layout="total, prev, pager, next" :total="total" :current-page="currentPage" style="margin: 10px 0;"></el-pagination>
  </div>
</template>

<script>
  import Core from '@/core/core'

  export default {
    data () {
      return {
        orderList: [
          // {
          //   id: 1,
          //   username: 'cheney',
          //   phone: '13164403207',
          //   note: '这是备注',
          //   status: 0,
          //   create_time: '2017-04-20',
          //   update_time: '2017-04-20',
          //   count: 2,
          //   money: 7900,
          //   destination: {
          //     name: '苏梅岛'
          //   },
          //   route: {
          //     name: '为所欲为第一站——去苏梅晒出小麦色！（清迈-苏梅-涛岛-满月趴）'
          //   },
          //   user: {
          //     name: 'cheneyang'
          //   }
          // }
        ],
        currentPage: 1,
        total: 0
      }
    },
    methods: {
      handleCurrentChange (page) { // 分页请求
        this.getOrderList(page)
      },
      rejectOrder (index, order) {
        this.updateOrderStatus(order, -2)
      },
      approveOrder (index, order) {
        this.updateOrderStatus(order, 1)
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
      getOrderList (page) {
        Core.Api.ORDER.getListReceived(page).then((data) => {
          this.orderList = data.order_list
          this.currentPage = data.number
          this.total = data.totalElements
        }, (error) => {
          this.$message.error('获取订单列表失败: ' + error.message)
        })
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
      this.total = this.orderList.length
    }
  }
</script>

<style>
  .admin-crumb {
    margin: 15px 0 20px;
  }
</style
