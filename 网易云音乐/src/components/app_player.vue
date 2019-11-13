<template>
    <div class="songer clearfix">
        <!-- 被隐藏的播放器 -->
        <audio :src="src" autoplay controls ref="audio" v-show="false"></audio>
        <div class="msg">
            <img :src="picUrl" alt="" ref="record">
            <div class="info">
                <p>{{ songName }}</p>
                <p>{{ author }}</p>
            </div>
            <div class="control">
                <i class="iconfont icon-shangyiye" @click="previous"></i>
                <i :class="playing" @click="isPlaying"></i>
                <i class="iconfont icon-xiayiye" @click="next"></i>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            songInfo: [],        //歌曲信息
            songName: '',        //歌曲名
            author: '',          //歌手
            src: '',             //歌曲url  
            picUrl: '',          //唱片图片
            playing: "iconfont icon-bofang",     //播放暂停键切换 
        }
    },
    created() {
        this.getSongInfo()
    },
    methods: {
        
        //获取歌曲信息
        getSongInfo() {
            this.songInfo = []
            this.songInfo.push(this.$store.state.songInfo)
            this.getUrl()
        },
        // 获取歌曲url和图片url
        getUrl() {
            if(Array.isArray(this.songInfo[0])){
                this.src = `https://music.163.com/song/media/outer/url?id=${ this.songInfo[0][this.$store.state.index].id }.mp3`
                this.songName = this.songInfo[0][this.$store.state.index].name
                if(this.songInfo[0][this.$store.state.index].album){
                    this.picUrl = this.songInfo[0][this.$store.state.index].album.blurPicUrl
                    this.author = this.songInfo[0][this.$store.state.index].artists[0].name
                }else if(this.songInfo[0][this.$store.state.index].song){
                    this.picUrl = this.songInfo[0][this.$store.state.index].song.album.blurPicUrl
                    this.author = this.songInfo[0][this.$store.state.index].song.artists[0].name
                }else{
                    this.picUrl = this.songInfo[0][this.$store.state.index].al.picUrl
                    this.author = this.songInfo[0][this.$store.state.index].ar[0].name
                }
            }else{
                this.src = `https://music.163.com/song/media/outer/url?id=${ this.songInfo[0].id }.mp3`
                this.songName = this.songInfo[0].name
                if(this.songInfo[0].album){
                    this.picUrl = this.songInfo[0].album.blurPicUrl
                    this.author = this.songInfo[0].artists[0].name
                }else if(this.songInfo[0].song){
                    this.picUrl = this.songInfo[0].song.album.blurPicUrl
                    this.author = this.songInfo[0].song.artists[0].name
                }else{
                    this.picUrl = this.songInfo[0].al.picUrl
                     this.author = this.songInfo[0].ar[0].name
                }
            }
        },
        //歌曲播放
        rotate() {
            let timer
            let timerOut
            clearTimeout(timer)             //开启定时器前先关闭定时器，防止开启多个定时器
            clearTimeout(timerOut)

            let record = this.$refs.record
            let audio = this.$refs.audio
            let duration = audio.duration
            let currentTime = audio.currentTime
            let gap = ( duration - currentTime ) * 1000

            audio.play()
            this.playing = "iconfont icon-zanting"
            record.style.animationPlayState = "running" 
            
            //如果播放列表有多首歌曲   则播放完当前歌曲后自动切换下一首
            if(Array.isArray(this.songInfo[0])){
                timerOut = setTimeout(() => {   //因为列表多首切换时歌曲时间和已播放时间获取早于播放器src引入，所以通过定时器延后歌曲时间和已播放时间的获取
                    let duration = audio.duration
                    let currentTime = audio.currentTime
                    let gap = ( duration - currentTime ) * 1000
                    console.log('--------------------------------------')
                    console.log(duration)
                    console.log(currentTime)
                    console.log(gap)
                    timer = setTimeout(() => {
                        this.$store.commit('index_add')
                    },gap)
                },5000)
            }else{
                //如果播放列表只有一首歌曲，则播放完毕当前歌曲之后停止图片旋转，并把停止图标切换为播放图标
                timer = setTimeout(() => {
                    audio.pause()
                    record.style.animationPlayState = "paused" 
                    this.playing ="iconfont icon-bofang"
                },gap)
            }
            
        },

        //判断是否播放中，如果否则点击开始播放，如果是则点击停止播放
        isPlaying() {
            let audio = this.$refs.audio
            let record = this.$refs.record
            if(audio.paused){
                this.rotate()
            }else{
                audio.pause()                                           //播放器停止播放
                this.playing = "iconfont icon-bofang"                   //修改播放按钮为播放状态
                record.style.animationPlayState = "paused"              //唱片旋转停止
            }
            
        },
        //上一曲
        previous() {
            this.$store.commit('index_reduce')
        },
        //下一曲
        next() {
            this.$store.commit('index_add')
        },
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
            this.getSongInfo()
            this.rotate()
        },
        //上一曲下一曲切换时改变歌曲状态
		'$store.state.index':function() {
            this.getSongInfo()
            this.rotate()
		},
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
        .msg{
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
                width: 40vw;
                p{
                    &:nth-child(1){
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    &:nth-child(2){
                        font-size: 12px;
                        color: #888;
                    }
                }
            }
            .control{
                display: flex;
                align-items: center;
                .iconfont{
                    font-size: 40px;
                    color: #D43C33;
                    margin: 0 10px;
                    &:nth-child(1),
                    &:nth-child(3){
                        font-size: 1.5em;
                    }
                }
            }
        }
    }
</style>