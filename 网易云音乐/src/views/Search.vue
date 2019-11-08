<template>
    <div class="search">
        <!-- 搜索框 -->
        <el-input
            placeholder="搜索歌曲、歌手、专辑"
            prefix-icon="el-icon-search"
            v-model="input"
            @keyup.enter.native="getSearchInfo">
        </el-input>


        <!-- 搜索结果列表 -->
        <div class="item" v-show="musicToggle">
            <div class="item-list" v-for="(item,index) in info.songs" :key="item.id" @click="goSonger(item.id,index)">
                <div class="left">
                    <p class="song">{{ item.name }}</p>
                    <p class="author">{{ item.artists[0].name + "-" + item.album.name}}</p>
                </div>
                <i class="iconfont icon-bofang"></i>
            </div>
        </div>

        <!-- 热门搜索 -->
        <div class="hot-search" v-show="hotSearchToggle">
            <p class="title">热门搜索</p>
            <el-tag v-for="item in hotSearch" :key="item.first" type="success" effect="plain" @click="clickTag" ref="tag">{{ item.first }}</el-tag>
        </div>

        <!-- 搜索历史 -->
        <div class="history" v-show="historyToggle">
            <p class="title">搜索历史</p>
            <ul>
                <li v-for="(item,index) in searchHistoryItem" :key="item">
                    <i class="el-icon-time"></i>
                    <span @click="clickHistory">{{ item }}</span>
                    <i class="el-icon-close" @click="delItem(index)"></i>
                </li>
            </ul>
            <p class="clear" @click="clickClean">清空搜索记录</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: '',              //输入框内容
            info:'',                //歌曲信息
            hotSearch:[],           //热搜歌曲
            searchHistoryItem:[],   //搜索历史
            hotSearchToggle: true,  //热门搜索隐藏显示
            historyToggle: true,    //搜索历史显示隐藏
            musicToggle: false      //歌曲列表显示隐藏
        }
    },
    created() {
        this.getHotSearch()
        this.searchHistoryItem = JSON.parse(localStorage.getItem('searchHistoryItem') || '[]')
    },
    methods: {
        //设置搜索历史记录
        searchHistory() {
            this.input = this.input.trim() // 清除空格
            if (this.searchHistoryItem.length > 0) { // 有数据的话 判断
                if (this.searchHistoryItem.indexOf(this.input) !== -1) { // 有相同的，先删除 再添加 
                this.searchHistoryItem.splice(this.searchHistoryItem.indexOf(this.input), 1)
                this.searchHistoryItem.unshift(this.input)
                } else { // 没有相同的 添加
                this.searchHistoryItem.unshift(this.input)
                }
            } else { // 没有数据 添加
                this.searchHistoryItem.unshift(this.input)
            }
            if (this.searchHistoryItem.length > 5) { // 保留六个值
                this.searchHistoryItem.pop()
            }
            localStorage.setItem('searchHistoryItem', JSON.stringify(this.searchHistoryItem))
        },


        //获取搜索信息
        getSearchInfo() {
            this.axios({
                url:'search',
                params:{
                    keywords:this.input.trim()
                }
            })
            .then(res => {
                if(res.data.code === 200){
                    this.info = res.data.result
                    this.searchHistory()
                    this.musicToggle = true
                    this.hotSearchToggle = false
                    this.historyToggle = false
                }
            })
        },

        //获取热搜列表
        getHotSearch() {
            this.axios({
                url:'search/hot'
            })
            .then(res => {
                if(res.data.code === 200){
                    this.hotSearch = res.data.result.hots
                }
            })
        },


        //实现点击标签搜索
        clickTag() {
            this.input = event.target.innerText
            this.getSearchInfo()
        },

        //实现点击搜索历史获取歌曲
        clickHistory(event) {
            this.input = event.target.innerText
            this.getSearchInfo()
        },


        // 点击删除单独搜索历史
        delItem(index) {
            this.searchHistoryItem.splice(index,1)
            localStorage.setItem('searchHistoryItem',JSON.stringify(this.searchHistoryItem))
        },
        
        //点击清空所有搜索记录
        clickClean() {
            this.searchHistoryItem = []
            localStorage.setItem('searchHistoryItem',JSON.stringify(this.searchHistoryItem))
        },


        goSonger(id,index) {
            this.$router.push('/songer/' + id)
            sessionStorage.setItem('songInfo',JSON.stringify(this.info.songs[index]))
        }
    },
    watch: {
        'input':function() {
            if(this.input === ''){
                this.hotSearchToggle = true
                this.historyToggle = true
                this.musicToggle = false
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .search{
        .el-input{
            padding: 10px 0;
            border-bottom: 1px solid #f0f0f0;
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
        .hot-search,
        .history{
            padding: 0 5px;
            .title{
                font-size: .8em;
            }
        }
        .hot-search{
            .el-tag{
                margin-right: 10px;
                margin-bottom: 10px;
                color: #333;
                border: 1px solid #eee;
                border-radius: 100px;
            }
        }
        .history{
            ul{
                list-style: none;
                margin: 0;
                padding: 0;
                li{
                    padding: 5px 0;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    i{
                        margin-right: 10px;
                        color: #ccc;
                    }
                    span{
                        flex-grow: 1;
                    }
                }
                
            }
            .clear{
                text-align: center;
                color: #ccc;
            }
        }
    }
</style>