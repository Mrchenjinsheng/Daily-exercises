<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button" >-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged"  ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button" >+</button>
    </div>
</template>
<script>
import mui from '../../lib/js/mui.js'
export default {
    methods: {
        //商品选中数量，通过$store同步徽标
        countChanged() {
            this.$emit('getCount',this.$refs.numbox.value)
        }
    },
    props:['max'],
    mounted() {
        mui('.mui-numbox').numbox()
    },
    watch: {
        //监听商品最大可选数量
        max(newValue,oldValue) {
            mui('.mui-numbox').numbox().setOption('max',this.max)
        }
    },
}
</script>