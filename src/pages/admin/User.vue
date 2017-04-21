<template>
  <div class="admin-user">
    <el-breadcrumb separator="/" class="crumb">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{roleName}}管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="admin-user-box-card" :body-style="{ padding: '0px' }">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">{{roleName}}管理</span>
        <el-button style="float: right;" type="primary" @click="showAddUser = true">新增</el-button>
      </div>
       <el-table
        :data="userList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="email"
          label="E-mail">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              type="danger"
              @click="showConfirmDialog(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" small layout="total, prev, pager, next" :total="total" :current-page="currentPage" style="margin: 10px 0;"></el-pagination>
    </el-card>
          <el-dialog title="新增" v-model="showAddUser" size="tiny">
            <el-form label-position="left" :model="userForm" label-width="80px">
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="userForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机号码">
                    <el-input v-model="userForm.phone" placeholder="手机号码"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="姓名">
                    <el-input v-model="userForm.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" placeholder="密码" v-model="userForm.password"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="E-Mail">
                    <el-input placeholder="E-Mail" v-model="userForm.email"></el-input>
                </el-form-item>
            </el-form>
            <div class="login-btn">
              <el-button type="primary" @click="addUser()">确定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="提示" v-model="showUserEditing" size="tiny">
            <span>确定删除[ {{userEditing.name}} ] ?</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="showUserEditing = false">取 消</el-button>
              <el-button type="danger" @click="deleteUser()">确 定</el-button>
            </span>
          </el-dialog>
  </div>
</template>

<script>
  import Core from '@/core/core'

  export default {
    data () {
      return {
        role: '',
        roleName: '',
        userList: [],
        showAddUser: false,
        currentPage: 1,
        total: 0,
        userForm: {
          username: '',
          name: '',
          password: '',
          phone: '',
          email: ''
        },
        showUserEditing: false,
        userEditing: {}
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'refresh'
    },
    mounted () {
      this.getRole()
      this.getUserList(1)
    },
    methods: {
      refresh () {
        this.getRole()
        this.getUserList(1)
      },
      handleCurrentChange (page) { // 分页请求
        this.getUserList(page)
      },
      showConfirmDialog (user) {
        this.userEditing = user
        this.showUserEditing = true
      },
      getRole () {
        this.role = this.$route.params.role
        switch (this.role) {
          case 'user':
            this.roleName = '用户'
            break
          case 'admin':
            this.roleName = '管理员'
            break
          case 'guide':
            this.roleName = '管理员'
            break
          default:
            this.role = 'user'
            this.roleName = '用户'
            break
        }
      },
      getUserList (page) {
        Core.Api.USER.getUserList(('ROLE_' + this.role).toUpperCase(), page - 1).then((data) => {
          this.userList = data.user_list
          this.currentPage = data.number + 1
          this.total = data.totalElements
        }, (error) => {
          this.$message.error('获取' + this.roleName + '列表失败： ' + error.message)
        })
      },
      addUser () {
        Core.Api.USER.addAdmin(this.userForm.username, this.userForm.name, this.userForm.phone, this.userForm.email, this.userForm.password, ('ROLE_' + this.role).toUpperCase()).then((data) => {
          this.getUserList(1)
          this.showAddUser = false
          this.userForm = {}
          this.$message.success('添加成功')
        }, (error) => {
          this.$message.error('添加失败： ' + error.message)
        })
      },
      deleteUser () {
        this.showUserEditing = false
        Core.Api.USER.deleteUser(this.userEditing.username).then(() => {
          this.$message.success('删除成功')
          this.userEditing = {}
          this.getUserList(1)
        }, (error) => {
          this.userEditing = {}
          this.$message.error('删除失败：' + error.message)
        })
      }
    }
  }
</script>

<style>
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
</style
