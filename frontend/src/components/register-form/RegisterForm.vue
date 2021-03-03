<template>
  <v-dialog v-model="isShow" max-width="420" persistent>
    <v-card>
      <v-card-title style="justify-content: center; display: flex">
        <v-spacer />
        Регистрация
        <v-spacer/>
        <v-btn icon @click="closeForm">
          <v-icon>
            close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-form value="registerForm">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                  label="ФИО"
                  outlined
                  shaped
                  v-model="info.fullName"
                  color="#FFCC80"
                  :rules="rules.text"
              />
            </v-col>
            <v-col>
              <v-text-field
                  label="Логин"
                  outlined
                  shaped
                  v-model="info.login"
                  color="#FFCC80"
                  :rules="rules.text"
              />
            </v-col>
            <v-col>
              <v-text-field
                  label="Пароль"
                  outlined
                  shaped
                  v-model="info.pwd"
                  color="#FFCC80"
                  :rules="rules.text"
              />
            </v-col>
            <v-col>
              <v-text-field
                  label="E-mail"
                  outlined
                  shaped
                  v-model="info.email"
                  color="#FFCC80"
                  :rules="rules.email"
              />
            </v-col>
            <v-col>
              <v-text-field
                  label="Телефон"
                  outlined
                  shaped
                  v-model="info.phone"
                  color="#FFCC80"
                  :rules="rules.phone"
              />
            </v-col>
          </v-row>
          <v-btn color="#FB8C00" block outlined @click="doRegister">
            СОЗДАТЬ АККАУНТ
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "RegisterForm",
  props: ['isShow', 'closer'],
  data: () => {
    return {
      rules: {
        text: [
          v => v.length > 0 || "Пустое поле!"
        ],
        email: [
            v => v.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$") !== null || "Невепеый e-mail"
        ],
        phone: [
            v => v.length > 11 || "Неверный телефон"
        ]
      },
      info: {
        fullName: "",
        login: "",
        pwd: "",
        email: "",
        phone: ""
      }
    }
  },
  methods: {
    doRegister() {

    },
    closeForm() {
      this.closer({
        type: "register"
      })
    }
  }
}
</script>

<style scoped>

</style>
