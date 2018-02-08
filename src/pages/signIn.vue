<template>
  <Grail>
    <el-form :model="signInForm" :rules="rules" ref="signInForm" class="signIn">
      <el-form-item label="用户名:" prop="name">
        <el-input v-model="signInForm.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="signInForm.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitIn">登录</el-button>
      </el-form-item>
    </el-form>
  </Grail>
</template>
<script>
  import Header from '@/components/Header.vue'
  import Grail from '../components/Grail.vue'
  import $axios from '@/plugins/ajax'
  import localStorage from '@/plugins/localStorage'
  import store from '@/store'
  export default {
    components: {
      Header,
      Grail
    },
    data () {
      return {
        title: {
          title: 'myblog',
          subTitle: 'my first blog'
        },
        signInForm: {
          name: '',
          password: ''
        },
        imageUrl: '',
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }]
        }
      }
    },
    methods: {
      submitIn () {
        // this.$refs.upload.submit()
        let vm = this
        vm.$refs['signInForm'].validate((valid) => {
          if (valid) {
            $axios.post('/api/signIn/', this.signInForm).then(function (res) {
              if (res.data.status === 'success') {
                vm.$message({
                  type: 'success',
                  message: res.data.message
                })
                localStorage.set('_id', res.data.info, res.data.expTime)
                localStorage.set('imgUrl', res.data.imgUrl, res.data.expTime)
                vm.$router.push(`/home/${res.data.info}`)
                store.commit('checkLogin', true)
                store.commit('setUser', vm.signInForm.name)
              } else {
                vm.$message({
                  type: 'error',
                  message: res.data.message
                })
              }
            })
          }
        })
      }
    }
  }
</script>
<style>
  .signIn {
    margin: 0 auto;
    width: 40%;
    border: 1px solid #ccc;
    padding: 20px;
  }
  .signIn .el-select .el-input {
    width: 520px
  }
  .signIn .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-top: 30px
  }
  .signIn .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .signIn .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .signIn .el-button {
    width: 520px;
    margin-top: 20px;
  }
  .signIn .el-form-item {
    margin-bottom: 10px;
  }
</style>
