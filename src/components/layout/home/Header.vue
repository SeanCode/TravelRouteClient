<template>
  <div class="home-header">
    <div class="header-wrap">
      <div class="home-logo">
        <img src="../../../assets/logo.png">
      </div>
      <div class="home-title">自由行</div>
      <div class="login-out">
		    <a class="weibo-login" href="" title="微博登录" rel="nofollow"></a>
		    <a class="qq-login" href="" title="QQ登录" rel="nofollow"></a>
		    <a class="weixin-login" href="" title="微信登录" rel="nofollow"></a>
		    <a id="_j_showlogin" title="登录" href="" rel="nofollow">登录</a><span class="split">|</span><a href="" title="注册帐号" rel="nofollow">注册</a>
	    </div>
    </div>
  </div>
</template>

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

</style>

<script>
  export default {

  }
</script>
