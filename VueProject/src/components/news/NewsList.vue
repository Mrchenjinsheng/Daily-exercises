<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
					<router-link :to="'/home/newsinfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h3 class="title">{{item.title}}</h3>
							<p class='mui-ellipsis'>
                                <span class="tiem">发表时间:{{item.add_time | dateFormat('YYYY-MM-DD')}}</span>
                                <span class="click">点击:{{item.click}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>     
    </div>
</template>
<script>

export default {
    data() {
        return {
            newsList:[]
        }
    },
    created() {
        this.getNewsList()
    },
    methods: {
        //获取新闻列表
        getNewsList() {
            this.axios.get('api/getnewslist')
            .then(result => {
                if( result.data.status === 0 ){
                    this.newsList = result.data.message
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
    .mui-table-view{
        .title{
            font-size: 14px;
        }
        .mui-ellipsis{
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            color: #226aff;
        }
    }
</style>