<template>
  <section class="header">
    <el-row>
      <el-col :span="14" :offset="4" style="position: relative">
        <img src="../../sunflower.png" alt="sunflower" class="headerImg">
        <div class="title">{{ title.title }}</div>
        <div class="subTitle">{{ title.subTitle }}</div>
        <span style="position: absolute;top:0;right:0">
          <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon--left"></i></span>
          <el-dropdown-menu slot="dropdown" v-if="!loginStatus">
            <el-dropdown-item command="signinHandle">登录</el-dropdown-item>
            <el-dropdown-item command="signupHandle">注册</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu slot="dropdown" v-else>
            <el-dropdown-item command="homeHandle">主页</el-dropdown-item>
            <el-dropdown-item command="personalHomeHandle">个人主页</el-dropdown-item>
            <el-dropdown-item command="createPostsHandle">发表文章</el-dropdown-item>
            <el-dropdown-item command="signOutHandle">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </span>
      </el-col>
    </el-row>
  </section>
</template>
<script>
  import $axios from '@/plugins/ajax'
  import store from '@/store'
  import localStorage from '@/plugins/localStorage'
  export default {
    data () {
      return {
        loginStatus: store.state.statusLogin,
        title: {
          title: 'sunflower',
          subTitle: 'my first blog'
        }
      }
    },
    props: {
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
                store.commit('deleteUser')
                localStorage.remove('_id')
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
            vm.$router.push(`/`)
            break
          case 'personalHomeHandle':
            let userId = localStorage.get('_id') || ''
            vm.$router.push(`/home/${userId}`)
            break
          case 'createPostsHandle':
            vm.$router.push('/createPosts')
        }
      }
    }
  }
</script>
<style>
  .header {
    color: #fff;
    background: #409EFF;
    height: 80px;
  }
  .header .headerImg {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 0;
    left: 30%;
  }
  .header .title {
    font-size: 30px;
    font-weight: 700;
    margin: 10px 0;
  }
  .header .subTitle {
    font-size: 12px;
    margin: 10px 0;
  }
  .header .el-dropdown {
    font-size: 20px;
    color: #fff;
    height: 80px;
    line-height: 80px;
  }
</style>
