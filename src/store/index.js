import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    statusLogin: false,
    user: ''
  },
  mutations: {
    checkLogin (state, status) {
      state.statusLogin = status
    },
    setUser (state, user) {
      state.user = user
    },
    deleteUser (state) {
      state.user = ''
    }
  }
})
export default store
