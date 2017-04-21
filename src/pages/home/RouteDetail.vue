<template>
  <div class="home-route-detail">
    <div class="home-dest-header"></div>
    <div class="home-route-main">
      <el-breadcrumb separator="/" class="crumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home/dest?q=' + dest.dest }">{{dest.dest}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{dest.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="sales-info">
        <div class="sales-info-left">
          <h1 data-length="30" class="home-route-title" style="white-space: nowrap; word-wrap: normal;">{{route.name}}</h1>
          <div class="sales-photo">
            <el-carousel>
            <el-carousel-item v-for="(img, index) in route.img_list" :key=index>
              <img :src="getImgUrl(img)">
            </el-carousel-item>
          </el-carousel>
          </div>
        </div>
        <div class="sales-info-right">
          <div class="price-panel clearfix">
             <ul>
               <li class="item-price"><em>￥</em><strong>{{route.price}}</strong> 起/人</li>
            </ul>
          </div>
          <div class="property-panel">
            <dl>
              <dt class="label">选择日期</dt>
              <dd>
                <el-date-picker
                  v-model="beginDate"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </dd>
              <div class="clear-both"></div>
            </dl>
            <dl>
              <dt class="label">数量选择</dt>
              <dd class="count-input">
                <el-input v-model="count" type=number></el-input>
              </dd>
              <div class="clear-both"></div>
            </dl>
            <dl>
              <dt class="label">联系人</dt>
              <dd class="count-input">
                <el-input v-model="username" type=text></el-input>
              </dd>
              <div class="clear-both"></div>
            </dl>
            <dl>
              <dt class="label">联系方式</dt>
              <dd class="count-input">
                <el-input v-model="phone" type=phone></el-input>
              </dd>
              <div class="clear-both"></div>
            </dl>
            <dl>
              <dt class="label">备注</dt>
              <dd class="count-input">
                <el-input v-model="note" type=textarea></el-input>
              </dd>
              <div class="clear-both"></div>
            </dl>
          </div>
          <div class="action-panel clearfix">
             <div class="total">
               <em id="flag_total_price" class="rmb-flag">￥</em><strong id="text_total_price">{{route.price * count}}</strong>
            </div>
            <div class="on-countdown-hide">
              <span class="buy">
                </el-button>
                <a class="btn" v-loading.fullscreen.lock="loading" element-loading-text="创建订单中..." @click="createOrder()">立即购买</a>
              </span>
            </div>
          </div>
        </div>
        <div class="clear-both"></div>
      </div>
      <div class="route-detail main-detail">
        <div class="m-panel">
          <div class="m-hd">
            <h2>产品介绍</h2>
          </div>
          <div class="m-bd" v-html="route.info">
          </div>
          <div class="m-hd">
            <h2>重要提示</h2>
          </div>
          <div class="m-bd" v-html="route.notice">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Core from '../../core/core'

  export default {
    data () {
      return {
        dest: {},
        route: {},
        beginDate: '',
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        count: 1,
        username: Core.Data.getUser().name,
        phone: Core.Data.getUser().phone,
        note: '',
        loading: false
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'refresh'
    },
    methods: {
      createOrder () {
        if (this.count <= 0 || this.beginDate === '') {
          this.$message.error('信息错误或不完整！')
          return
        }
        this.loading = true
        Core.Api.ORDER.createOrder(this.route.id, new Date(this.beginDate).getTime() / 1000, this.count, this.username, this.phone, this.note).then(() => {
          this.loading = false
          this.$message.success('创建订单成功')
          this.$router.push('/home/order')
        }, () => {
          this.loading = false
          this.$message.error('创建订单失败')
        })
      },
      getImgUrl (url) {
        if (url.startsWith('http')) {
          return url
        }
        return Core.Const.NET.IMG_URL + url
      },
      getRouteDetail (id) {
        Core.Api.ROUTE.getRouteDetail(id).then((data) => {
          this.route = data.route
          this.dest = this.route.dest
        }, () => {
          this.$message.error('获取路线失败')
        })
      },
      refresh () {
        this.getRouteDetail(this.$route.params.routeId)
      }
    },
    mounted () {
      this.refresh()
    }
  }
</script>

<style>
  .home-route-detail {
    width: 100%;
    border-bottom: 1px solid #e4e4e4;
  }

  .home-route-title {
    position: relative;
    z-index: 2;
    color: #666;
    font-size: 18px;
    font-weight: bold;
    padding: 4px 0;
  }

  .sales-info {
    margin-bottom: 10px;
    border-bottom: 1px solid #e4e4e4;
  }

  .sales-info-left {
    float: left;
    width: 440px;
  }

  .sales-photo {
    margin-top: 30px;
    margin-bottom: 15px;
    position: relative;
    width: 440px;
    height: 260px;
    overflow: hidden;
  }

  .sales-info-right {
    float: right;
    width: 540px;
  }
  
  .price-panel {
    margin-top: 60px;
    padding: 15px 20px;
    background-color: #f6f6f6;
    font-size: 12px;
    color: #999
  }

  .price-panel li {
    display: inline;
    padding-top: 24px
  }

  .price-panel .item-price {
    padding: 0 15px 0 0
  }

  .price-panel .item-price em,.action-panel .total em {
    font-size: 18px;
    color: #ff6f00;
    font-style: normal
  }

  .price-panel .item-price strong,.action-panel .total strong {
    font-size: 34px;
    color: #ff6f00;
    font-weight: normal
  }
  .property-panel {
    margin-bottom: 25px
  }
  .property-panel dl {
    margin: 15px 0
  }

  .property-panel .label {
    line-height: 28px
  }

  .property-panel dd {
    float: left;
    width: 460px
  }

  .property-panel .label {
    line-height: 36px;
    float: left;
    width: 70px;
    padding-left: 5px;
    color: #999
  }

  .count-input input {
    width: 193px;
  }

  .action-panel {
    margin-bottom: 20px;
    height: 50px;
    background-color: #f6f6f6
  }

  .action-panel .total {
    float: left;
    padding-left: 20px;
    margin-left: 8px
  }

  .action-panel .total strong {
    line-height: 50px
  }

  .action-panel .total-price-ext {
    font-size: 18px;
    position: relative;
    top: -2px;
    margin-left: 8px;
    color: #ff6f00
  }

  .action-panel .buy,.m-book .buy {
    float: right;
    width: 130px
  }

  .action-panel .buy .btn,.m-book .buy .btn {
    display: block;
    height: 50px;
    background-color: #ff9d00;
    font-size: 20px;
    color: #fff;
    border-radius: 1px;
    line-height: 50px;
    text-align: center
  }

  .action-panel .buy .btn:hover,.m-book .buy .btn:hover {
    text-decoration: none;
    background-color: #ff7000
  }
  .m-panel {
    margin-bottom: 50px;
    padding-left: 25px;
    color: #333
  }

  .main-detail .m-hd {
    margin-top: 25px;
    margin-bottom: 25px;
  }

  .main-detail .m-hd h2 {
    font-size: 24px;
    font-weight: normal;
    line-height: 30px
  }

  .main-detail .m-hd h2:before {
    content: '';
    float: left;
    margin: 3px 0 0 -25px;
    width: 5px;
    height: 24px;
    background-color: #ff9f00
  }

  .main-detail .m-hd p {
    margin-top: 10px;
    line-height: 20px
  }

  .main-detail .m-bd {
    line-height: 1.8
  }

  .main-detail .m-bd>p {
    font-size: 14px;
    margin: 20px 0
  }
</style>
