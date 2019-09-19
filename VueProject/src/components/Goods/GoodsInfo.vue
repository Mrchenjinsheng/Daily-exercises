<template>
    <div class="goodsinfo-container">
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" ref="ball" v-show="toggle"></div>
        </transition>
        <!-- 商品轮播 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :swiperList ='swiperList' :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <!-- 购买 -->
        <div class="mui-card info">
            <div class="mui-card-header">{{ info.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                     <p class="price">
                        销售价:￥<span class="new">{{ info.sell_price }}</span>
                        市场价:￥<span class="old">{{ info.market_price }}</span>
                    </p>
                    <p>
                        购买数量:<numbox @getCount="getCount" :max='info.stock_quantity'></numbox>
                    </p>
                    <div>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="goCart()">加入购物车</mt-button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 商品参数 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{ info.goods_no }}</p>
                    <p>库存情况:{{ info.stock_quantity }}</p>
                    <p>上架时间:{{ info.add_time}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button size="large" type="primary" plain @click='goDesc(id)'>图文介绍</mt-button>
                <mt-button size="large" type="danger" plain @click='goComment(id)' >商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import swiper from '../subcomponents/swiper.vue'
import numbox from '../subcomponents/goodsInfo_numbox.vue'
export default {
    data() {
        return {
            id: this.$route.params.id,
            swiperList:[],
            info:{},
            toggle: false,
            selectedCount: 1
        }
    },
    created() {
        this.getSwiper(),
        this.getInfo()
    },
    methods: {
        //获取商品轮播图
        getSwiper() {
            this.axios.get('api/getthumimages/' + this.id)
            .then(result => {
                if(result.data.status === 0){
                    result.data.message.forEach(item => {
                        item.img = item.src
                    })
                    this.swiperList = result.data.message
                }
            })
        },
        //获取商品相关数据
        getInfo() {
            this.axios.get('api/goods/getinfo/' + this.id)
            .then(result => {
                if(result.data.status === 0){
                    this.info = result.data.message[0]
                }
            }) 
        },
        //点击进入图文介绍
        goDesc(id) {
            this.$router.push({name:'goodsdesc',params:{id:id}})
        },
        //点击进入评论
        goComment(id) {
            this.$router.push({name:"goodscomment",parame:{id:id}})
        },
        //商品加入购物车
        goCart() {
            this.toggle = !this.toggle
            let goodsInfo = {id:this.id,count:this.selectedCount,price:this.info.sell_price,selected:true}
            this.$store.commit('addToCart',goodsInfo)
        },

        //小球动画
        beforeEnter(el) {
            el.style.transform = 'translate(0,0)'
        },
        enter(el,done) {
            el.offsetWidth
            const ballPosition = this.$refs.ball.getBoundingClientRect()
            const badgePostion = document.querySelector('#badge').getBoundingClientRect()
            const left = badgePostion.left - ballPosition.left + 'px'
            const top = badgePostion.top - ballPosition.top + 'px'
            el.style.transform = `translate(${left},${top})`
            el.style.transition = 'all 1s cubic-bezier(.59,.23,.48,.81)'
            done()
        },
        afterEnter(el) {
            this.toggle = !this.toggle
        },
        //获取商品选中数量
        getCount(count) {
            this.selectedCount = count
        }

    },
    components:{
        swiper,
        numbox
    }
}
</script>
<style lang="scss" scoped>
.goodsinfo-container{
    overflow: hidden;
    background-color: #eee;
    .ball{
        width: 15px;
        height: 15px;
        background-color: #f00;
        border-radius: 50%;
        position: absolute;
        z-index: 11;
        top: 386px;
        left: 153px;
    }
    .info{
        .price{
            font-size: 12px;
            .new{
                color: #f00;
                margin-right: 10px;
                font-size: 16px;
                font-weight: 700
            }
            .old{
                text-decoration: line-through;
            }
        }
        .mui-numbox{
            height: 25px;
            margin-left: 10px;
        }
        
    }
    .mui-card-footer{
        flex-wrap:wrap;
        .mint-button{
            margin: 5px 0;
        }
    }
}
    
</style>