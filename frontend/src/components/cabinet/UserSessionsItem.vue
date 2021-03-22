<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        cols="1"
        style="display: flex; justify-content: center; align-items: center"
      >
        <v-tooltip bottom color="#FB8C00">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="red" v-on="on" v-bind="attrs" @click="logout">
              <v-icon x-large>
                close
              </v-icon>
            </v-btn>
          </template>
          <span>
            {{ locales.context.session.btnLogout }}
          </span>
        </v-tooltip>
      </v-col>
      <v-col cols="4">
        <v-card-subtitle style="padding-bottom: 0">
          {{ locales.context.session.device }}
        </v-card-subtitle>
        <v-card-title>
          {{ analyzeDevice }}
        </v-card-title>
        <v-card-subtitle>
          {{ session.ip }}
        </v-card-subtitle>
      </v-col>
      <v-col cols="4">
        <v-card-subtitle style="padding-bottom: 0">
          {{ locales.context.session.location }}
        </v-card-subtitle>
        <v-card-title>
          {{ session.location }}
        </v-card-title>
      </v-col>
      <v-col cols="3">
        <v-card-subtitle style="padding-bottom: 0">
          {{ locales.context.session.lastOnline }}
        </v-card-subtitle>
        <v-card-title>
          {{ mapLastOnline }}
        </v-card-title>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "UserSessionsItem",
  props: ["session", "locales"],
  methods: {
    async logout() {
      this.$store.state.userInfo = { ip: this.session.ip };
      await this.$store.dispatch("logout");
      if (this.session.currentSession) {
        localStorage.removeItem("uid");
        window.location.href = "/";
      }
    }
  },
  computed: {
    analyzeDevice() {
      let res = "";

      if (this.session.typeDevice === "DEVICE_BROWSER")
        res = this.locales.context.session.typeDevice[0];
      if (this.session.typeDevice === "DEVICE_IOS") res = "iOS";
      if (this.session.typeDevice === "DEVICE_ANDROID") res = "Android";

      return res;
    },
    mapLastOnline() {
      const dateTime = new Date(this.session.lastOnlineTime);
      return dateTime.toLocaleString();
    }
  }
});
</script>

<style scoped></style>
