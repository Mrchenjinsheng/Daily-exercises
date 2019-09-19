<template>
    <div class="comment-container">
        <h3>发表评论</h3>
        <hr/>
        <textarea class="input" maxlength="120" placeholder="请输入你想发表的评论" v-model="input"></textarea>
        <mt-button type="primary" size="large" @click="submit">发表评论</mt-button>
        <div class="comment-list">
                <div class="comment-item" v-for="(item, i) in commentsList" :key="item.id">
                    <div class="title">
                        <span>第{{i+1}}楼</span>&nbsp;&nbsp;
                        <span>用户:{{item.user_name}}</span>&nbsp;&nbsp;
                        <span>发表时间:{{item.add_time | dateFormat("YYYY-MM-DD")}}</span>
                    </div>
                    <div class="content">
                        {{item.content.trim() === 'undefined' ? '此用户很懒,什么都没有写':item.content}}
                    </div>
                </div>
        </div>
        <mt-button type="primary" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    data() {
        return {
            pageIndex: 1,
            commentsList:[],
            input:''
        }
    },
    props:["id"],
    created() {
        this.getCommentList()
    },
    methods: {
        getCommentList() {
            this.axios.get('api/getcomments/' + this.id +'?pageindex=' + this.pageIndex)
            .then(result => {
                if(result.data.status === 0 ){
                    this.commentsList = this.commentsList.concat(result.data.message)
                }
            })
        },
        getMore() {
            this.pageIndex++
            this.getCommentList()
        },
        submit() {
            if(this.input.trim() === '') {
                return Toast('评论内容不能为空')
            }
            this.axios({
                method:'post',
                url:'api/postcomment/'+ this.id,
                data:{
                    content:this.input
                }
            })
            .then(result => {
                this.commentsList.unshift({add_time:Date.now(),content:this.input,user_name:'匿名用户'})
                Toast(result.data.message)
                this.input =''
            })
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .comment-container{
        h3{
            font-size: 18px;
        }
        .input{
            margin: 0;
            height: 80px;
            font-size: 14px;
        }
        .comment-list{
            color: #000;
            margin: 5px 0;
            .title{
                background-color: #ccc;
                font-size: 13px;

            }
            .content{
                text-indent: 2em;
                line-height: 30px;
                font-size: 14px;
            }
        }
    }
</style>