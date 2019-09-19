import VueRouter from 'vue-router'
import home from './components/tabbar/Home.vue'
import member from './components/tabbar/Member.vue'
import cart from './components/tabbar/Cart.vue'
import search from './components/tabbar/Search.vue'
import newslist from './components/news/NewsList.vue'
import newsinfo from './components/news/NewsInfo.vue'
import photoslist from './components/photos/PhotosList.vue'
import photoinfo from './components/photos/PhotoInfo.vue'
import goodslist from './components/Goods/GoodsList.vue'
import goodsinfo from './components/Goods/GoodsInfo.vue'
import goodsdesc from './components/Goods/Goodsdesc.vue'
import goodscomment from './components/Goods/GoodsComment.vue'
let router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/member',component:member},
        {path:'/cart',component:cart},
        {path:'/search',component:search},
        {path:'/home/newslist',component:newslist},
        {path:'/home/newsinfo/:id',component:newsinfo},
        {path:'/home/photoslist',component:photoslist},
        {path:'/home/photoinfo/:id',component:photoinfo},
        {path:'/home/goodslist',component:goodslist},
        {path:'/home/goodsinfo/:id',component:goodsinfo,name:'goodsinfo'},
        {path:'/home/goodsdesc/:id',component:goodsdesc,name:'goodsdesc'},
        {path:'/home/goodscomment/:id',component:goodscomment,name:'goodscomment'}
    ],
    linkActiveClass:'mui-active'
})
export default router