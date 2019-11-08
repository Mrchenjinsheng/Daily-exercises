import Vue from 'vue'
import app from './App.vue'
import VueRouter from 'vue-router'
import router from './router.js'
Vue.use(VueRouter)

//引入mintUI相关组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)
import mintUI from 'mint-ui'
Vue.use(mintUI)
import './lib/css/mui.css'

//引入axios相关组件并设置axios相关配置
import axios from 'axios'
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://www.liulongbin.top:3005'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//引入mui样式和图标相关组件
import './lib/css/mui.css'
import './lib/css/icons-extra.css'
import './lib/fonts/mui-icons-extra.ttf'

//通过moment组件进行时间格式化设置
import moment from 'moment'
Vue.filter('dateFormat',function(dataStr,parrent="YYYY-MM-DD") {
    return moment(dataStr).format(parrent)
})

// vue图片预览组件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
Vue.use(VuePreview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: {top: 0, bottom: 0},
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false
})

//引入vuex组件
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
      cart:JSON.parse(localStorage.getItem('cart') || '[]')
    },
    mutations: {
      //商品添加购物车
      addToCart(state,goodsInfo) {
        let flag = false
        state.cart.some(item => {
          if(item.id === goodsInfo.id){
            item.count = parseInt(item.count) + parseInt(goodsInfo.count)
            flag = true
            return true
          }
        })
        if(!flag) {
          state.cart.push(goodsInfo)
        }
        localStorage.setItem('cart',JSON.stringify(state.cart))
      },
      //购物车对商品数量变更
      updataGoodsCount(state,goodsInfo) {
        state.cart.some(item => {
          if(item.id == goodsInfo.id){
            item.count = parseInt(goodsInfo.count)
            return true
          }
        })
        localStorage.setItem('cart',JSON.stringify(state.cart))
      },
      //删除商品
      removeCart(state,id) {
        state.cart.some((item,i) => {
          if(item.id == id){
            state.cart.splice(i,1)
            return true
          }
        })
        localStorage.setItem('cart',JSON.stringify(state.cart))
      },
      //选中状态变更时，同步修改本地数据
      updataSelected(state,data) {
        state.cart.some(item => {
          if(item.id == data.id){
            item.selected = data.selected
            return true
          }
        })
        localStorage.setItem('cart',JSON.stringify(state.cart))
      }
    },
    getters:{
      //获取徽标全部数量
      getTotal(state) {
        let total = 0
        state.cart.forEach(item => {
          total += parseInt(item.count)
        })
        return total
      },
      //获取每种商品对应数量
      getGoodsCount(state) {
        let count = []
        state.cart.forEach(item => {
          count[item.id] = item.count
        })
        return count
      },
      //获取每种商品选中状态
      getSelected(state) {
        let selected = {}
        state.cart.forEach(item => {
          selected[item.id] = item.selected
        })
        return selected
      },
      //获取商品总价
      getTotalPrice(state) {
        let info = {
          count: 0,
          totalPrice:0
        }
        state.cart.forEach(item => {
          if(item.selected) {
            info.count += parseInt(item.count)
            info.totalPrice += parseInt(item.price * item.count)
          }
        })
        return info
      }
      
    }
  })


import './main.css'
new Vue({
    el:'#app',
    data:{
        
    },
    render:c=>c(app),
    router,
    store
})