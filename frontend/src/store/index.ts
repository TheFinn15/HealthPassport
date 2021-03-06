import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
  },
  actions: {
    async auth({state}) {
      await axios({
        method: "POST",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/login",
        data: state.userInfo
      }).then(resp => {
        localStorage['uid'] = resp.data.token;
        console.log(resp);
      }).catch(e => {
        console.error(e);
      });
    },
    async register({state}) {
      await axios({
        method: "POST",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/register",
        data: state.userInfo
      }).catch(e => {
        console.error(e);
      });
    }
  },
  getters: {
    async getCurUser() {
      return await axios({
        method: "GET",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/user",
        headers: {
          Authorization: localStorage['uid']
        }
      }).then(resp => resp.data)
        .catch(e => {
          return e
        });
    },
  },
  modules: {
  },
});
