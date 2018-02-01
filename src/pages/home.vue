<template>
  <el-container class="home">
    <el-header class="homeHeader">
      <Header :title="title"></Header>
    </el-header>
    <el-main>
      <div v-for="(message, index) in messageList" :key="index" @click.once="detailHandle(message._id)">
        <Posts :message="message" @getPostList="showList"></Posts>
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
          content: '',
          create_at: '2017-12-25',
          pv: '1',
          commentsCount: '0'
        },
        title: {
          title: 'myblog',
          subTitle: 'my first blog'
        }
      }
    },
    methods: {
      showList () {
        let vm = this
        // 特定用户的文章
        let userId = vm.$route.params.id || ''
        $axios.get(`/api/posts?author=${userId}`).then(function (res) {
          if (res.data.status === 'success') {
            vm.messageList = res.data.posts
          }
        })
      },
      detailHandle (id) {
        this.$router.push(`/detail/${id}`)
        $axios.get(`/api/posts/${id}`).then((res) => {
          if (res.data.status === 'success') {
            this.messageList = []
            this.messageList.push(res.data.post)
          } else {
            this.$message({
              type: 'error',
              massage: res.data.message
            })
          }
        })
      }
    },
    created () {
      if (this.$route.path.indexOf('detail') < 0) {
        this.showList()
      } else {
        this.detailHandle(this.$route.params.id)
      }
    },
    watch: {
      // 监听路由变化，区分详情页和列表页
      '$route' (to, from) {
        // 对路由变化作出响应...
        if (to.path === '/' || to.path.indexOf('home') > -1) {
          this.showList()
        } else if (to.path.indexOf('detail') > -1) {
          this.detailHandle(this.$route.params.id)
        }
      }
    }
  }
</script>
<style>
  .home .homeHeader {
    margin-bottom: 50px
  }
</style>
