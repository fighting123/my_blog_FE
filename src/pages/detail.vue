<template>
  <Grail>
    <Posts :message="message" @getOnePost="showOnePost"></Posts>
  </Grail>
</template>
<script>
  import Posts from '../components/Posts.vue'
  import Header from '../components/Header.vue'
  import Grail from '../components/Grail.vue'
  export default {
    components: {
      Posts,
      Header,
      Grail
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
