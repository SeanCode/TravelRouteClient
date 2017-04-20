<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
    		<router-view></router-view>
    	</transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Consolas', '苹方', 'Avenir', Helvetica, Arial, sans-serif;
  margin: 0 auto;
}
html,body,#app,.wrapper{
    width:100%;
    height:100%;
}
body {
  position: relative;
  margin: 0;
}
a {
    outline: none;
    background-color: transparent;
    text-decoration: none;
    cursor: pointer;
}
h1,h2,h3,h4,h5,h6,p,dl,dt,dd {
    margin: 0
}

h1,h2,h3,h4,h5,h6 {
    margin: 0;
    padding: 0;
    font-size: 100%
}

ul,ol,li,dl,dd,dt {
    margin: 0;
    padding: 0;
    list-style: none;
}
</style>
