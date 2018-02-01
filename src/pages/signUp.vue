<template>
  <el-container class="signUp">
    <el-header class="signUpHeader">
      <Header :title="title"></Header>
    </el-header>
    <el-main class="signUpMain">
      <el-form :model="signUpForm" :rules="rules" ref="signUpForm">
        <el-form-item label="用户名:" prop="name">
          <el-input v-model="signUpForm.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="signUpForm.password" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码:" prop="rePassword">
          <el-input v-model="signUpForm.rePassword" placeholder="重复密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="gender">
          <el-select v-model="signUpForm.gender">
            <el-option label="男" value="f"></el-option>
            <el-option label="女" value="m"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            action="http://localhost:8080/api/signup/image"
            name="avatar"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="个人简介" prop="bio">
          <el-input v-model="signUpForm.bio" type="textarea" :autosize="{ minRows: 6 }"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitUpload">注册</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
  import Header from '@/components/Header.vue'
  import $axios from '@/plugins/ajax'
  export default {
    components: {
      Header
    },
    data () {
      var checkRePassword = (rule, value, callback) => {
        if (value !== this.signUpForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      }
      return {
        title: {
          title: 'myblog',
          subTitle: 'my first blog'
        },
        signUpForm: {
          name: '',
          password: '',
          rePassword: '',
          gender: '',
          bio: '',
          avatar: ''
        },
        imageUrl: '',
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
          rePassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
            { validator: checkRePassword, trigger: 'blur' }],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' }],
          bio: [
            { required: true, message: '请输入个人简介', trigger: 'blur' },
            { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }]
        }
      }
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file[0].raw)
        this.signUpForm.avatar = file[0]
      },
      beforeAvatarUpload (file) {
        // const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

//      if (!isJPG) {
//        this.$message.error('上传头像图片只能是 JPG 格式!')
//       }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        // return isJPG && isLt2M
        return isLt2M
      },
      submitUpload () {
        let vm = this
        var imageUpload = new Promise(function (resolve, reject) {
          vm.$refs['upload'].submit()
          resolve()
        })
        imageUpload.then(function () {
          vm.$refs['signUpForm'].validate((valid) => {
            if (valid) {
              // console.log(vm.signUpForm)
              $axios.post('/api/signup/', vm.signUpForm).then(function (res) {
                if (res.data.status === 'success') {
                  vm.$message({
                    type: 'success',
                    message: res.data.message
                  })
                  vm.$router.push('/signIn')
                } else {
                  vm.$message({
                    type: 'error',
                    message: res.data.message
                  })
                }
              })
            }
          })
        })
      }
    }
  }
</script>
<style>
  .signUp {
    width: 50%;
    margin: 0 auto;
  }
  .signUp .signUpHeader {
    margin-bottom: 50px
  }
  .signUp .signUpMain {
    border: 1px solid #ccc
  }
  .signUp .el-select .el-input {
    width: 520px
  }
  .signUp .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-top: 30px;
    width: 50px;
    height: 50px;
  }
  .signUp .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .signUp .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .signUp .avatar {
    width: 50px;
    height: 50px;
    display: inline-block;
    margin: 0;
    padding: 0;
  }
  .signUp .el-button {
    width: 520px;
    margin-top: 20px;
  }
  .signUp .el-form-item {
    margin-bottom: 10px;
  }
</style>
