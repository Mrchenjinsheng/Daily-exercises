import Vue from 'vue'
import Router from 'vue-router'
import recommend from './views/Recommend.vue'
import playList from './components/recommend/playList.vue'
import songer from './components/songer.vue'
import hot from './views/Hot.vue'
import search from './views/Search.vue';


Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    { path:'/',redirect:'/recommend' },
    { path:'/recommend',component:recommend },
    { path:'/playlist/:id',component:playList },
    { path:'/songer/:id',component:songer },
    { path:'/hot',component:hot },
    { path:'/search',component:search }
  ]
})
