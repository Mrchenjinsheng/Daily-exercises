<template>
    <div class="songer clearfix">
        <!-- 被隐藏的播放器 -->
        <audio :src="src" autoplay controls ref="audio" v-show="false"></audio>
        <div class="control">
            <img :src="picUrl" alt="" ref="record" @click="goSonger(songInfo.id)">
            <div class="info">
                <p>{{songInfo.name}}</p>
                <p>{{author}}</p>
            </div>
            <i :class="playing" @click="isPlaying"></i>
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
            playing: "iconfont icon-bofang",     //播放暂停键切换 
        }
    },
    created() {
        this.getSongInfo()
    },
    methods: {
        //获取歌曲信息
        getSongInfo() {
            this.songInfo = this.$store.state.songInfo
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
                that.playing ="iconfont icon-bofang"
            },gap)
        },

        //判断是否播放中，如果否则点击开始播放，如果是则点击停止播放
        isPlaying() {
            let audio = this.$refs.audio
            let record = this.$refs.record
            if(audio.paused){
                audio.play()
                this.playing = "iconfont icon-zanting"
                record.style.animationPlayState = "running"             //唱片旋转开始
            }else{
                audio.pause()
                this.playing = "iconfont icon-bofang"
                record.style.animationPlayState = "paused"              //唱片旋转停止
            }
            this.ratote()
        },
        goSonger(id) {
            this.$router.push(`/songer/${id}`)
        }
    },
    mounted() {
        //默认不播放，歌曲图片不旋转
        let audio = this.$refs.audio
        let record = this.$refs.record
        audio.pause()
        record.style.animationPlayState = "paused"
    },
    watch: {
        //$store.state.songInfo数据更新时修改播放器相关状态
		'$store.state.songInfo':function() {
            this.songInfo = this.$store.state.songInfo
            this.getSongInfo()
            let audio = this.$refs.audio
            let record = this.$refs.record
            audio.play()
            this.playing = "iconfont icon-zanting"
            record.style.animationPlayState = "running" 
		}
    },
}
</script>

<style lang="scss" scoped>
    .songer{
        p{
            margin: 0;
            padding: 0;
        }
        width: 100%;
        height: 60px;
        background-color: #fff;
        .control{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin: 0 15px;
                animation: rotate 20s infinite linear;
                background-color: #999;
            }
            @keyframes rotate {
                0%{
                    transform: rotate(0deg)
                }
                100%{
                    transform: rotate(360deg)
                }
            }
            .info{
                flex-grow: 1;
                p{
                    &:nth-child(2){
                        font-size: 12px;
                        color: #888;
                    }
                }
            }
            .iconfont{
                font-size: 40px;
                color: #D43C33;
                margin: 0 15px;
            }
        }
    }
</style>