<template>
  <v-dialog v-model="isShow" max-width="420" persistent>
    <v-card>
      <v-card-title style="justify-content: center; display: flex">
        <v-spacer />
        Авторизация
        <v-spacer/>
        <v-btn icon @click="closeForm">
          <v-icon>
            close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-form value="authForm">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                  label="Логин"
                  outlined
                  shaped
                  v-model="info.login"
                  color="#FFCC80"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Пароль"
                  outlined
                  shaped
                  v-model="info.pwd"
                  color="#FFCC80"
              />
            </v-col>
          </v-row>
          <v-btn color="#FB8C00" block outlined @click="doAuth">
            ВОЙТИ
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AuthForm",
  props: ["isShow", "closer"],
  data() {
    return {
      info: {
        login: "",
        pwd: ""
      }
    }
  },
  methods: {
    doAuth() {

    },
    closeForm() {
      this.closer({
        type: "auth"
      })
    }
  }
}
</script>

<style scoped>

</style>
