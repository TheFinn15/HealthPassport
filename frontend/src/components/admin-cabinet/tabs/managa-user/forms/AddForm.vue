<template>
  <v-dialog max-width="420" persistent v-model="isOpen">
    <v-card>
      <v-card-title class="d-flex justify-center">
        Создать пользователя
        <v-btn icon absolute right @click="doCloseForm">
          <v-icon>
            close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-form ref="addForm">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="ФИО"
                outlined
                shaped
                color="#FB8C00"
                v-model="info.fullName"
                :rules="formRules.text"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Логин"
                outlined
                shaped
                color="#FB8C00"
                v-model="info.login"
                :rules="formRules.text"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                type="password"
                label="Пароль"
                outlined
                shaped
                color="#FB8C00"
                v-model="info.pwd"
                :rules="formRules.text"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="E-mail"
                outlined
                shaped
                color="#FB8C00"
                v-model="info.email"
                :rules="formRules.email"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Телефон"
                outlined
                shaped
                color="#FB8C00"
                v-model="info.phone"
                :rules="formRules.phone"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                label="Роль пользователя"
                outlined
                shaped
                color="#FB8C00"
                v-model="info.role"
                :items="roles"
                :rules="formRules.text"
              />
            </v-col>
          </v-row>
          <v-btn block color="success" @click="doAdd" outlined>
            СОЗДАТЬ
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddForm",
  props: ["isOpen", "closeForm", "showAlert", "roles", "formRules", "update"],
  data() {
    return {
      info: {
        fullName: "",
        login: "",
        pwd: "",
        email: "",
        phone: "",
        role: ""
      }
    };
  },
  methods: {
    doAdd() {
      if (this.$refs.addForm.validate()) {
        this.$store.state.userInfo = this.info;
        this.$store.dispatch("register");

        if (this.$store.state.errors === "") {
          this.showAlert({
            info: "Успешно создан",
            color: "success"
          });

          this.update({ action: "add", item: this.info });

          this.closeForm("add");
        } else {
          this.showAlert({
            info: "Ошибка при создание",
            color: "red"
          });
        }
      }
    },
    doCloseForm() {
      this.closeForm("add");
    }
  }
};
</script>

<style scoped></style>
