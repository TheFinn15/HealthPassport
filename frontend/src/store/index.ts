import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    service: {},
    result: {},
    caps: {},
    errors: ""
  },
  mutations: {},
  actions: {
    async editCap({state}, payload) {
      await axios({
        method: "PUT",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/cap/" + payload.id,
        data: state.caps,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).catch(e => {
        state.errors = e
      });
    },
    async deleteCap({state}, payload) {
      await axios({
        method: "DELETE",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/cap/" + payload.id,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).catch(e => {
        state.errors = e
      });
    },
    async editResult({state}, payload) {
      await axios({
        method: "PUT",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/result/" + payload.id,
        data: state.result,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).catch(e => {
        state.errors = e
      });
    },
    async deleteResult({state}, payload) {
      await axios({
        method: "DELETE",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/result/" + payload.id,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).catch(e => {
        state.errors = e
      });
    },
    async editPartner({state}, payload) {
      await axios({
        method: "PUT",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/partner/" + payload.id,
        data: state.userInfo,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).catch(e => {
        state.errors = e
      });
    },
    async deletePartner({state}, payload) {
      await axios({
        method: "DELETE",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/partner/" + payload.id,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).catch(e => {
        state.errors = e
      });
    },
    async createCapability({ state }) {
      await axios({
        method: "POST",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/caps",
        data: state.caps,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      });
    },
    async createResult({ state }) {
      await axios({
        method: "POST",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/result",
        data: state.result,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      });
    },
    async createPartner({ state }) {
      await axios({
        method: "POST",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/partner",
        data: state.userInfo,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      });
    },
    async updateTokenIp({ state }) {
      await axios({
        method: "PUT",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/token",
        data: state.userInfo,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      });
    },
    async editUserById({ state }, payload) {
      await axios({
        method: "PUT",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/user/" + payload.id,
        data: state.userInfo,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).catch(e => {
        state.errors = e.message;
      });
    },
    async editUser({ state }) {
      await axios({
        method: "PUT",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/user",
        data: state.userInfo,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).catch(e => {
        state.errors = e.message;
      });
    },
    async deleteUserById({state}, payload) {
      await axios({
        method: "DELETE",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/user/" + payload.id,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).catch(e => {
        state.errors = e
      });
    },
    async logout({ state }) {
      await axios({
        method: "POST",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/logout",
        data: state.userInfo,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).catch(e => {
        state.errors = e.message;
      });
    },
    async auth({ state }) {
      await axios({
        method: "POST",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/login",
        data: state.userInfo
      })
        .then(resp => {
          localStorage["uid"] = resp.data.token;
        })
        .catch(e => {
          console.error(e);
        });
    },
    async register({ state }) {
      await axios({
        method: "POST",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/register",
        data: state.userInfo
      }).catch(e => {
        console.error(e);
      });
    },
    async addService({state}) {
      await axios({
        method: "POST",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/service",
        data: state.service,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).catch(e => {
        state.errors = e
      });
    },
    async editService({state}, payload) {
      await axios({
        method: "PUT",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/service/" + payload.id,
        data: state.service,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).catch(e => {
        state.errors = e
      });
    },
    async deleteService({state}, payload) {
      await axios({
        method: "DELETE",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/service/" + payload.id,
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).catch(e => {
        state.errors = e
      });
    }
  },
  getters: {
    async getCaps() {
      return await axios({
        method: "GET",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/caps",
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).then(resp => resp.data)
    },
    async getResults() {
      return await axios({
        method: "GET",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/results",
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).then(resp => resp.data)
    },
    async getPartners() {
      return await axios({
        method: "GET",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/partners",
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).then(resp => resp.data)
    },
    async getServices() {
      return await axios({
        method: "GET",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/services",
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).then(resp => resp.data);
    },
    async getCurUser() {
      return await axios({
        method: "GET",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/user",
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).then(resp => resp.data);
    },
    async getAllUsers() {
      return await axios({
        method: "GET",
        url: "http://" + process.env.VUE_APP_SERVER + "/api/users",
        headers: {
          Authorization: "Bearer " + localStorage["uid"]
        }
      }).then(resp => resp.data);
    }
  },
  modules: {}
});
