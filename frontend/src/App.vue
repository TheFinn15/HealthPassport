<template>
  <v-app>
    <v-app-bar
      app
      color="#FFA726"
      dark
      style="justify-content: center; display: flex"
    >
      <v-toolbar-title>
        <v-icon>
          health_and_safety
        </v-icon>
        <router-link to="/" style="color: inherit; text-decoration: none">
          HealthPassport
        </router-link>
      </v-toolbar-title>
      <v-menu offset-y>
        <template v-slot:activator="{on, attrs}">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>
              translate
            </v-icon>
          </v-btn>
        </template>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <footer>
      <BottomNav :bottom-val="bottomNav" :is-auth="isAuth" />
    </footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import BottomNav from "@/components/drawer/BottomNav.vue";
import jwt, {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken";
import axios from "axios";

export default Vue.extend({
  name: 'App',
  data: () => ({
    drawer: false,
    isAuth: false,
    bottomNav: "main"
  }),
  components: {
    BottomNav
  },
  methods: {},
  async updated() {
    if (localStorage["uid"] !== undefined) {
      const ip = await axios.get("https://api.ipify.org?format=json");
      const user = (await this.$store.getters.getCurUser)[0].auths.filter(i => i.token === localStorage["uid"])[0];
      this.$store.state.userInfo = ip.data["ip"];

      if (user.ip !== ip.data["ip"]) {
        this.$store.state.userInfo = {ip: ip.data["ip"]};
        await this.$store.dispatch("updateTokenIp");
      }
    }
  },
  async mounted() {
    if (/login/i.test(this.$route.fullPath)) {
      this.bottomNav = "auth";
    } else if (/register/i.test(this.$route.fullPath)) {
      this.bottomNav = "register";
    } else if (/cabinet/i.test(this.$route.fullPath)) {
      this.bottomNav = "cabinet";
    } else {
      this.bottomNav = "main";
    }
    if (localStorage["uid"] !== undefined) {
      try {
        try {
          jwt.verify(localStorage['uid'], 'T0p_S3cr3t');

          this.isAuth = true;
        } catch (e: TokenExpiredError) {
          const ip = await axios.get("https://api.ipify.org?format=json");
          this.$store.state.userInfo = ip.data["ip"];
          await this.$store.dispatch("logout");

          localStorage.removeItem("uid");
          window.location.reload();
        }
      } catch (e: JsonWebTokenError) {
        localStorage.removeItem("uid");
        window.location.reload();
      }
    }
  }
});
</script>
