<template>
  <div class="home-route-list">
    <div class="home-dest-header"></div>
    <div class="home-route-main">
      <el-breadcrumb separator="/" class="crumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home/dest?q=' + dest.dest }">{{dest.dest}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{dest.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="home-route-dest">
        <el-carousel type="card" class="home-dest-carousel">
          <el-carousel-item v-for="(item, index) in dest.img" :key=index>
            <img :src="item">
          </el-carousel-item>
        </el-carousel>
        <p class="home-route-dest-info"> <i class="mark"></i>{{dest.info}}</p>
      </div>
      <div class="home-route-list">
        <div class="home-route-item" v-for="(item, index) in routeList" :key=index>
          <div class="route-item-img">
            <router-link :to="{path: '/home/route/'+item.dest_id+'/'+item.id}" target="_blank">
                <img :src="item.img" style="display: inline;">
             </router-link>
          </div>
          <div class="route-item-text">
            <dl>
                <dt>
                  <router-link :to="{path: '/home/route/'+item.dest_id+'/'+item.id}" target="_blank">{{item.name}}</router-link>
                </dt>
                <dd><router-link :to="{path: '/home/route/'+item.dest_id+'/'+item.id}" target="_blank">{{item.intro}}</router-link></dd>
            </dl>
            <div class="route-item-extra">
                <span class="route-item-time">{{item.update_time}}</span>
                <div class="route-item-price">
                  <i>¥</i><em>{{item.price}}</em>起 
                </div>
            </div>
          </div>
        </div>
      </div>
      <el-pagination class="home-route-paination" @current-change="handleCurrentChange" small layout="total, prev, pager, next" :total="total" :current-page="currentPage"></el-pagination>
    </div>
  </div>
</template>

<script>
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
        routeList: [
          {
            name: '为所欲为第一站——去苏梅晒出小麦色！（清迈-苏梅-涛岛-满月趴）',
            intro: '旅行的最初印象源自小时候看的中央台的正大综艺，跟着节目一起周游世界，带着童年时期无限放飞的想象力。从那时起，再被问长大想做什么，我的回答就变成了，外景主持（虽然并没有实现）。风格迥异的街道乡野，形形色色的陌生人，充满新奇的食物，那些精彩或是感动的瞬间，...',
            img: 'http://b3-q.mafengwo.net/s9/M00/EA/85/wKgBs1gTkgWATDpOAArOLkZ0hW849.jpeg?imageView2%2F2%2Fw%2F300%2Fh%2F5000%2Fq%2F90',
            price: '1000',
            update_time: '2017-04-20',
            dest_id: 1,
            id: 1
          },
          {
            name: '·深度游帕岸岛＋苏梅岛（满月派对、黑月派对、南园岛、涛岛浮潜、洞穴探险）',
            intro: '2015年的中秋国庆，大树问我想去哪里，我说帕安岛。2016年的国庆，我问大树想去哪里，他说帕安岛。所以，我们连续两年都去了帕安岛+苏梅岛。2015年，3天帕岸岛+7天苏梅岛。2016年， 7天帕岸岛+ 3天苏梅岛。在那里疯狂了，发呆了，深深地爱上了这座还保留着原始的海岛。',
            img: 'http://c2-q.mafengwo.net/s9/M00/E4/29/wKgBs1hRQcuAeRxjAAdm2uxR-oY99.jpeg?imageMogr2%2Fthumbnail%2F%21250x185r%2Fgravity%2FCenter%2Fcrop%2F%21250x185%2Fquality%2F90',
            price: '1200',
            update_time: '2017-04-20',
            dest_id: 1,
            id: 1
          },
          {
            name: '·7天苏梅岛-卡丁车-帕岸岛-“电音派对”Full Moon Party',
            intro: '听说帕岸岛有毕生必去的三大电音狂野派对之一的“Full moon party”，顿时心动，帕岸岛紧连着的是苏梅岛，苏梅岛是全国第三大岛，优美迷人的亚热带风光、广博的佛教文化、独有的民间风俗，经过一轮热烈的讨论后，决定6人一同前行',
            img: 'http://b1-q.mafengwo.net/s9/M00/4E/1B/wKgBs1f95d6AXpVUAAy8zaIHnkA66.jpeg?imageMogr2%2Fthumbnail%2F%21250x185r%2Fgravity%2FCenter%2Fcrop%2F%21250x185%2Fquality%2F90',
            price: '1800',
            update_time: '2017-04-20',
            dest_id: 1,
            id: 1
          }
        ],
        currentPage: 1,
        total: 50
      }
    },
    methods: {
      handleCurrentChange (page) {
        // 分页请求
        this.currentPage = page
        console.log(`当前页: ${page}`)
      }
    }
  }
</script>

<style>
  .home-route-list {
    width: 100%;
    border-bottom: 1px solid #e4e4e4;
  }

  .home-route-main {
    position: relative;
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
    font-size: 13px;
    margin-bottom: 20px;
  }

  .crumb {
    margin: 15px 0 20px;
    font-size: 14px;
    color: #333;
    line-height: 20px;
  }

  .crumb a:hover {
    color: #ff9d00;
  }

  .home-dest-carousel {
    display: block;
  }

  .home-dest-carousel img {
    width: 480px;
    height: auto;
  }

  .home-route-dest-info {
    font-size: 16px;
    color: #333;
    line-height: 26px;
  }

  .home-route-dest {
    border-top: 1px solid #e4e4e4;
    padding: 20px 0;
    border-bottom: 1px solid #e4e4e4;
  }

  .mark {
    width: 21px;
    height: 18px;
    background: url(../../assets/list_sprites7.png) no-repeat -72px 0;
    display: inline-block;
    margin-right: 13px;
  }

  .home-route-item {
    padding: 15px 0;
    height: 150px;
  }
  .home-route-item dl {
    height: 117px;
  }
  .home-route-item dt {
    height: 26px;
    margin-bottom: 10px;
    font-size: 18px;
    line-height: 26px;
  }

  .home-route-item dd {
    height: 60px;
    line-height: 20px;
    font-size: 14px;
    overflow: hidden;
  }

  .route-item-img {
    float: left;
    width: 220px;
    height: 150px;
    overflow: hidden;
    position: relative;
  }
  
  .route-item-img img {
    width: 220px;
    height: 150px;
    border: 0;
    vertical-align: middle;
  }

  .route-item-text {
    float: right;
    width: 758px;
    height: 150px;
  }

  .route-item-text dt a {
    width: 420px;
    height: 26px;
    display: block;
    color: #333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .route-item-text dd a {
    color: #666;
  }

  .home-route-item:hover dt a {
    color: #ff9d00;
    text-decoration: none;
  }

  .route-item-extra {
    height: 33px;
    overflow: hidden;
    line-height: 33px;
  }

  .route-item-time {
    font-size: 14px;
    color: #999;
    float: left;
  }

  .route-item-price {
    display: block;
    margin-bottom: 4px;
    margin-top: 2px;
    float: right;
    color: #666;
    margin-right: 10px;
  }

  .route-item-price i {
    color: #f60;
  }
  .route-item-price i em {
    font-style: normal;
  }
  .route-item-price em {
    font-size: 24px;
    color: #f60;
    margin-right: 2px;
  }
  .home-route-paination {
    margin: 10px 0;
  }
</style>
