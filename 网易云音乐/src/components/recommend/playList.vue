<template>
    <div class="play-list">
        <!-- 顶部标题 -->
        <div class="topbar">
            <span class="left" @click="goBack">返回</span>
            <span class="right">{{ info.name }}</span>
        </div>
        <!-- 头部介绍 -->
        <div class="banner">
            <div class="left">
                <div class="count">
                    <i class="iconfont" ref='countIcon'></i>
                    <p>{{ info.playCount }}</p>
                </div>
                <img :src="info.coverImgUrl" alt="">
            </div>
            <div class="right">
                <p>{{ info.name }}</p>
                <!-- <div class="bottom">
                    <img :src="info.creator.avatarUrl" alt="">
                    <p>{{ info.creator.nickname }}</p>
                </div> -->
            </div>
        </div>
        <!-- 中间标签 -->
        <div class="info">
            <div class="tags">
                <span>标签:</span>
                <el-tag v-for="item in info.tags" :key="item" type="success" effect="plain">{{ item }}</el-tag>
            </div>
        </div>
        <!-- 歌单 -->
        <div class="list">
            <div class="item-list" v-for="(item,index) in musicList" :key="item.id" @click="goSonger(item.id,index)">
                <div class="left">
                    <p class="song">{{ item.name }}</p>
                    <p class="author">{{ item.artists[0].name  + "-" + item.album.name }}</p>
                </div>
                <i class="iconfont icon-bofang"></i>
            </div>
            <el-button type="primary" @click="getMore">加载更多</el-button>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
export default {
    data() {
        return {
            id:this.$route.params.id,       //歌单对应Id
            info:[],                        //歌单综合信息
            musicList:[],                   //歌曲列表信息
            count:10
        }
    },
    created() {
        this.getPlayList()
        this.count = JSON.parse(sessionStorage.getItem('count') || 10)
    },
    methods: {

        //获取推荐歌单详细信息
        getPlayList() {
            this.axios({
                url:'playlist/detail',
                params:{
                    id:this.id
                }
            })
            .then(res => {
                if(res.data.code === 200){
                    if(res.data.result.playCount > 100000000){
                        res.data.result.playCount = (res.data.result.playCount / 100000000).toFixed(1) + '亿'
                    }
                    if(res.data.result.playCount > 10000) {
                        res.data.result.playCount = (res.data.result.playCount / 10000).toFixed(1) + '万'
                    }
                    this.info = res.data.result
                    this.$refs.countIcon.className = 'iconfont icon-erji'
                    localStorage.setItem('musicList',JSON.stringify(res.data.result.tracks))
                    this.musicList = JSON.parse(localStorage.getItem('musicList')).slice(0,this.count)
                }
            })
        },

        //跳转音乐播放界面
        goSonger(id,index) {
            this.$router.push('/songer/' + id)
            sessionStorage.setItem('songInfo',JSON.stringify(this.info.tracks[index]))
        },
        //获取更多
        getMore() {
            if(this.count >= this.info.tracks.length){
                Toast('已经获取到全部内容');
                return 
            }
            this.musicList = JSON.parse(localStorage.getItem('musicList')).slice(0,this.count += 10)
        },

        //返回
        goBack() {
            this.$router.go(-1)
        },
        

    },
}
</script>

<style lang="scss" scoped>
    .play-list{
        p{
            margin: 0;
            padding: 0;
        }
        .topbar{
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid #f0f0f0;
            .left{
                white-space: nowrap;
                margin: 0 10px;
                padding: 0 10px;
                border-right: 1px solid #333;
            }
            .right{
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
        .banner{
            display: flex;
            justify-content: space-evenly;
            background-size: cover;
            background-image: linear-gradient( 135deg, #FEB692 10%, #EA5455 100%);
            padding: 20px 0;
            .left{
                position: relative;
                width: 30%;
                .count{
                    position: absolute;
                    top: 2px;
                    right: 2px;

                    font-size: 12px;
                    color: #fff;

                    display: flex;
                    align-items: center;
                    i{
                        font-size: 1em;
                    }
                    
                }
                img{
                    width: 100%;
                    vertical-align: middle;
                }

            }
            .right{
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                color: #fff;
                font-size: 16px;
                width: 50%;
                
                .bottom{
                    display: flex;
                    align-items: center;
                    img{
                        width: 15%;
                        border-radius: 50%;
                    }
                    p{
                        margin-left: 10px;
                        font-size: 14px;
                        color: #ccc;
                    }
                }
            }
        }
        .info{
            margin: 10px 10px;
            .el-tag{
                margin: 0 5px;
            }
        }
        .list{
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