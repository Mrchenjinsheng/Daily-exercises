<template>
    <div class="cart-container">
        <div class="goods-list">
            <div class="mui-card" v-for="(item,index) in cartList" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner goods-item">
                        <mt-switch  v-model="$store.getters.getSelected[item.id]" @change='selectedChange(item.id,$store.getters.getSelected[item.id])'></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h3>{{item.title }}</h3>
                            <div class="subInfo">
                                <span class="price">￥{{ item.sell_price }}</span>
                                <numbox :count="$store.getters.getGoodsCount[item.id]" :goodsId='item.id'></numbox>
                                <a href="" @click.prevent='delGoods(item.id,index)'>删除</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner settle">
                    <div class="total">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品 <span>{{ $store.getters.getTotalPrice.count }}</span> 件,总价:<span>￥{{ $store.getters.getTotalPrice.totalPrice }}</span></p>
                    </div>
                    <mt-button type="danger" size="small">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import numbox from '../subcomponents/catr_numbox.vue'
export default {
    data() {
        return {
            cartList:[],
            selectedCount:1
        }
    },
    created() {
        this.getCartList()
    },
    methods: {
        //获取购物车列表清单
        getCartList() {
            let goodsId = []
            this.$store.state.cart.forEach(item => {
                goodsId.push(item.id)
            })
            if(goodsId == ''){
                return 
            }
            this.axios.get('api/goods/getshopcarlist/' + goodsId.join(','))
            .then(result => {
                if(result.data.status === 0){
                    this.cartList = result.data.message
                }
            })
        },
        //点击删除事件
        delGoods(id,index) {
            this.cartList.splice(index,1) //删除商品列表
            this.$store.commit('removeCart',id) //删除本地数据
        },
        //商品选中状态切换
        selectedChange(id,selected) {
            this.$store.commit('updataSelected',{id:id,selected:selected})
        }
    },
    
    components:{
        numbox
    }
}
</script>
<style lang="scss" scoped>
    .cart-container{
        .goods-list{
            .goods-item{
                display: flex;
                justify-content: space-between;
                align-items: center;
                img{
                    width: 38px;
                    height: 38px;
                    margin: 0 10px;
                }
                .info{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    h3{
                        font-size: 13px;
                        text-align: center;
                    }
                    .subInfo{
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .price{
                            color: #f00;
                            font-weight: 700;
                            font-size: 14px;
                        }
                        // .mui-numbox{
                        //     height: 25px;
                        //     .mui-btn{
                        //         width: 20px;
                        //     }
                        // }

                    }
                }
            }
        }
        .total{
            span{
                color: #f00;
                font-weight: 700;
                font-size: 20px;
            }
        }
        .settle{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>