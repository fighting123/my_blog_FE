<template>
  <el-container class="detail">
    <el-header class="detailHeader">
      <Header></Header>
    </el-header>
    <el-main>
      <Posts :message="message" @getOnePost="showOnePost"></Posts>
    </el-main>
  </el-container>
</template>
<script>
  import Posts from '../components/Posts.vue'
  import Header from '../components/Header.vue'
  export default {
    components: {
      Posts,
      Header
    },
    data () {
      return {
        messageList: [],
        message: {
          author: {
            imgSrc: '../../static/test.png'
          },
          title: 'title',
          content: '',
          create_at: '2017-12-25',
          pv: '1',
          commentsCount: '0'
        }
      }
    },
    methods: {
      showOnePost (post) {
        let vm = this
        vm.messageList = []
        vm.messageList.push(post)
        console.log(post)
      }
    },
    created () {
      // this.showList()
    },
    watch: {
      // 监听路由变化，区分详情页和列表页
      '$route' (to, from) {
        // 对路由变化作出响应...
        if (to.path === '/') {
          this.showList()
        }
      }
    }
  }
</script>
<style>
  .detail .detailHeader {
    margin-bottom: 50px
  }
</style>
