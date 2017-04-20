<template>
  <div class="home-footer footer" id="footer">
    <div class="home-footer-wrap ft-content">
      <div class="ft-info clearfix">
        <dl class="ft-info-col ft-info-intro">
          <dt>中国领先的自由行服务平台</dt>
          <dd>覆盖全球200多个国家和地区</dd>
          <dd><strong>100,000,000</strong> 位旅行者</dd>
          <dd><strong>920,000</strong> 家国际酒店</dd>
          <dd><strong>21,000,000</strong> 条真实点评</dd>
          <dd><strong>382,000,000</strong> 次攻略下载</dd>
          <dd><a class="highlight" target="_blank">中国旅游行业第一部“玩法”</a></dd>
        </dl>
        <dl class="ft-info-col ft-info-about">
          <dt>关于我们</dt>
          <dd><a rel="nofollow">关于我们</a></dd>
          <dd><a rel="nofollow">隐私政策</a></dd>
          <dd><a rel="nofollow">服务协议</a></dd>
          <dd><a rel="nofollow">联系我们</a></dd>
          <dd><router-link :to="{path: '/admin'}">后台管理</router-link></dd>
          <dd><a class="joinus highlight" title="蚂蜂窝团队招聘" target="_blank" rel="nofollow">加入我们</a></dd>
        </dl>
        <dl class="ft-info-col ft-info-service">
          <dt>旅行服务</dt>
          <dd>
              <ul class="clearfix">
                  <li><a target="_blank">旅游攻略</a></li>
                  <li><a target="_blank">酒店预订</a></li>
                  <li><a target="_blank">旅游特价</a></li>
                  <li><a target="_blank">国际租车</a></li>
                  <li><a target="_blank">旅游问答</a></li>
                  <li><a target="_blank">旅游保险</a></li>
                  <li><a target="_blank">旅游指南</a></li>
                  <li><a target="_blank">订火车票</a></li>
                  <li><a target="_blank">旅游资讯</a></li>
                  <li><a target="_blank">APP下载</a></li>
                  <li><a target="_blank" class="highlight">全球供应商入驻</a></li>
              </ul>
          </dd>
        </dl>
        <dl class="ft-info-col ft-info-qrcode">
          <dd>
              <span class="ft-qrcode-tejia"></span>
              <p>良品<br>官方服务号</p>
          </dd>
          <dd>
              <span class="ft-qrcode-weixin"></span>
              <p>自由行<br>官方订阅号</p>
          </dd>
        </dl>
        <dl class="ft-info-social">
          <dt>关注我们</dt>
          <dd>
              <a class="ft-social-weibo"><i class="ft-social-icon"></i></a>
              <a class="ft-social-qqt"><i class="ft-social-icon"></i></a>
              <a class="ft-social-qzone"><i class="ft-social-icon"></i></a>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<style>
  .highlight {
    color: #ff9d00!important
  }
  .home-footer {
    width: 100%;
    clear: both;
    background-color: #3c3c3c;
    color: #c2c2c2;
    line-height: 22px;
    padding-bottom: 20px;
    font-size: 12px;
  }
  .home-footer-wrap {
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
  }

  .footer a {
    color: #c2c2c2;
  }

  .footer a:hover {
    color: #fff;
    text-decoration: none;
  }
  .footer .ft-info {
    padding: 30px 8px 40px 8px;
    border-bottom: 1px solid #575a5b;
  }

  .footer .ft-info-col {
    float: left;
    display: inline;
  }

  .footer .ft-info dt {
    height: 30px;
    font-size: 14px;
    overflow: hidden;
  }

  .footer .ft-info-intro {
    width: 200px;
    margin-right: 68px;
  }

  .footer .ft-info-intro strong {
    color: #ff9d00;
    font-weight: normal;
  }

  .footer .ft-info-about {
    width: 128px;
    margin-right: 85px;
  }

  .footer .ft-info-service {
    width: 135px;
    margin-right: 80px;
  }

  .footer .ft-info-service dt {
    text-align: center;
  }

  .footer .ft-info-service dd {
    width: 100%;
    overflow: hidden;
  }

  .footer .ft-info-service ul {
    margin-right: -35px;
  }

  .footer .ft-info-service li {
    float: left;
    width: 85px;
  }

  .footer .ft-info-qrcode {
    float: right;
    padding-top: 22px;
    line-height: 1.4em;
  }

  .footer .ft-info-qrcode dd {
    width: 100px;
    display: inline;
    margin-left: 30px;
    float: right;
    text-align: center;
  }

  .footer .ft-info-qrcode span {
    display: block;
    height: 90px;
    margin: 0 0 8px 6px;
  }

  .footer .ft-qrcode-weixin {
    background: url("../../../assets/qr_mfw4.gif") no-repeat;
  }

  .footer .ft-qrcode-tejia {
    background: url("../../../assets/qr_tejia4.png") no-repeat;
  }

  .footer .ft-info-social {
    clear: both;
    text-align: center;
    padding-top: 25px;
  }

  .footer .ft-info-social dt {
    font-size: 16px;
  }

  .footer .ft-info-social dd {
    padding: 5px 0;
  }

  .footer .ft-info-social dd a {
    display: inline-block;
    margin: 0 6px;
  }

  .footer .ft-social-icon {
    display: inline-block;
    width: 28px;
    height: 28px;
    background: url("../../../assets/mfw-footer-sprite5.png") no-repeat 0 0;
    overflow: hidden;
  }

  .footer .ft-social-qqt .ft-social-icon {
    background-position: -30px 0;
  }

  .footer .ft-social-qzone .ft-social-icon {
    background-position: -60px 0;
  }

  .footer .ft-links {
    margin-top: -1px;
    border-top: 1px solid #575a5b;
    border-bottom: 1px solid #575a5b;
    padding: 17px 0 17px 8px;
  }

  .footer .ft-links a {
    display: inline-block;
    margin-right: 12px;
  }
</style>

<script>
  export default {

  }
</script>
