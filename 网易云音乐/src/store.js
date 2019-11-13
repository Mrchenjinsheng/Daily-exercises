import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songInfo:JSON.parse(localStorage.getItem('songInfo')),
    hotList:null,
    index: 0,
  },
  mutations: {
    index_reduce(state) {
      state.index -=1
      if(state.index < 0){
        state.index = state.songInfo.length-1
      }
      console.log(state.index)
    },
    index_add(state) {
      state.index +=1
      if(state.index > state.songInfo.length-1){
        state.index = 0
      }
      console.log(state.index)
    }
  },
  actions: {
    
  }
})
