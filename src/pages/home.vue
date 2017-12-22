<template>
  <el-container class="home">
    <el-header class="homeHeader">
      <Header :title="title"></Header>
    </el-header>
    <el-main>
      <div v-for="(message, index) in messageList" :key="index">
        <Posts :message="message" @getOnePost="showOnePost" @getPostList="showList"></Posts>
      </div>
    </el-main>
  </el-container>
</template>
<script>
  import Posts from '../components/Posts.vue'
  import Header from '../components/Header.vue'
  import $axios from '@/plugins/ajax'
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
          content: 'content../components/</br>Posts.vue../components/Posts.vue../comp</br>onents/Posts.vue../co</br>mponents/Posts.vue../components/Posts.vue',
          create_at: '2017-12-25',
          pv: '1',
          words: '222222'
        },
        title: {
          title: 'myblog',
          subTitle: 'my first blog'
        }
      }
    },
    methods: {
      showOnePost (post) {
        let vm = this
        vm.messageList = []
        vm.messageList.push(post)
      },
      showList () {
        let vm = this
        $axios.get('/api/posts').then(function (res) {
          if (res.data.status === 'success') {
            vm.messageList = res.data.posts
          }
        })
      }
    },
    created () {
      this.showList()
    }
  }
</script>
<style>
  .home .homeHeader {
    margin-bottom: 50px
  }
</style>
