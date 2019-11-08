<template>
  <div id="app">
    <!-- 下载提示 -->
    <!-- <div class="top">
      <div class="logo">
        <i class="iconfont icon-wangyiyunyinle"></i>
        <p>网易云音乐</p>
      </div>
       <el-button type="primary" round>下载APP</el-button>
    </div> -->
    <!-- 顶部导航 -->

    <van-tabs v-model="active" v-show="toggle" @click="jumpTo">
      <van-tab  title="推荐音乐"></van-tab>
      <van-tab  title="热歌榜"></van-tab>
      <van-tab  title="搜索"></van-tab>
    </van-tabs>

    <!-- 组件展示 -->
    <router-view></router-view>


    

  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,          //导航高亮
      toggle: true        //导航显示与否
    }
  },
  created() {

    //进入歌单和播放界面隐藏导航
    if(this.$route.path === `/songer/${this.$route.params.id}` || this.$route.path === `/playlist/${this.$route.params.id}`  ) {
      this.toggle = false
    }else{
      this.toggle = true
    }
    //解决页面刷新后，导航高亮错误问题
    switch(this.$route.path){
      case '/recommend':
        this.activeIndex = '1'
        this.active = 0
        break
      case '/hot':
        this.activeIndex = '2'
        this.active = 1
        break
      case '/search':
        this.activeIndex = '3'
        this.active = 2
        break
    }
  },
  methods: {
    //点击跳转对应页面
    jumpTo(index) {
      if(index === 0) {
        this.$router.push('/recommend')
      }
      if(index === 1) {
        this.$router.push('/hot')
      }
      if(index === 2) {
        this.$router.push('/search')
      }
    }
  },
  watch: {
    //路劲发生变化时修改对应导航高亮和是否隐藏导航
    '$route.path':function() {
      if(this.$route.path === `/songer/${this.$route.params.id}` || this.$route.path === `/playlist/${this.$route.params.id}` ) {
        this.toggle = false
      }else{
        this.toggle = true
      }
       switch(this.$route.path){
        case '/recommend':
          this.activeIndex = '1'
          this.active = 0
          break
        case '/hot':
          this.activeIndex = '2'
          this.active = 1
          break
        case '/search':
          this.activeIndex = '3'
          this.active = 2
          break
      }
    }
  },
}
</script>

<style lang="scss">
body{
  margin: 0;
  padding: 0;
}
#app {
  .top{
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: #D43C33;
    height: 80px;
    padding: 0 10px;
    .logo{
      display: flex;
      align-items: center;
      i{
        font-size: 14px;
        color: #D43C33;
        background-color: #fff;
        border-radius: 50%;
        padding: 5px;
      }
      p{
        color: #fff;
        margin: 0;
        margin-left: 10px;
      }
    }
    .el-button{
      background-color: #fff;
      color: #D43C33;
    }
  }
  .el-menu{
    display: flex;
    .el-menu-item{
      flex: 1;
      text-align: center;
      height: 40px;
      line-height: 40px;
    }
  }
  
}
</style>
