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
          label="状态"
          prop="status">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              type="warning"
              @click="editOrder(scope.$index, scope.row)">取消</el-button>
            <el-button
              size="small"
              type="danger"
              @click="deleteOrder(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  export default {
    data () {
      return {
        orderList: [
          {
            id: 1,
            username: 'cheney',
            phone: '13164403207',
            note: '这是备注',
            status: 0,
            create_time: '2017-04-20',
            update_time: '2017-04-20',
            count: 2,
            money: 7900,
            destination: {
              name: '苏梅岛'
            },
            route: {
              name: '为所欲为第一站——去苏梅晒出小麦色！（清迈-苏梅-涛岛-满月趴）'
            },
            user: {
              name: 'cheneyang'
            }
          }
        ]
      }
    },
    methods: {
      editOrder (index, order) {
        console.log('edit: ' + index + '--' + order)
      },
      deleteOrder (index, order) {
        console.log('delete: ' + index + '--' + order)
      }
    }
  }
</script>
