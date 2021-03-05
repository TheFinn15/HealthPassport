<template>
  <v-card flat style="margin: 5%">
    <v-card-title style="justify-content: center; display: flex">
      Авторизация
    </v-card-title>
    <v-form value="authForm">
      <v-container>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
                label="Логин"
                outlined
                shaped
                v-model="info.login"
                color="#FFCC80"
                :rules="rules.text"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
                type="password"
                label="Пароль"
                outlined
                shaped
                v-model="info.pwd"
                color="#FFCC80"
                :rules="rules.text"
            />
          </v-col>
          <v-col cols="12">
            <v-checkbox
                label="Запомнить меня"
                v-model="info.isRememberMe"
            />
          </v-col>
        </v-row>
        <v-btn color="#FB8C00" block outlined @click="doAuth">
          ВОЙТИ
        </v-btn>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      rules: {
        text: [
          v => v.length > 0 || "Пустое поле!"
        ]
      },
      info: {
        login: "",
        pwd: "",
        isRememberMe: false
      }
    }
  },
  methods: {
    doAuth() {

    },
  }
}
</script>

<style scoped>

</style>
