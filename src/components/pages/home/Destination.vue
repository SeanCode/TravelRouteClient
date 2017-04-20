<template>
  <div class="home-dest">
    <div class="home-dest-header">
      <div class="home-dest-header-wrap">
        <div class="searchbar searchbar-dest">
          <div class="search-wrapper">
            <div class="search-input"><input name="query" type="text" v-model="q" placeholder="搜目的地" autocomplete="off">
            </div>
          </div>
          <div class="search-button"><a role="button" @click="search(q)"><i class="icon-search"></i></a>
          </div>
        </div>
      </div>
    </div>
    <div class="home-dest-main">
      <p class="home-dest-search-info">以下是为您找到的“{{query}}”相关结果</p>
      <div class="search-title">
        {{query}}
      </div>
      <div class="search-list">
        <ul>
          <li v-for="item in destList">
            <div class="search-item-pic">
              <img :src="item.img">
            </div>
            <div class="search-item-text">
              <h3><router-link :to="{path: '/home/route/'+item.id }">{{item.name}}</router-link></h3>
              <p class="search-item-desc">{{item.intro}}</p>
              <p class="search-item-time">{{item.time}}</p>
            </div>
            <div class="clear-both"></div>
          </li>
        </ul>
      </div>
      <div class="search-divider"></div>
      <el-pagination @current-change="handleCurrentChange" small layout="total, prev, pager, next" :total="total" :current-page="currentPage"></el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        q: '',
        query: '',
        destList: [
          {
            id: 1,
            name: '泰国6日游(玩遍这些才算来过)',
            intro: '舒缓压力，也可以感受普吉岛疯狂的夜生活，还可以潜入水下与海洋的精灵们亲密接触，同时，你也可以看场独具泰国特色的表演，...',
            info: '舒缓压力，也可以感受普吉岛疯狂的夜生活，还可以潜入水下与海洋的精灵们亲密接触，同时，你也可以看场独具泰国特色的表演，...',
            dest: '泰国',
            img: 'http://n3-q.mafengwo.net/s8/M00/0D/C0/wKgBpVYqFtOAF0maAAu81_RSAtI65.jpeg?imageMogr2%2Fthumbnail%2F%21300x180r%2Fgravity%2FCenter%2Fcrop%2F%21300x180%2Fquality%2F90',
            time: '2017-04-20'
          },
          {
            id: 2,
            name: '泰国6日游(玩遍这些才算来过)',
            intro: '舒缓压力，也可以感受普吉岛疯狂的夜生活，还可以潜入水下与海洋的精灵们亲密接触，同时，你也可以看场独具泰国特色的表演，...',
            info: '舒缓压力，也可以感受普吉岛疯狂的夜生活，还可以潜入水下与海洋的精灵们亲密接触，同时，你也可以看场独具泰国特色的表演，...',
            dest: '泰国',
            img: 'http://n3-q.mafengwo.net/s8/M00/0D/C0/wKgBpVYqFtOAF0maAAu81_RSAtI65.jpeg?imageMogr2%2Fthumbnail%2F%21300x180r%2Fgravity%2FCenter%2Fcrop%2F%21300x180%2Fquality%2F90',
            time: '2017-04-20'
          },
          {
            id: 3,
            name: '泰国6日游(玩遍这些才算来过)',
            intro: '舒缓压力，也可以感受普吉岛疯狂的夜生活，还可以潜入水下与海洋的精灵们亲密接触，同时，你也可以看场独具泰国特色的表演，...',
            info: '舒缓压力，也可以感受普吉岛疯狂的夜生活，还可以潜入水下与海洋的精灵们亲密接触，同时，你也可以看场独具泰国特色的表演，...',
            dest: '泰国',
            img: 'http://n3-q.mafengwo.net/s8/M00/0D/C0/wKgBpVYqFtOAF0maAAu81_RSAtI65.jpeg?imageMogr2%2Fthumbnail%2F%21300x180r%2Fgravity%2FCenter%2Fcrop%2F%21300x180%2Fquality%2F90',
            time: '2017-04-20'
          },
          {
            name: '泰国6日游(玩遍这些才算来过)',
            intro: '舒缓压力，也可以感受普吉岛疯狂的夜生活，还可以潜入水下与海洋的精灵们亲密接触，同时，你也可以看场独具泰国特色的表演，...',
            info: '舒缓压力，也可以感受普吉岛疯狂的夜生活，还可以潜入水下与海洋的精灵们亲密接触，同时，你也可以看场独具泰国特色的表演，...',
            dest: '泰国',
            img: 'http://n3-q.mafengwo.net/s8/M00/0D/C0/wKgBpVYqFtOAF0maAAu81_RSAtI65.jpeg?imageMogr2%2Fthumbnail%2F%21300x180r%2Fgravity%2FCenter%2Fcrop%2F%21300x180%2Fquality%2F90',
            time: '2017-04-20'
          },
          {
            id: 4,
            name: '泰国6日游(玩遍这些才算来过)',
            intro: '舒缓压力，也可以感受普吉岛疯狂的夜生活，还可以潜入水下与海洋的精灵们亲密接触，同时，你也可以看场独具泰国特色的表演，...',
            info: '舒缓压力，也可以感受普吉岛疯狂的夜生活，还可以潜入水下与海洋的精灵们亲密接触，同时，你也可以看场独具泰国特色的表演，...',
            dest: '泰国',
            img: 'http://n3-q.mafengwo.net/s8/M00/0D/C0/wKgBpVYqFtOAF0maAAu81_RSAtI65.jpeg?imageMogr2%2Fthumbnail%2F%21300x180r%2Fgravity%2FCenter%2Fcrop%2F%21300x180%2Fquality%2F90',
            time: '2017-04-20'
          },
          {
            id: 5,
            name: '泰国6日游(玩遍这些才算来过)',
            intro: '舒缓压力，也可以感受普吉岛疯狂的夜生活，还可以潜入水下与海洋的精灵们亲密接触，同时，你也可以看场独具泰国特色的表演，...',
            info: '舒缓压力，也可以感受普吉岛疯狂的夜生活，还可以潜入水下与海洋的精灵们亲密接触，同时，你也可以看场独具泰国特色的表演，...',
            dest: '泰国',
            img: 'http://n3-q.mafengwo.net/s8/M00/0D/C0/wKgBpVYqFtOAF0maAAu81_RSAtI65.jpeg?imageMogr2%2Fthumbnail%2F%21300x180r%2Fgravity%2FCenter%2Fcrop%2F%21300x180%2Fquality%2F90',
            time: '2017-04-20'
          }
        ],
        currentPage: 1,
        total: 50
      }
    },
    methods: {
      search (q) { //  重新搜索并且将本页push到浏览器记录
        this.$router.push('/home/dest?q=' + q)
        this.query = q
        // network
      },
      handleCurrentChange (page) { // 分页请求
        this.currentPage = page
        console.log(`当前页: ${page}`)
      }
    },
    mounted () {
      this.query = this.q = this.$route.query.q
    }
  }
</script>

<style>
  .home-dest {
    width: 100%;
  }

  .home-dest-header {
    width: 100%;
    background-color: #3c3c3c;
    height: 58px;
  }

  .home-dest-header-wrap {
    width: 90%;
    max-width: 1000px;
    margin: auto;
  }

  .searchbar-dest {
    margin: 11px 0 11px 100px;
  }
  .searchbar {
    position: relativere;
    z-index: 100;
    float: left;
    width: 400px;
    height: 36px;
  }

  .search-wrapper {
    float: left;
    width: 356px;
    position: relative;
  }

  .search-wrapper .search-keyword-tip {
    display: none;
    position: absolute;
    top: 0;
    font-size: 14px;
    line-height: 36px;
    color: #999;
  }

  .searchbar .search-input {
    height: 36px;
    overflow: hidden;
  }

  .searchbar .search-input input {
    width: 326px;
    height: 36px;
    border: 0 none;
    padding: 0 10px 0 20px;
    margin: 0;
    line-height: 36px;
    font-size: 14px;
    color: #666;
    border-radius: 4px;
  }

  .searchbar .search-button {
    float: left;
    margin-left: 4px;
    width: 40px;
    height: 36px;
  }

  .searchbar .search-button a {
    display: block;
    height: 36px;
    background-color: #ff9d00;
    border-radius: 4px;
    text-align: center;
  }

  .searchbar .search-button a:hover {
    background-color: #ff8a00;
  }

  .searchbar .icon-search {
    display: inline-block;
    margin-top: 6px;
    width: 24px;
    height: 24px;
    background-image: url(../../../assets/header-sprites3.png);
    background-position: 0 -110px!important;
    overflow: hidden;
    vertical-align: top;
  }

  .home-dest-main {
    position: relative;
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
    font-size: 13px;
    margin-bottom: 20px;
  }

  .home-dest-search-info {
    margin: 20px 0;
    font-size: 12px;
    color: #999;
  }

  .search-list {
    width: 600px;
    overflow: hidden;
  }

  .search-list ul li:first-child {
    margin-top: 10px;
  }
  .search-list ul li {
    margin-top: 30px;
  }

  .search-title {
    font-size: 18px;
    line-height: 30px;
    font-weight: bold;
    color: #333!important;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 10px;
  }

  .search-item-pic {
    float: left;
  }

  .search-item-pic img {   
    border: 0;
    vertical-align: middle;
    width: 150px;
    height: 90px;
  }

  .search-item-text {
    padding-left: 160px;
  }
  .search-item-text h3 a {
    font-size: 18px;
    text-decoration: none;
    cursor: pointer;
    color: #333;
  }
  .search-item-text h3 a:hover {
      color: #ff9d00;
  }
  .search-item-desc {
    max-height: 40px;
    margin-bottom: 4px;
    overflow: hidden;
  }
  .clear-both {
    clear: both
  }
  .search-item-time {
    font-size: 12px;
    color: #999;
  }
  .search-divider {
    height: 40px;
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 10px;
  }
</style>
