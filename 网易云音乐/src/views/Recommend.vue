<template>
    <div class="home">
        <!-- 推荐歌单 -->
        <div class="recommend">
            <p class="title">推荐歌单</p>
            <div class="item">
                <div class="item-list" v-for="item in recommend" :key="item.id" @click="goPlayList(item.id)">
                    <div class="count">
                        <i class="iconfont icon-erji"></i>
                        <p>{{ item.playCount  }}</p>
                    </div>
                    <img :src="item.picUrl" alt="">
                    <p>{{ item.name }}</p>
                </div>
            </div>
        </div>


        <!-- 最新音乐 -->
        <div class="new-music">
            <p class="title">最新音乐</p>
            <div class="item" >
                <div class="item-list" v-for="(item,index) in newMusic" :key="item.id" @click="goSonger(item.id,index)">
                    <div class="left">
                        <p class="song">{{ item.name }}</p>
                        <p class="author">{{ item.song.artists[0].name  + "-" + item.song.album.name }}</p>
                    </div>
                    <i class="iconfont icon-bofang"></i>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            recommend:[],   //推荐歌单数据
            newMusic:[]     //最新音乐数据
        }
    },
    created() {
        this.getRecommendMusic()
        this.getNewMusic()
    },
    methods: {

        // 获取推荐歌单信息
        getRecommendMusic() {
            this.axios.get('personalized?limit=6')
            .then(res => {
                if(res.data.code === 200 ){
                    res.data.result.map(item => {
                        if(item.playCount > 100000000){
                            item.playCount = (item.playCount / 100000000).toFixed(1) + '亿'
                        }
                        if(item.playCount > 10000) {
                            item.playCount = (item.playCount / 10000).toFixed(1) + '万'
                        }
                    })
                    this.recommend = res.data.result
                }
            })
        },

        //获取最新音乐信息
        getNewMusic() {
            this.axios.get('personalized/newsong')
            .then(res => {
                if(res.data.code === 200){
                    this.newMusic = res.data.result
                }
            })
        },

        //跳转对应歌单
        goPlayList(id) {
            this.$router.push('/playlist/' + id)
        },
        
        // 跳转播放界面
        goSonger(id,index) {
            this.$router.push('/songer/' + id)
            sessionStorage.setItem('songInfo',JSON.stringify(this.newMusic[index]))
        }
    },    
}

</script>

<style lang="scss" scoped>
    .home{
        .recommend,
        .new-music{
            .title{
                border-left: 2px solid #D43C33;
                padding: 0 8px;
            }
        }
        .recommend{
            .item{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                .item-list{
                    position: relative;
                    width: 32%;
                    .count{
                        position: absolute;
                        display: flex;
                        right: 2px;
                        top: 2px;
                        color: #fff;
                        i{
                            font-size: .8em;
                        }
                        p{
                            padding: 0;
                            margin: 0;
                        }
                    }
                    img{
                        width: 100%;
                    }
                    p{
                        font-size: 12px;
                        padding: 0 5px;
                        height: 2.5em;
                        overflow: hidden;
                    }

                }
            }
        }
        .new-music{
            width: 100%;
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
        }
        img{
            width:100%;
            vertical-align: middle;
        }
    }
</style>