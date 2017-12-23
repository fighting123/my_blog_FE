<template>
  <el-container class="posts">
    <el-aside width="100px">
      <img :src="message.author.imgSrc" alt="">
    </el-aside>
    <el-main class="mainContent">
      <div class="messageContent">
        <div class="messageTitle" @click="titleHandle">{{ message.title }}</div>
        <div v-html="message.content" class="messageCode"></div>
        <el-row type="flex" justify="space-between" class="messageFooter">
          <el-col :span="3">{{ message.create_at }}</el-col>
          <el-col :span="4" class="messageFooterRight">
            <span>浏览( {{message.pv}} )</span>
            <span @click="LeaveMessageHandle" v-if="message.commentsCount">留言( {{ message.commentsCount }} )</span>
            <span @click="LeaveMessageHandle" v-else>留言(0)</span>
            <el-dropdown v-if="loginStatus" @command="handleCommand">
              <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon--left"></i></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="editHandle">编辑</el-dropdown-item>
                <el-dropdown-item command="deleteHandle">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
      <div class="messageContent" v-if="bloomLeaveMessage">
        <el-row type="flex" justify="begin" style="border-bottom: 1px solid #ccc;margin-bottom: 10px">
          <el-col :span="1" class="leaveMessTitle">留言</el-col>
        </el-row>
        <div v-for="(leaveMessInfo, index) in leaveMessInfoList" :key="index">
          <leaveMessage :leaveMessInfo="leaveMessInfo" :message="message" @deleteLeaveMess="deleteLeaveMess"></leaveMessage>
        </div>
        <div v-if="loginStatus">
          <el-input type="textarea" :autosize="{ minRows: 6 }" v-model="content"></el-input>
          <el-button type="primary" @click="leaveMess" style="margin-top: 10px;">留言</el-button>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
  import LeaveMessage from '../components/LeaveMessage.vue'
  import store from '@/store'
  import $axios from '@/plugins/ajax'
  export default {
    components: {
      LeaveMessage
    },
    data () {
      return {
        leaveMessInfo: {
          imgSrc: '../../static/test.png',
          author: {},
          create_at: '2017-08-08 00:00:00',
          content: '沙发',
          _id: ''
        },
        content: '',
        leaveMessInfoList: [],
        bloomLeaveMessage: false,   // 留言板展示
        loginStatus: store.state.statusLogin
      }
    },
    props: {
      message: {
        type: Object,
        default: {}
      }
    },
    methods: {
      titleHandle () {
        let vm = this
        $axios.get(`/api/posts/${vm.message._id}`).then((res) => {
          if (res.data.status === 'success') {
            vm.$emit('getOnePost', res.data.post)
          }
        })
      },
      LeaveMessageHandle () {
        let vm = this
        vm.bloomLeaveMessage = !vm.bloomLeaveMessage
        if (vm.bloomLeaveMessage === true) {
          $axios.get(`/api/posts/${vm.message._id}`).then((res) => {
            if (res.data.status === 'success') {
              vm.leaveMessInfoList = res.data.comments
            }
          })
        }
      },
      leaveMess () {
        let vm = this
        $axios.post('api/comments', {postId: vm.message._id, content: vm.content}).then((res) => {
          if (res.data.status === 'success') {
            vm.$message({
              type: 'success',
              message: res.data.message
            })
            vm.bloomLeaveMessage = !vm.bloomLeaveMessage
            vm.content = '' // 留言框清空
            // 刷新页面的留言数
            vm.$emit('refreshPosts')
          } else {
            vm.$message({
              type: 'error',
              message: res.data.message
            })
          }
        })
      },
      deleteLeaveMess (commentId) {
        let vm = this
        $axios.get(`api/comments/${commentId}/remove`).then((res) => {
          if (res.data.status === 'success') {
            vm.$message({
              type: 'success',
              message: res.data.message
            })
            // 刷新页面的留言数
            vm.$emit('refreshPosts')
            // 刷新留言列表
            if (vm.bloomLeaveMessage === true) {
              $axios.get(`/api/posts/${vm.message._id}`).then((res) => {
                if (res.data.status === 'success') {
                  vm.leaveMessInfoList = res.data.comments
                }
              })
            }
          } else {
            vm.$message({
              type: 'error',
              message: res.data.message
            })
          }
        })
      },
      handleCommand (command) {
        let vm = this
        switch (command) {
          case 'deleteHandle':
            $axios.get(`/api/posts/${vm.message._id}/remove`).then((res) => {
              if (res.data.status === 'success') {
                vm.$message({
                  type: 'success',
                  message: res.data.message
                })
                vm.$emit('getPostList')
              } else {
                vm.$message({
                  type: 'error',
                  message: res.data.message
                })
              }
            })
            break
          case 'editHandle':
            vm.$router.push(`/editPosts/${vm.message._id}`)
            break
        }
      }
    },
    created () {
    }
  }
</script>
<style>
  .posts {
    margin: auto;
  }
  .posts .mainContent {
    margin: 0;
    padding: 0;
  }
  .posts .messageContent {
    border: 1px solid #ccc;
    text-align: left;
    padding: 10px;
    margin-bottom: 10px;
  }
  .posts .messageTitle {
    font-size: 24px;
    font-weight: 600;
    color: #409eff;
    margin: 5px 0 20px 0;
    cursor: pointer;
  }
  .posts .messageCode {
    margin: 0 0 20px 0;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  }
  .posts .messageFooter {
    font-size: 12px;
    color: #909399;
  }
  .posts .messageFooterRight {
    cursor: pointer;
  }
  .posts .messageContent .leaveMessTitle {
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: 600;
  }
  /*.posts .el-icon-arrow-down:hover {*/
    /*transform: rotate(180deg);*/
    /*transition: all 0.3s;*/
  /*}*/
</style>
