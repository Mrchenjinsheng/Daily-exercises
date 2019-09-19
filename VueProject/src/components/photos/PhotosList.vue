<template>
    <div>
        <!-- 头部滑动组件 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id===0?'mui-active':'']" href="#item1mobile" data-wid="tab-top-subpage-1.html" 
                    v-for="item in category" :key="item.id" @click='getPhotoList(item.id)'>
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <!-- 图片列表 -->
        <ul class="photo-list">
            <router-link :to="'/home/photoinfo/'+item.id" v-for="item in photoList" :key="item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h3 class="title">{{item.title}}</h3>
                    <h3 class="content" v-html="item.zhaiyao"></h3>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
import mui from '../../lib/js/mui.js'
export default {
    data() {
        return {
            category:[],
            photoList:[]
        }
    },
    created() {
        this.getcatrgory(),
        this.getPhotoList(0)
    },
    mounted() {
        // 懒加载设置
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods:{
        //获取顶栏类别数据
        getcatrgory() {
            this.axios.get('api/getimgcategory')
            .then(result => {
                if(result.data.status === 0) {
                    let all = {id:0,title:'全部'}
                    result.data.message.unshift(all)
                    this.category = result.data.message
                }
            })
        },
        //获取图片列表数据
        getPhotoList(id) {
            this.axios.get('api/getimages/' + id)
            .then(result => {
                if(result.data.status === 0){
                    this.photoList = result.data.message
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
    .photo-list{
        list-style: none;
        text-align: center;
        margin: 0;
        padding: 0 10px;
        padding-bottom: 0;
        li{
            margin-bottom: 10px;
            box-shadow: 0 0 8px #555;
            position: relative;
            img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
            }
            img{
                width: 100%;
                vertical-align: middle;
            }
            .info{
                position: absolute;
                bottom: 0;
                text-align: left;
                color: #fff;
                background-color: rgba(0,0,0,.3);
                max-height: 80px;
                width: 100%;
                .title{
                    font-size: 14px;
                }
                .content{
                    font-size: 13px;
                    line-height: 20px;
                }
            }
        }
        
    }
</style>