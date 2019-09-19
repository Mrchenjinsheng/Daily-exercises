<template>
    <div class="goods-list">
        <div class="item" v-for="item in goodsList" :key="item.id" @click ="goDateil(item.id)">
            <img :src="item.img_url">
            <h3 class="title">{{ item.title }}</h3>
            <div class="goods-info">
                <div class="price">
                    <span class="sell">￥{{ item.sell_price }}</span>
                    <span class="market">{{ item.market_price }}</span>
                </div>
                <div class="subinfo">
                    <span>热卖中</span>
                    <span>剩余:{{ item.stock_quantity }}件</span>
                </div>
            </div>
        </div>
        <mt-button size='large' type="primary" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            pageindex: 1,
            goodsList:[]
        }
    },
    created() {
        this.getGoodsList()
    },
    methods:{
        //获取商品列表清单
        getGoodsList() {
            this.axios({
                method:'get',
                url:'api/getgoods',
                params:{
                    pageindex:this.pageindex
                }
            })
            .then(result => {
                if(result.data.status === 0){
                    this.goodsList = this.goodsList.concat(result.data.message)
                }
            })
        },
        //点击载入更多事件
        getMore() {
            this.pageindex +=1
            this.getGoodsList()
        },
        //进入商品详情
        goDateil(id) {
            this.$router.push({name:'goodsinfo',params:{id:id}})
        }
    }
}
</script>
<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    img{
            width: 100%;
        }
    .title{
            font-size: 12px;
        }
    .item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 260px;
        .goods-info{
            background-color: #ccc;
            padding: 5px;
            
            .price{
                .sell{
                    color: #f00;
                    font-size: 16px;
                    margin-right: 20px;
                }
                .market{
                    color: #333;
                    font-size: 12px;
                    text-decoration: line-through;
                }
            }
            .subinfo{
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
    }
}
    
</style>