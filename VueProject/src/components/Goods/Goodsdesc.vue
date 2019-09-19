<template>
    <div class="goods-desc">
        <h3 class="title">{{ desc.title }}</h3>
        <hr/>
        <p class="content" v-html="desc.content"></p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            id:this.$route.params.id,
            desc:{}
        }
    },
    created() {
        this.getDesc()
    },
    methods: {
        //获取图文详情
        getDesc() {
            this.axios.get('api/goods/getdesc/' + this.id)
            .then(result => {
                if(result.data.status === 0){
                    this.desc = result.data.message[0]
                }
            })
        },
    },
}
</script>
<style lang="scss">
    .goods-desc{
        padding: 5px;
        .title{
            color: #226aff;
            font-size: 18px;
            text-align: center;
            margin: 15px 0;
        }
        .content{
            img{
                width: 100%;
            }
        }
    }
</style>