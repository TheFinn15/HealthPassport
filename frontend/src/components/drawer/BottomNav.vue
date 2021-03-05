<template>
  <v-bottom-navigation horizontal app :value="bottomVal" color="#FFB74D">
      <v-btn to="/">
          <span>
            Главная
          </span>
        <v-icon>
          home
        </v-icon>
      </v-btn>

    <v-btn to="/cabinet" v-if="isAuth">
      <span>
        Личный кабинет
      </span>
      <v-icon>
        person
      </v-icon>
    </v-btn>

      <v-btn to="/login" v-if="!isAuth">
          <span>
            Авторизация
          </span>
        <v-icon>
          login
        </v-icon>
      </v-btn>

      <v-btn to="/register" v-if="!isAuth">
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
export default {
  name: "BottomNav",
  props: ["bottomVal", "isAuth", "locales"],
}
</script>

<style scoped>

</style>
