<template>
    <div class="mui-numbox" data-numbox-min='0' data-numbox-max='10'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="count" @change="countChanged" ref="numbox" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
import mui from '../../lib/js/mui.js'
export default {
    methods: {
        //商品改变数量同步徽标
        countChanged() {
            this.$store.commit('updataGoodsCount',
                {
                    id:this.goodsId,
                    count:this.$refs.numbox.value
                })
        }
    },
    props:['count','goodsId'],
    mounted() {
        mui('.mui-numbox').numbox()
    },
}
</script>
<style lang="scss" scoped>
    
</style>