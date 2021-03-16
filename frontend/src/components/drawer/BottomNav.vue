<template>
  <v-bottom-navigation horizontal app :value="bottomVal" color="#FFB74D">
    <v-btn value="main" to="/">
      <span>
        Главная
      </span>
      <v-icon>
        home
      </v-icon>
    </v-btn>

    <v-btn to="/cabinet" v-if="isAuth" value="cabinet">
      <span>
        Личный кабинет
      </span>
      <v-icon>
        person
      </v-icon>
    </v-btn>

    <v-btn @click="doLogout" v-if="isAuth" value="logout">
      <span>
        Выход
      </span>
      <v-icon>
        exit_to_app
      </v-icon>
    </v-btn>

    <v-btn to="/login" v-if="!isAuth" value="auth">
      <span>
        Авторизация
      </span>
      <v-icon>
        login
      </v-icon>
    </v-btn>

    <v-btn to="/register" v-if="!isAuth" value="register">
      <span>
        Регистрация
      </span>
      <v-icon>
        person_add
      </v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import axios from "axios";

export default {
  name: "BottomNav",
  props: ["bottomVal", "isAuth", "locales"],
  methods: {
    async doLogout() {
      const ip = await axios.get("https://api.ipify.org?format=json");
      this.$store.state.userInfo = { ip: ip.data["ip"] };
      await this.$store.dispatch("logout");

      localStorage.removeItem("uid");
      if (this.$route.path !== "/") window.location.href = "/";
    }
  }
};
</script>

<style scoped></style>
