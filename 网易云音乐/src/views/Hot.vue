<template>
    <div class="hot">
        <div class="banner">
            <img :src="info.coverImgUrl" alt="">
            <p ref='update'>更新日期:&nbsp;&nbsp;{{ new Date(info.trackUpdateTime) | dateFormat('MM月DD') }}</p>
        </div>
        <el-button type="primary" @click="playingAll">播放全部</el-button>
        <div  class="item">
            <div  v-for="(item,index) in hotList" :key="item.id" class="item-list" @click="goPlayer(item.id,index)">
                <div class="left">
                    <p class="song">{{ item.name }}</p>
                    <p class="author">{{ item.ar[0].name + "-" + item.al.name }}</p>
                </div>
                <i class="iconfont icon-bofang"></i>
            </div>
        </div>
        <el-button type="primary" @click="getMore">加载更多</el-button>
    </div>
</template>
<script>
import { Toast } from 'vant'
export default {
    data() {
        return {
            info:{},            //热榜歌曲综合信息 
            hotList:[],         //热榜歌曲列表
            hotCount: 0         //显示数量
        }
    },
    created() {
        this.getHotInfo()
        this.hotCount = JSON.parse(sessionStorage.getItem('hotCount') || 10)
    },
    methods: {
        //获取热歌榜综据
        getHotInfo() {
            this.axios({
                url:'top/list?idx=1'
            })
            .then(res => {
                if(res.data.code === 200){
                    localStorage.setItem('hotList',JSON.stringify(res.data.playlist.tracks))
                    this.info = res.data.playlist
                    this.hotList = JSON.parse(localStorage.getItem('hotList')).slice(0,this.hotCount)
                }
            })
        },

        // 点击查看更多
        getMore() {
            if(this.hotCount >= this.info.tracks.length){
                Toast('已经获取到全部内容');
                return 
            }
            this.hotList = JSON.parse(localStorage.getItem('hotList')).slice(0,this.hotCount += 10)
        },
        // 跳转播放界面
        goPlayer(id,index) {
            localStorage.setItem('songInfo',JSON.stringify(this.hotList[index]))
            this.$store.state.songInfo = this.hotList[index]
        },
        playingAll() {
            localStorage.setItem('songInfo',JSON.stringify(this.hotList))
            this.$store.state.songInfo = JSON.parse(localStorage.getItem('hotList'))
        }
    },
    
}
</script>

<style lang="scss" scoped>
    .hot{
        padding-bottom: 60px;
        .banner{
            position: relative;
            img{
                width: 100%;
            }
            p{
                position: absolute;
                top: 60%;
                left: 10%;
                color: #fff;
            }
        }
        .item{
            .item-list{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 5px 10px;
                border-bottom: 1px solid #eee;
                &:last-child{
                    border: 0;
                }
                p{
                    margin: 0;
                    padding: 0;
                }
                .left{
                    width: 90%;
                    .song{
                        width: 100%;
                        font-size: 16px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    .author{
                        font-size: 12px;
                        color: #888;
                    }
                }
                i{
                    font-size: 2em;
                    color: #888;
                }
            }
        }
        .el-button{
            width: 100%;
        }
    }
</style>