<template>
    <div class="container">

        <!-- 顶栏 -->
        <mt-header fixed title="基于VUE构建单页面应用">
            <div slot="left" @click='goBack' v-show='toggle'>
                <mt-button icon="back" >返回</mt-button>
            </div>
        </mt-header> 


        <!-- 
            内容展示区域 
            使用transition过度，使得画面看起来更流畅
        -->
        <transition mode="out-in">
            <router-view></router-view>  
        </transition>



        <!-- 底栏 -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-kll" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			
			<!-- <router-link class="mui-tab-item-kll" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link> -->
			<router-link class="mui-tab-item-kll" to="/cart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{ $store.getters.getTotal}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<!-- <router-link class="mui-tab-item-kll" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link> -->
		</nav>


    </div>
</template>
<script>
export default {
    data(){
        return {
            toggle: false
        }
    },
    created() {
        //由于监听事件刚进入页面不会触发，所以在created生命周期判断路由事件是时候是home  如果是则隐藏返回按钮
        this.toggle = this.$route.path === '/home' ? false: true
    },
    methods: {
        //点击后退
        goBack(){
            this.$router.go(-1)
        }
    },
    watch: {
        //监听路由事件，如果是home则隐藏返回按钮
        "$route.path":function(newValue) {
            if(newValue === '/home') {
                this.toggle = false
                return
            }
            this.toggle = true
        }   
    },
   
}
</script>
<style lang="scss" scoped>
    .container{
        padding: 40px 0 50px;
        overflow: hidden;
    }
    .mint-header{
        z-index: 2;
    }

    // 设置动画效果
    .v-enter{
        opacity: 0;
        transform: translateX(100%)
    }
    .v-leave-to{
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;

    }
    .v-enter-active,
    .v-leave-active{
        transition: all .3s ease
    }
</style>
