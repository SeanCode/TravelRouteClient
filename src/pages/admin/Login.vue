<template>
  <div class="login-wrap">
    <div class="ms-title">后台管理系统</div>
      <div class="ms-login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
           <el-form-item prop="username">
              <el-input v-model="ruleForm.username" placeholder="username"></el-input>
           </el-form-item>
           <el-form-item prop="password">
              <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
           </el-form-item>
           <div class="login-btn">
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
           </div>
        </el-form>
     </div>
  </div>
</template>

<script>
  import Core from '@/core/core'

  export default {
    data: function () {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        const self = this
        self.$refs[formName].validate((valid) => {
          if (valid) {
            Core.Api.USER.login(this.ruleForm.username, this.ruleForm.password).then((response) => {
              var userTemp = response.data.data['user']
              this.$message.success('登录成功, ' + this.ruleForm.username)
              console.log(userTemp)
              Core.Data.setAdmin(userTemp)
              this.user = userTemp
              Core.Data.setAdminToken(Core.Util.Base64.encode(this.ruleForm.username + ':' + this.ruleForm.password))
              this.$router.push('/admin')
            }, (error) => {
              this.$message.error('登录失败：' + error.message)
            })
          } else {
            this.$message.error('输入有误！')
            return false
          }
        })
      }
    }
  }
</script>

<style>

  .login-wrap {
    position: relative;
    width:100%;
    height:100%;
    background: #324157;
  }
  .ms-title{
    position: absolute;
    top:50%;
    width:100%;
    margin-top: -230px;
    text-align: center;
    font-size:30px;
    color: #fff;
  }
  .ms-login{
    position: absolute;
    left:50%;
    top:50%;
    width:300px;
    height:160px;
    margin:-150px 0 0 -190px;
    padding:40px;
    border-radius: 5px;
    background: #fff;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
    height:36px;
  }
</style>
