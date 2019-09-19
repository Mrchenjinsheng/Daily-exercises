<template>
    <div class="photo-info">
        <h1 class="title">{{ info.title }}</h1>
        <div class="subtitle">
            <span>发表时间:{{ info.add_time | dateFormat('YYYY-MM-DD')}}</span>
            <span>点击:{{ info.click }}次</span>
        </div>
        <!-- 预览图 -->
        <div class="preview">
            <vue-preview :slides="photoPreview" @close="handleClose"></vue-preview>
        </div>

        <p class="content" v-html="info.content"></p>
        <comment :id="id"></comment>
    </div>
</template>
<script>
import comment from '../subcomponents/comment.vue'
export default {
    data() {
        return {
            id:this.$route.params.id,
            info:{},
            photoPreview:[]
        }
    },
    created() {
        this.getPhotoInfo()
        this.getPhotoPreview()
    },
    methods:{
        //获取图片详情
        getPhotoInfo() {
            this.axios.get('api/getimageInfo/' + this.id)
            .then(result => {
                if(result.data.status === 0 ) {
                    this.info = result.data.message[0]
                }
            })      
        },
        //获取缩略图信息
        getPhotoPreview() {
            this.axios.get('api/getthumimages/' + this.id)
            .then(result => {
                console.log(result)
                if(result.data.status === 0){
                    result.data.message.forEach(item => {
                        item.msrc = item.src
                        item.w = 600
                        item.h = 400
                    })
                    this.photoPreview = result.data.message
                }
            })
        },
        handleClose () {
        }
    },
    components:{
        comment
    }
}
</script>
<style lang="scss" scoped>
    .photo-info{
        padding: 0 10px;
        .title{
            text-align: center;
            font-size: 16px;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            color: #226aff;
        }
        .content{
            line-height: 30px;
        }
        .preview {
            /deep/ .my-gallery{
                display: flex;
                flex-wrap: wrap;
                figure{
                    width: 30%;
                    margin: 5px;
                    img{
                        width: 100%;
                        box-shadow: 0 0 10px #999;
                    }
                }
            }
        }
    }
</style>