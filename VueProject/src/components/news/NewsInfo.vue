<template>
    <div class="newsinfo-container">
        <h1 class="title">{{newsInfo.title}}</h1>
        <div class="subtitle">
            <span>发表时间:{{newsInfo.add_time | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
            <span>点击{{newsInfo.click}}次</span>
        </div>
        <hr/>
        <div class="content" v-html="newsInfo.content">

        </div>
        <comment :id="id"></comment>
    </div>
</template>
<script>
import comment from '../subcomponents/comment.vue'
export default {
    data() {
        return {
            id:this.$route.params.id,
            newsInfo:{}
        }
    },
    created() {
        this.getNewsInfo()
    },
    methods:{
        //获取新闻详情数据
        getNewsInfo() {
            this.axios.get('api/getnew/' + this.id)
            .then(result => {
                if(result.data.status === 0 ){
                    this.newsInfo = result.data.message[0]
                }
            })
        }
    },
    components:{
        comment
    }
}
</script>
<style lang="scss" scoped>
.newsinfo-container{
    img{
        width: 100%;
    }
    padding: 0 5px;
    .title{
        text-align: center;
        font-size: 16px;
    }
    .subtitle{
        display:flex;
        justify-content: space-between;
        color: #226aff;
        font-size: 12px;
    }
}
    
</style>