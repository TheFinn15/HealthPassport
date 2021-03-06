<template>
  <v-app>
    <v-app-bar
      app
      color="#FFA726"
      dark
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
import jwt from "jsonwebtoken";

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
  mounted() {
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
        jwt.verify(localStorage['uid'], 'T0p_S3cr3t');

        this.isAuth = true;
      } catch (e) {
        localStorage.removeItem("uid");
        window.location.reload();
      }
    }
  }
});
</script>
