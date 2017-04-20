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
          <div class="sales-photo">
            <el-carousel>
            <el-carousel-item v-for="(item, index) in route.img" :key=index>
              <img :src="item">
            </el-carousel-item>
          </el-carousel>
          </div>
        </div>
        <div class="sales-info-right">
          <h1 data-length="30" class="home-route-title" style="white-space: nowrap; word-wrap: normal;">{{route.name}}</h1>
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
  import Core from '../../../core/core'

  export default {
    data () {
      return {
        dest: {
          name: '嗨玩苏梅 | 在苏梅岛自由行，我们玩什么？',
          info: '提到苏梅岛，大多数人都会被她原始的自然风貌所吸引。蔚蓝绵长的海岸，拍打在金色沙滩上的海浪，中部原始茂密的丛林，或喧闹、或恬静、或浪漫、或休闲的特色沙滩，几乎能满足所有人对于海岛度假的需要。不同于普吉岛的熙熙攘攘，苏梅岛的游客以欧美为主。纯净、小众、浪漫、休闲，是苏梅岛的代名词。如何在苏梅岛玩出花样，哪些又是苏梅岛不可错过的必玩体验呢？接下来听我说~',
          intro: '苏梅本岛中部山区地势很高，路窄坡陡弯急，加上泰国当地人开车普遍很快，导致很多人戏谑在苏梅岛开车像头文字D一样，没有藤原拓海的技术，开车是很危险的。这样一来，想在当地游览全岛，最适合的方式是越野车环岛一日游，没有之一！',
          dest: '苏梅岛',
          img: ['http://n4-q.mafengwo.net/s10/M00/FF/C0/wKgBZ1ihWnCATXuuABm_rpiQPpo92.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90%7Cwatermark%2F1%2Fimage%2FaHR0cDovL24xLXEubWFmZW5nd28ubmV0L3MxMC9NMDAvMDgvQjkvd0tnQloxaDExQ0tBRjRUeEFBQXYzcVNMWmRvOTA4LnBuZz9pbWFnZU1vZ3IyJTJGdGh1bWJuYWlsJTJGMzYweCUyRnF1YWxpdHklMkY5MA%3D%3D%2Fgravity%2FSouthEast%2Fdx%2F10%2Fdy%2F15%2Fdissolve%2F40',
            'http://a4-q.mafengwo.net/s5/M00/2D/CF/wKgB3FYsab2APVw0AA_8X0NfPY898.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90%7Cwatermark%2F1%2Fimage%2FaHR0cDovL24xLXEubWFmZW5nd28ubmV0L3MxMC9NMDAvMDgvQjkvd0tnQloxaDExQ0tBRjRUeEFBQXYzcVNMWmRvOTA4LnBuZz9pbWFnZU1vZ3IyJTJGdGh1bWJuYWlsJTJGMzYweCUyRnF1YWxpdHklMkY5MA%3D%3D%2Fgravity%2FSouthEast%2Fdx%2F10%2Fdy%2F15%2Fdissolve%2F40',
            'http://n4-q.mafengwo.net/s10/M00/0B/F2/wKgBZ1ihY_CAbaX9AAIUNq6ru7866.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90%7Cwatermark%2F1%2Fimage%2FaHR0cDovL24xLXEubWFmZW5nd28ubmV0L3MxMC9NMDAvMDgvQjkvd0tnQloxaDExQ0tBRjRUeEFBQXYzcVNMWmRvOTA4LnBuZz9pbWFnZU1vZ3IyJTJGdGh1bWJuYWlsJTJGMzM4eCUyRnF1YWxpdHklMkY5MA%3D%3D%2Fgravity%2FSouthEast%2Fdx%2F10%2Fdy%2F15%2Fdissolve%2F40',
            'http://a1-q.mafengwo.net/s9/M00/48/BE/wKgBs1b83maAWLO7AAP3Ls_4uOQ457.png?imageView2%2F2%2Fw%2F1360%2Fq%2F90%7Cwatermark%2F1%2Fimage%2FaHR0cDovL24xLXEubWFmZW5nd28ubmV0L3MxMC9NMDAvMDgvQjkvd0tnQloxaDExQ0tBRjRUeEFBQXYzcVNMWmRvOTA4LnBuZz9pbWFnZU1vZ3IyJTJGdGh1bWJuYWlsJTJGMTY5eCUyRnF1YWxpdHklMkY5MA%3D%3D%2Fgravity%2FSouthEast%2Fdx%2F10%2Fdy%2F15%2Fdissolve%2F40']
        },
        route: {
          name: '为所欲为第一站——去苏梅晒出小麦色！（清迈-苏梅-涛岛-满月趴）',
          intro: '旅行的最初印象源自小时候看的中央台的正大综艺，跟着节目一起周游世界，带着童年时期无限放飞的想象力。从那时起，再被问长大想做什么，我的回答就变成了，外景主持（虽然并没有实现）。风格迥异的街道乡野，形形色色的陌生人，充满新奇的食物，那些精彩或是感动的瞬间，...',
          img: [
            'http://b2-q.mafengwo.net/s10/M00/CC/69/wKgBZ1jsjKOAFAnfAAf9t32VNSE877.png?imageMogr2%2Fthumbnail%2F%21440x260r%2Fgravity%2FCenter%2Fcrop%2F%21440x260%2Fquality%2F100',
            'http://c3-q.mafengwo.net/s10/M00/CC/77/wKgBZ1jsjKyASN2_AAsWu_SIy1s423.png?imageMogr2%2Fthumbnail%2F%21440x260r%2Fgravity%2FCenter%2Fcrop%2F%21440x260%2Fquality%2F100',
            'http://b3-q.mafengwo.net/s9/M00/EA/85/wKgBs1gTkgWATDpOAArOLkZ0hW849.jpeg?imageView2%2F2%2Fw%2F300%2Fh%2F5000%2Fq%2F90',
            'https://b3-q.mafengwo.net/s9/M00/E4/55/wKgBs1gTeVeAaXkiAAzvmp-Deuw20.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90'],
          price: '1000',
          info: '此航班仅供参考，对应的航班时间均为当地时间，低价折扣机票存在航班调整的可能（包括航空公司、航班号、起飞时间的变化等），故机票情况以最终电子客票为准。<p><strong>费用包含</strong></P><p>1. 交通：重庆直飞甲米6天往返经济舱机票，甲米-苏梅岛往返车船联运。</P><p>2. 酒店：1晚甲米市区酒店+4晚苏梅岛海边度假酒店（酒店标准）。</P><p>3. 早餐：酒店自助早餐。</p>',
          notice: '退改政策:此产品为二次确认产品，库存确认成功后不得变更、不得退款，敬请谅解。',
          update_time: '2017-04-20',
          dest_id: 1,
          id: 1
        },
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
    methods: {
      createOrder () {
        if (this.count <= 0 || this.beginDate === '') {
          this.$message.error('信息错误或不完整！')
          return
        }
        this.loading = true
        setTimeout(() => { // mock network
          this.loading = false
          this.$router.push('/home/order')
        }, 3000)
      }
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
    margin-bottom: 25px
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
