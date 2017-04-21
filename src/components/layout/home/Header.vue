<template>
<div>
  <div class="home-header">
    <div class="header-wrap">
      <router-link :to="{path: '/'}" class="home-logo">
        <img src="../../../assets/logo.png">
      </router-link>
      <router-link :to="{path: '/'}"  class="home-title">去旅行</router-link>
      <div class="login-out" v-if="!user">
		    <a class="weibo-login" title="微博登录" rel="nofollow"></a>
		    <a class="qq-login" title="QQ登录" rel="nofollow"></a>
		    <a class="weixin-login" title="微信登录" rel="nofollow"></a>
		    <a title="登录" rel="nofollow" @click="showLogin = true">登录</a><span class="split">|</span><a title="注册帐号" rel="nofollow" @click="showRegeister = true">注册</a>
	    </div>
      <div class="login-info" v-if="user">
        <div class="head-user">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">{{user.username}}<i class="el-icon-caret-bottom el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">个人信息</el-dropdown-item>
              <el-dropdown-item command="1">订单</el-dropdown-item>
              <el-dropdown-item command="2">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
          <el-dialog title="登录" v-model="showLogin" size="tiny">
            <el-form :label-position="labelPosition" :model="userForm" label-width="60px">
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="userForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" placeholder="密码" v-model="userForm.password" @keyup.enter.native="login()"></el-input>
                </el-form-item>
            </el-form>
            <div class="login-btn">
              <el-button type="primary" @click="login()">登录</el-button>
            </div>
          </el-dialog>
          <el-dialog title="注册" v-model="showRegeister" size="tiny">
            <el-form :label-position="labelPosition" :model="userForm" label-width="80px">
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="userForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机号码">
                    <el-input v-model="userForm.phone" placeholder="手机号码"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="姓名">
                    <el-input v-model="userForm.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="E-Mail">
                    <el-input v-model="userForm.email" placeholder="E-Mail"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" placeholder="密码" v-model="userForm.password"></el-input>
                </el-form-item>
                <el-form-item prop="passwordChecked" label="确认密码">
                    <el-input type="password" placeholder="确认密码" v-model="userForm.passwordChecked"></el-input>
                </el-form-item>
            </el-form>
            <div class="login-btn">
              <el-button type="primary" @click="register">注册</el-button>
            </div>
          </el-dialog>
</div>
</template>

<script>
  import Core from '../../../core/core'

  export default {
    data () {
      return {
        labelPosition: 'left',
        showLogin: false,
        showRegeister: false,
        user: Core.Data.getUser(),
        userForm: {
          username: '',
          password: '',
          phone: '',
          name: '',
          email: '',
          passwordChecked: ''
        }
      }
    },
    methods: {
      handleCommand (command) {
        switch (command) {
          case '2':
            this.logout()
            break
          case '0':
            this.$router.push('/home/user')
            break
          case '1':
            this.$router.push('/home/order')
            break
          default:
            break
        }
      },
      logout () {
        this.user = undefined
        Core.Data.setUser(undefined)
        Core.Data.setToken(undefined)
      },
      login () {
        if (this.userForm.username === '' || this.userForm.password === '') {
          this.$message.error('账号,密码都要输入完全,^_^!')
          return false
        }
        Core.Api.USER.login(this.userForm.username, this.userForm.password).then((response) => {
          this.$message.success('登录成功, ' + this.userForm.username)
          var userTemp = response.data.data['user']
          Core.Data.setUser(userTemp)
          this.user = userTemp
          Core.Data.setToken(Core.Util.Base64.encode(this.userForm.username + ':' + this.userForm.password))
          this.showLogin = false
        }, () => {
          this.$message.error('登录失败')
        })
      },
      register () {
        if (this.userForm.username === '' || this.userForm.name === '' || this.userForm.password === '' || this.userForm.phone === '') {
          this.$message.error('注册信息不完整,^_^!')
          return false
        }
        if (this.userForm.password !== this.userForm.passwordChecked) {
          this.$message.error('两次密码不一致!')
          return false
        }
        Core.Api.USER.register(this.userForm.username, this.userForm.name, this.userForm.phone, this.userForm.password, this.userForm.email).then((data) => {
          this.showRegeister = false
          this.$message.success('注册成功, 请登录')
          this.showLogin = true
        }, (error) => {
          this.$message.error('注册失败：' + error.message)
        })
      }
    }
  }
</script>

<style>
  .home-header {
    position: fixed;
    width: 100%;
    height: 58px;
    z-index: 90;
  }

  .header-wrap {
    position: relative;
    width: 90%;
    max-width: 1000px;
    height: 58px;
    margin: 0 auto;
  }

  .home-logo {
    margin: 0;
    float: left;
    padding: 13px 0;
    height: 32px;
  }
  
  .home-logo img {
    height: 32px;
  }

  .home-title {
    float: left;
    padding: 13px 4px;
    height: 32px;
    line-height: 32px;
    color: #ccc;
  }
  
  .header-nav {
    line-height: 58px;
    float: left;
    display: inline;
    padding: 0 10px 0 25px;
    color: #333;
    list-style: none;
    margin: 0;
  }

  .login-out {
    margin: 0;
    float: right;
    padding: 21px 0;
    height: 26px;
    line-height: 26px;
    color: #c9c9c9;
    text-align: right
  }

  .login-out a {
    color: #ff9d00;
    text-decoration: none;
    cursor: pointer;
    font-size: 14px
  }

  .login-out a:hover {
    color: #ff8a00
  }

  .login-out .weibo-login,.login-out .qq-login,.login-out .weixin-login {
    display: inline-block;
    margin-right: 6px;
    width: 26px;
    height: 26px;
    background-image: url("../../../assets/header-sprites13@2x.png");
    background-position: 0 -50px!important;
    overflow: hidden;
    vertical-align: -7px;
    *vertical-align: middle;
  }

  .login-out .weibo-login:hover {
    background-position: 0 -80px!important
  }

  .login-out .qq-login {
    background-position: -30px -50px!important
  }

  .login-out .qq-login:hover {
    background-position: -30px -80px!important
  }

  .login-out .weixin-login {
    background-position: 0 -165px!important
  }

  .login-out .weixin-login:hover {
    background-position: -30px -165px!important
  }

  @media(min-resolution: 1.25dppx),(-webkit-min-device-pixel-ratio:1.25),(min-device-pixel-ratio:1.25) {
    .login-out .weibo-login,.login-out .qq-login,.login-out .weixin-login {
        background:url("../../../assets/header-sprites13@2x.png") no-repeat;
        background-size: 200px
    }
  }

  .login-info  {
    float: right;
    position: relative;
    cursor: pointer;
    width: auto;
    height: 58px;
    line-height: 58px;
  }

  .header-user {
    position: relative;
    width: auto;
    height: auto;
  }

  .el-dropdown-link {
    color: #ff8a00;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
    height:36px;
  }
</style>
