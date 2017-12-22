import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    statusLogin: false
  },
  mutations: {
    checkLogin (state, status) {
      state.statusLogin = status
    }
  }
})
export default store
