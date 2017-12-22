<template>
  <section class="leaveMess">
    <el-row type="flex" justify="begin" style="border-bottom: 1px solid #ccc;margin-bottom: 10px">
      <el-col :span="1" class="leaveMessTitle">留言</el-col>
    </el-row>
    <el-row>
      <el-col :span="1">
        <img :src="leaveMessInfo.imgSrc" alt="">
      </el-col>
      <el-col :span="22">
        <span class="leaveMessName">{{ leaveMessInfo.name }}</span>
        <span class="leaveMessTime">{{ leaveMessInfo.time }}</span>
        <span  v-if="loginStatus" @click="" class="deleteLeaveMess">删除</span>
        <div class="leaveMessContent">{{ leaveMessInfo.content }}</div>
      </el-col>
    </el-row>
    <div v-if="loginStatus">
      <el-input type="textarea" :autosize="{ minRows: 6 }" v-model="leaveMessInfo.leaveMessage"></el-input>
      <el-button type="primary" @click="leaveMess" style="margin-top: 10px;">留言</el-button>
    </div>
  </section>
</template>
<script>
  import store from '@/store'
  export default {
    data () {
      return {
        loginStatus: store.state.statusLogin
      }
    },
    props: {
      leaveMessInfo: {
        type: Object,
        default: {}
      }
    },
    methods: {
      leaveMess () {
      }
    }
  }
</script>
<style>
  .leaveMess .leaveMessTitle {
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: 600;
  }
  .leaveMess .leaveMessName {
    font-size: 16px;
    font-weight: 600;
    margin: 0 10px;
  }
  .leaveMess .leaveMessTime {
    font-size: 12px;
    color: #909399;
  }
  .leaveMess .deleteLeaveMess {
    font-size: 12px;
    float: right;
    border-bottom: 2px solid #409eff;
  }
  .leaveMess .deleteLeaveMess:hover {
    font-size: 13px;
  }
  .leaveMessContent {
    margin: 5px 10px;
  }
</style>
