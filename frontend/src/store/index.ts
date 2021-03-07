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
    async updateTokenIp({state}) {
      await axios({
        method: "PUT",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/token",
        data: state.userInfo,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      });
    },
    async editUser({state}) {
      await axios({
        method: "PUT",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/user",
        data: state.userInfo,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      })
    },
    async logout({state}) {
      await axios({
        method: "POST",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/logout",
        data: state.userInfo,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      });
    },
    async auth({state}) {
      await axios({
        method: "POST",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/login",
        data: state.userInfo
      }).then(resp => {
        localStorage['uid'] = resp.data.token;
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
          Authorization: "Bearer " + localStorage['uid']
        }
      }).then(resp => resp.data);
    }
  },
  modules: {
  },
});
