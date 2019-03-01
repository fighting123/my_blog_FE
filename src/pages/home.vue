<template>
  <Grail>
    <div v-for="(message, index) in messageList" :key="index" @click.once="detailHandle(message._id)">
      <Posts :message="message" @getPostList="showList"></Posts>
    </div>
    <el-pagination
      v-if="showHome"
      background
      layout="prev, pager, next"
      :total="pageTotal"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange">
    </el-pagination>
  </Grail>
</template>
<script>
  import Posts from '../components/Posts.vue'
  import Header from '../components/Header.vue'
  import Grail from '../components/Grail.vue'
  import $axios from '@/plugins/ajax'
  export default {
    components: {
      Posts,
      Header,
      Grail
    },
    data () {
      return {
        messageList: [],    // 分页数据
        allMessageList: [], // 所有数据
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
        currentPage: 1,   // 当前页数
        pageTotal: 0,   // 总共页数
        showHome: true   // 是否显示分页
      }
    },
    methods: {
      showList () {
        let vm = this
        // 特定用户的文章
        let userId = vm.$route.params.id || ''
        $axios.get(`/api/posts?author=${userId}`).then(function (res) {
          if (res.data.status === 'success') {
            vm.allMessageList = res.data.posts
            vm.messageList = vm.allMessageList.slice(0, 10)
            vm.pageTotal = vm.allMessageList.length
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
      },
      // 当前页数改变
      handleCurrentChange (val) {
        console.log(this.messageList)
        // :data="AllCommodityList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        this.messageList = this.allMessageList.slice((this.currentPage - 1) * 10, this.currentPage * 10)
      }
    },
    created () {
      if (this.$route.path.indexOf('detail') < 0) {
        this.showList()
      } else {
        this.detailHandle(this.$route.params.id)
        this.showHome = false
      }
      this.currentPage = 1
    },
    watch: {
      // 监听路由变化，区分详情页和列表页
      '$route' (to, from) {
        // 对路由变化作出响应...
        if (to.path === '/' || to.path.indexOf('home') > -1) {
          this.showList()
          this.showHome = true
        } else if (to.path.indexOf('detail') > -1) {
          this.detailHandle(this.$route.params.id)
          this.showHome = false
        }
      }
    }
  }
</script>
<style>
  .el-pagination {
    float: right;
  }
</style>
