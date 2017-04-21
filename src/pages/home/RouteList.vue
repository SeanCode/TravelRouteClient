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
          <el-carousel-item v-for="(item, index) in dest.img_list" :key=index>
            <img :src="getImgUrl(item)">
          </el-carousel-item>
        </el-carousel>
        <p class="home-route-dest-info"> <i class="mark"></i>{{dest.info}}</p>
      </div>
      <div class="home-route-list">
        <div class="home-route-item" v-for="(item, index) in routeList" :key=index>
          <div class="route-item-img">
            <router-link :to="{path: '/home/route/'+item.dest_id+'/'+item.id}" target="_blank">
                <img :src="getImgUrl(item.img)" style="display: inline;">
             </router-link>
          </div>
          <div class="route-item-text">
            <dl>
                <dt>
                  <router-link :to="{path: '/home/route/'+item.dest_id+'/'+item.id}" target="_blank" v-html="item.name"></router-link>
                </dt>
                <dd><router-link :to="{path: '/home/route/'+item.dest_id+'/'+item.id}" target="_blank" v-html="item.intro"></router-link></dd>
            </dl>
            <div class="route-item-extra">
                <span class="route-item-time">{{item.update_time_formatted}}</span>
                <div class="route-item-price">
                  <i>¥</i><em>{{item.price}}</em>起 
                </div>
            </div>
            <div class="clear-both"></div>
          </div>
        </div>
      </div>
      <el-pagination class="home-route-paination" @current-change="handleCurrentChange" small layout="total, prev, pager, next" :total="total" :current-page="currentPage"></el-pagination>
    </div>
  </div>
</template>

<script>
  import Core from '@/core/core'

  export default {
    data () {
      return {
        destId: 0,
        dest: {},
        routeList: [],
        currentPage: 1,
        total: 0
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'refresh'
    },
    methods: {
      handleCurrentChange (page) {
        // 分页请求
        this.currentPage = page
        console.log(`当前页: ${page}`)
      },
      getDestDetail () {
        Core.Api.DESTINATION.getDestDetail(this.destId).then((data) => {
          this.dest = data.dest
        }, (error) => {
          this.$message.error('获取目的地失败：' + error.message)
        })
      },
      getRouteList (page) {
        Core.Api.ROUTE.getRouteList(this.destId, page - 1).then((data) => {
          this.routeList = data.route_list
          this.currentPage = data.number + 1
          this.total = data.totalElements
        }, (error) => {
          this.$message.error('获取列表失败: ' + error.message)
        })
      },
      refresh () {
        this.destId = this.$route.params.destId
        this.getDestDetail()
        this.getRouteList(1)
      },
      getImgUrl (url) {
        console.log(url)
        if (url.startsWith('http')) {
          return url
        }
        return Core.Const.NET.IMG_URL + url
      }
    },
    mounted () {
      this.refresh()
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
    margin-right: 20px;
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
    width: auto;
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
