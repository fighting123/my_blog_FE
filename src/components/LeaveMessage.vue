<template>
  <section class="leaveMess">
    <el-row>
      <el-col :span="1">
        <img :src="leaveMessInfo.imgSrc" alt="">
      </el-col>
      <el-col :span="22">
        <span class="leaveMessName">{{ leaveMessInfo.author.name }}</span>
        <span class="leaveMessTime">{{ leaveMessInfo.create_at }}</span>
        <span  v-if="loginStatus" @click="deleteComment" class="deleteLeaveMess">删除</span>
        <div class="leaveMessContent" v-html="leaveMessInfo.content"></div>
      </el-col>
    </el-row>
  </section>
</template>
<script>
  import store from '@/store'
  export default {
    data () {
      return {
        content: '',
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
      deleteComment () {
        this.$emit('deleteLeaveMess', this.leaveMessInfo._id)
      }
    }
  }
</script>
<style>
  .leaveMess {
    margin-top: 10px;
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
    cursor: pointer;
  }
  .leaveMess .deleteLeaveMess:hover {
    font-size: 13px;
  }
  .leaveMessContent {
    margin: 5px 10px;
  }
</style>
