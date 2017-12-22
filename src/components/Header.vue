<template>
  <section class="header">
    <el-row :gutter="20">
      <el-col :span="14"  :offset="4">
        <div class="title">{{ title.title }}</div>
        <div class="subTitle">{{ title.subTitle }}</div>
      </el-col>
      <el-col :span="5">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon--left"></i></span>
          <el-dropdown-menu slot="dropdown" v-if="!loginStatus">
            <el-dropdown-item command="signinHandle">登录</el-dropdown-item>
            <el-dropdown-item command="signupHandle">注册</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu slot="dropdown" v-else>
            <el-dropdown-item command="homeHandle">个人主页</el-dropdown-item>
            <el-dropdown-item command="createPostsHandle">发表文章</el-dropdown-item>
            <el-dropdown-item command="signOutHandle">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </section>
</template>
<script>
  import $axios from '@/plugins/ajax'
  import store from '@/store'
  export default {
    data () {
      return {
        loginStatus: store.state.statusLogin
      }
    },
    props: {
      title: {
        type: Object,
        default: {}
      }
    },
    methods: {
      handleCommand (command) {
        let vm = this
        switch (command) {
          case 'signOutHandle':
            $axios.get('/api/signout').then((res) => {
              if (res.data.status === 'success') {
                vm.$message({
                  type: 'success',
                  message: res.data.message
                })
                store.commit('checkLogin', false)
                vm.loginStatus = store.state.statusLogin
                window.location.reload()
                vm.$router.push('/')
              }
            })
            break
          case 'signinHandle':
            vm.$router.push('/signIn')
            break
          case 'signupHandle':
            vm.$router.push('/signUp')
            break
          case 'homeHandle':
            vm.$router.push('/')
            break
          case 'createPostsHandle':
            vm.$router.push('/createPosts')
        }
      }
    }
  }
</script>
<style>
  .header .title {
    font-size: 24px;
    font-weight: 900;
    color: #409eff;
  }
  .header .subTitle {
    font-size: 12px;
    color: #909399;
    margin: 10px 0;
  }
</style>
