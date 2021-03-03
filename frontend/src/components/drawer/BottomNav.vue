<template>
  <v-app>
    <v-bottom-navigation app :value="bottomVal" color="#FFB74D" horizontal>
      <v-btn to="/">
          <span>
            Главная
          </span>
        <v-icon>
          home
        </v-icon>
      </v-btn>

      <v-btn @click="doShowAuth" v-if="!isAuth">
          <span>
            Авторизация
          </span>
        <v-icon>
          login
        </v-icon>
      </v-btn>

      <v-btn @click="doShowRegister" v-if="!isAuth">
          <span>
            Регистрация
          </span>
        <v-icon>
          person_add
        </v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: "BottomNav",
  props: ["bottomVal", "isAuth", "locales", "showForm"],
  methods: {
    doShowAuth() {
      this.showForm({
        type: "auth"
      });
    },
    doShowRegister() {
      this.showForm({
        type: "register"
      });
    }
  }
}
</script>

<style scoped>

</style>
