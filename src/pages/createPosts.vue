<template>
  <el-container class="createPosts">
    <el-header class="postsHeader">
      <Header :title="title"></Header>
    </el-header>
    <el-main>
      <el-row class="posts">
        <el-col :span="2">
          <img :src="imgSrc" alt="">
        </el-col>
        <el-col :span="22" class="messageContent">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="标题" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="createPosts">
              <el-input type="textarea" v-model="ruleForm.content" :autosize="{ minRows: 12 }"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
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
        title: {
          title: 'myblog',
          subTitle: 'my first blog'
        },
        imgSrc: '../../static/test.png',
        ruleForm: {
          title: '',
          content: ''
        },
        rules: {
          title: [
            {required: true, message: '请输入标题！', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}],
          content: [
            { required: true, message: '请填写内容！', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        let vm = this
        vm.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.$route.params.id) {
              $axios.post(`/api/posts/${this.$route.params.id}/edit`, vm.ruleForm).then((res) => {
                if (res.data.status === 'success') {
                  vm.$message({
                    type: 'success',
                    message: res.data.message
                  })
                  vm.$router.push('/')
                } else {
                  vm.$message({
                    type: 'error',
                    message: res.data.status
                  })
                }
              })
            } else {
              $axios.post('/api/posts/create', vm.ruleForm).then((res) => {
                if (res.data.status === 'success') {
                  vm.$message({
                    type: 'success',
                    message: res.data.message
                  })
                  vm.$router.push('/')
                } else {
                  vm.$message({
                    type: 'error',
                    message: res.data.status
                  })
                }
              })
            }
          } else {
            return false
          }
        })
      }
    },
    created () {
      // 如果是编辑页，需要获取文章数据
      if (this.$route.params.id) {
        $axios.get(`/api/posts/${this.$route.params.id}/edit`).then((res) => {
          this.ruleForm = res.data.post
        })
      }
    }
  }
</script>
<style>
  .createPosts .postsHeader {
    margin-bottom: 50px
  }
  .createPosts .posts {
    margin: auto;
  }
  .createPosts .messageContent {
    border: 1px solid #ccc;
    text-align: left;
    padding: 10px;
  }
</style>
