<template>
    <div>
        <mt-swipe :auto="3000" >
            <mt-swipe-item v-for="item in swiperList" :key="item.id">
                <img :src="item.img" alt="" :class='{full:isfull}'>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    
    props:['swiperList','isfull']
}
</script>
<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            text-align: center;
        }
        img{
            height: 100%;
        }
    }
    .full{
        width: 100%;
    }
</style>