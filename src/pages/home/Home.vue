<template>
  <div class="home">
    <home-header></home-header>
    <home-content></home-content>
    <home-footer></home-footer>
  </div>
</template>

<script>
  import HomeHeader from '../../layout/home/Header'
  import HomeContent from '../../layout/home/Content'
  import HomeFooter from '../../layout/home/Footer'

  export default {
    components: {
      'home-header': HomeHeader,
      'home-content': HomeContent,
      'home-footer': HomeFooter
    },
    name: 'home',
    data () {
      return {
      }
    }
  }
</script>

<style>
  .home {
    position: relative
  }
</style>
