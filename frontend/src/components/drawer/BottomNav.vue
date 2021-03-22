<template>
  <v-bottom-navigation horizontal app :value="bottomVal" color="#FFB74D">
    <v-btn value="main" to="/">
      <span>
        {{ locales.bottomNav.labels[0] }}
      </span>
      <v-icon>
        home
      </v-icon>
    </v-btn>

    <v-btn v-if="isAuth" value="cabinet" @click="goToCabinet">
      <span>
        {{ locales.bottomNav.labels[1] }}
      </span>
      <v-icon>
        person
      </v-icon>
    </v-btn>

    <v-btn @click="doLogout" v-if="isAuth" value="logout">
      <span>
        {{ locales.bottomNav.labels[2] }}
      </span>
      <v-icon>
        exit_to_app
      </v-icon>
    </v-btn>

    <v-btn to="/login" v-if="!isAuth" value="auth">
      <span>
        {{ locales.bottomNav.labels[3] }}
      </span>
      <v-icon>
        login
      </v-icon>
    </v-btn>

    <v-btn to="/register" v-if="!isAuth" value="register">
      <span>
        {{ locales.bottomNav.labels[4] }}
      </span>
      <v-icon>
        person_add
      </v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import axios from "axios";
import jwt from "jsonwebtoken";

export default {
  name: "BottomNav",
  props: ["bottomVal", "isAuth", "locales"],
  methods: {
    goToCabinet() {
      const token = jwt.decode(localStorage["uid"]);

      if (token.data.role === "ROLE_USER") this.$router.push("/cabinet");
      if (token.data.role === "ROLE_PARTNER") this.$router.push("/partner");
      if (token.data.role === "ROLE_ADMIN") this.$router.push("/admin");
    },
    async doLogout() {
      const ip = await axios.get("https://api.ipify.org?format=json");
      this.$store.state.userInfo = { ip: ip.data["ip"] };
      await this.$store.dispatch("logout");

      if (this.$store.state.errors === "") {
        localStorage.removeItem("uid");
        if (this.$route.path !== "/") window.location.href = "/";
      }
    }
  }
};
</script>

<style scoped></style>
