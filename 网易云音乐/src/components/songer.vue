<template>
    <div class="songer clearfix">

        <!-- 顶部标题 -->
        <div class="topbar">
            <span class="left" @click="goBack">返回</span>
            <span class="right"> {{ songInfo.name }}</span>
        </div>

        <!-- 被隐藏的播放器 -->
        <audio :src="src" controls autoplay ref="audio" v-show="false"></audio>

        <!-- 唱片机 -->
        <div class="machine clearfix">
            <div class="record" ref="record">
                <img class="main" src="http://s3.music.126.net/mobile-new/img/disc-ip6.png?6979612%E2%80%A6=" alt="" @click="isPlaying">
                <img class="light" src="//s3.music.126.net/mobile-new/img/disc_light-ip6.png?996fc8a…=" alt="" @click="isPlaying">
                <img class="author" :src="picUrl" alt="" @click="isPlaying">
                <i class="iconfont icon-bofang" @click="isPlaying" v-show="playing"></i>
            </div>
            <img class="arm" src="http://s3.music.126.net/mobile-new/img/needle-ip6.png?be4ebbe…=" alt="">
        </div>

        <!-- 歌词 -->
        <div class="lyrices">
            <p class="name">{{ songInfo.name }}</p>
            <p class="author">{{ author }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            songInfo:{},        //歌曲信息
            author:'',          //歌手
            src:'',             //歌曲url  
            picUrl:'',          //唱片图片
            playing: false,     //播放键显示隐藏 
        }
    },
    created() {
        this.getSongInfo()
        this.getLyrics()
        
    },
    methods: {
        //获取歌曲信息
        getSongInfo() {
            this.songInfo = JSON.parse(sessionStorage.getItem('songInfo'))
            this.src = `https://music.163.com/song/media/outer/url?id=${ this.songInfo.id }.mp3`
            
            if(this.songInfo.album){
                this.picUrl = this.songInfo.album.blurPicUrl
                this.author = this.songInfo.artists[0].name
            }else if(this.songInfo.song){
                this.picUrl = this.songInfo.song.album.blurPicUrl
                this.author = this.songInfo.song.artists[0].name
            }else{
                this.picUrl = this.songInfo.al.picUrl
            }
        },

        //歌曲播放完毕停止唱片旋转
        ratote() {
            let timer
            let audio = this.$refs.audio
            let record = this.$refs.record
            let gap = ( audio.duration - audio.currentTime ) * 1000
            let that = this                 //由于定时器会改变this指向，所有通过that绑定this指向
            clearTimeout(timer)             //开启定时器前先关闭定时器，防止开启多个定时器
            timer = setTimeout(function() {
                record.style.animationPlayState = "paused" 
                that.playing = true
            },gap)
        },

        //判断是否播放中，如果否则点击开始播放，如果是则点击停止播放
        isPlaying() {
            let audio = this.$refs.audio
            let record = this.$refs.record
            if(audio.paused){
                audio.play()
                this.playing = false
                record.style.animationPlayState = "running"             //唱片旋转开始
            }else{
                audio.pause()
                this.playing = true
                record.style.animationPlayState = "paused"              //唱片旋转停止
            }
            this.ratote()
        },

        //获取歌词
        getLyrics() {
            this.axios({
                url:'lyric',
                params:{
                    id:this.songInfo.id
                }
            })
            .then(res => {
                console.log(res)
                if(res.data.code === 200){
                    this.lyrics = res.data.result
                }
            })
        },


        //返回按钮
        goBack() {
            this.$router.go(-1)
        }
        
    }
}
</script>

<style lang="scss" scoped>
    .songer{
        min-height: 100vh;
        box-sizing: border-box;
        background-image: linear-gradient( 135deg, #FFCF71 10%, #2376DD 100%);
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
        .machine{
            max-width: 300px;
            min-width: 300px;
            width: 80%;
            margin: 0 auto;
            position: relative;
            .arm{
                width: 30%;
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-15%);
            }
            .record{
                position: relative;
                width: 100%;
                top: 60px;
                animation: rotate 20s infinite linear;
                img{
                    vertical-align: middle;
                }
                .main{
                    width: 100%;
                }
                .light{
                    position: absolute;
                    width: 100%;
                    top: 0;
                    left: 0;
                }
                
                .author{
                    position: absolute;
                    width: 64%;
                    left: 18%;
                    top: 18%;
                    border-radius: 50%;
                }
                i{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #fff;
                    font-size: 500%;
                }
                @keyframes rotate {
                    0%{
                        transform: rotate(0deg)
                    }
                    100%{
                        transform: rotate(360deg)
                    }
                }
            }
        }
        .lyrices{
            margin-top: 100px;
            display: flex;
            flex-direction: column;
            align-items: center;
            p{
                color: #fff;
            }
            
        }
    }
    
</style>