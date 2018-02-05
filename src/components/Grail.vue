<template>
  <el-container class="home">
    <el-header class="homeHeader">
      <Header></Header>
    </el-header>
    <el-main>
      <el-scrollbar wrap-style="height:800px;">
        <slot></slot>
      </el-scrollbar>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script type="text/babel">
  import Header from './Header'
  import Footer from './footer'
  export default {
    name: 'sGrail',
    data () {
      return {
      }
    },
    components: {
      'Header': Header,
      'Footer': Footer
    }
  }
</script>
<style>
  .home .homeHeader {
    margin-bottom: 50px;
  }
</style>
