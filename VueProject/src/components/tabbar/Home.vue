<template>
    <div>
        <!-- 轮播图 -->
        <swiper :swiperList="swiperList" :isfull="true"></swiper>
        <!-- 九宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../icon/menu6.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photoslist">
                    <img src="../../icon/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <img src="../../icon/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../icon/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../icon/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../icon/menu1.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
            
        </ul> 
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import swiper from '../subcomponents/swiper.vue'
export default {
    data(){
        return {
            swiperList:[]
        }
    },
    created() {
        this.getSwiper()
    },
    methods: {
        //通过axios获取轮播图相关数据
        getSwiper(){
            this.axios.get('api/getLunbo')
            .then(result => {
                if(result.data.status === 0 ){
                    this.swiperList = result.data.message
                }
            })
            .catch(() => {
                Toast('请求轮播图数据失败')
            })
        }
    },
    components:{
        swiper
    }
}
</script>
<style lang="scss" scoped>
    
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        img{
            width: 60px;
            height: 60px;
        };
        .mui-table-view-cell{
            border: 0;
            .mui-media-body{
                font-size: 13px;
            }
        }
    }
</style>