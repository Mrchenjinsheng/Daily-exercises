<template>
    <div class="goods-comment">
        <comment :id='$route.params.id'></comment>
    </div>
</template>
<script>
import comment from '../subcomponents/comment.vue'
export default {
    components:{
        comment
    }
}
</script>
<style lang="scss" scoped>
    .goods-comment{
        padding: 5px;
    }
</style>