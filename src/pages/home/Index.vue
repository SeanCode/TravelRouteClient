<template>
  <div class="home-index">
    <div class="home-focus">
      <div class="show-banner">
        <div class="cover">
          <div class="bigimg">
            <div class="shade"></div>
            <img src="../../assets/bg1.jpg" style="margin: 0; width: 100%; height: auto;">
          </div>
        </div>
        <div class="show-shadow"></div>
      </div>
      <div class="place-search-panel place-search-panel-sm">
            <h2>Don't fear the unknown</h2>
            <div class="searchbar">
              <input autocomplete="off" class="search-input" type="text" name="q" placeholder="我想去...">
              <a class="search-button" href="#" data-cs-l="搜索" role="button"><i class="icon-search"></i></a>
            </div>
            <div class="search-suggest-panel search-suggest-place hide">
              <ul class="suggest-list">
              </ul>
            </div>
            <div class="place-search-hot">
              <router-link :to="{ path: 'dest', query: { q: '泰国' }}">泰国</router-link>
              <router-link :to="{ path: 'dest', query: { q: '首尔' }}">首尔</router-link>
              <router-link :to="{ path: 'dest', query: { q: '重庆' }}">重庆</router-link>
              <router-link :to="{ path: 'dest', query: { q: '南京' }}">南京</router-link>
              <router-link :to="{ path: 'dest', query: { q: '云南' }}">云南</router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<style>
  .home-index {
    display: block;
  }

  .home-focus {
    position: relative;
  }

  .show-banner {
    position: relative;
    width: 100%;
    *zoom:1;overflow: hidden;
  }

  .show-banner .cover {
    background: #ccc;
    height: auto;
  }

  .show-banner .cover .bigimg {
    display: grid;
    position: relative;
    overflow: hidden;
  }

  .bigimg img {
    max-height: 785px;
    overflow: hidden;
  }

  .bigimg .shade {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
  }

  .show-shadow {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 12px 20px 0;
    height: 57px;
    line-height: 56px;
    font-size: 24px;
    font-weight: normal;
    background: -moz-linear-gradient(top,rgba(0,0,0,0) 10px,rgba(0,0,0,0.2) 50%,rgba(0,0,0,0.5) 100%);
    background: -webkit-gradient(linear,left top,left bottom,color-stop(15%,rgba(0,0,0,0)),color-stop(50%,rgba(0,0,0,0.2)),color-stop(100%,rgba(0,0,0,0.5)));
    background: -webkit-linear-gradient(top,rgba(0,0,0,0) 10px,rgba(0,0,0,0.2) 50%,rgba(0,0,0,0.4) 100%);
    background: -o-linear-gradient(top,rgba(0,0,0,0) 10px,rgba(0,0,0,0.2) 50%,rgba(0,0,0,0.5) 100%);
    background: -ms-linear-gradient(top,rgba(0,0,0,0) 10px,rgba(0,0,0,0.2) 50%,rgba(0,0,0,0.5) 100%);
    background: linear-gradient(to bottom,rgba(0,0,0,0) 10px,rgba(0,0,0,0.2) 50%,rgba(0,0,0,0.5) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000',endColorstr='#99000000',GradientType=0);
    -webkit-transition: opacity .5s ease 0s;
    transition: opacity .5s ease 0s;
  }

  .place-search-panel {
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 50%;
    margin: -71px 0 0 -500px;
    width: 400px;
    padding: 15px;
    background-color: #000;
    background-color: rgba(0,0,0,.4);
    border-radius: 4px;
  }

  .place-search-panel h2 {
    font-size: 20px;
    color: #fff;
    margin-bottom: 15px;
    font-weight: normal;
    line-height: 1;
  }

  .place-search-panel .searchbar {
    height: 46px;
  }

  .place-search-panel .search-input {
    float: left;
    width: 308px;
    height: 46px;
    margin: 0 6px 0 0;
    padding: 0 20px;
    background-color: #fff;
    border: 0 none;
    line-height: 46px;
    font-size: 18px;
    color: #111;
    border-radius: 4px;
  }

  .place-search-panel .search-button {
    float: left;
    width: 45px;
    height: 46px;
    background-color: #ff9d00;
    border-radius: 4px;
    text-align: center;
  }

  .place-search-panel .search-button:hover {
    background-color: #ff8d00;
  }

  .place-search-panel .icon-search {
    display: inline-block;
    margin-top: 11px;
    width: 24px;
    height: 24px;
    background: url(../../assets/header-sprites.png) no-repeat 0 -110px;
    overflow: hidden;
    vertical-align: top;
  }

  .place-search-hot {
    font-size: 14px;
    margin-top: 15px;
    line-height: 16px;
  }

  .place-search-hot a {
    margin-right: 10px;
    color: #fff;
  }
  .place-search-hot a:hover {
    color: #ff9d00;
  }

  .search-suggest-place .active, .search-suggest-place li:hover, .search-suggest-place .active b, .search-suggest-place li:hover b {
    color: #ff9d00;
  }
</style>

<script>

</script>
