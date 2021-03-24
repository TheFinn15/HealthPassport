<template>
  <v-dialog max-width="420" persistent v-model="isOpen">
    <v-card>
      <v-card-title class="d-flex justify-center">
        {{ locales.title }} {{ info.fullName }}
        <v-btn icon absolute right @click="doCloseForm">
          <v-icon>
            close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-form ref="editForm">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                :label="locales.labels[0]"
                outlined
                shaped
                color="#FB8C00"
                v-model="info.fullName"
                :rules="formRules.text"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                :label="locales.labels[1]"
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
                :label="locales.labels[2]"
                outlined
                shaped
                color="#FB8C00"
                v-model="info.pwd"
                :rules="formRules.text"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                :label="locales.labels[3]"
                outlined
                shaped
                color="#FB8C00"
                v-model="info.email"
                :rules="formRules.email"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                :label="locales.labels[4]"
                outlined
                shaped
                color="#FB8C00"
                v-model="info.phone"
                :rules="formRules.phone"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                :label="locales.labels[5]"
                outlined
                shaped
                color="#FB8C00"
                v-model="info.role"
                :items="roles"
                :rules="formRules.text"
              />
            </v-col>
          </v-row>
          <v-btn block color="success" @click="doEdit" outlined>
            {{ locales.btn }}
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditForm",
  props: [
    "isOpen",
    "info",
    "formRules",
    "closeForm",
    "showAlert",
    "roles",
    "locales"
  ],
  methods: {
    doEdit() {
      const user = new Object(this.info);

      delete user.auths;
      delete user.caps;
      delete user.services;

      if (user.pwd === undefined) delete user.pwd;
      if (user.fullName.length <= 0) delete user.fullName;
      if (user.login.length <= 0) delete user.login;
      if (user.email.length <= 0) delete user.email;
      if (user.phone.length <= 0) delete user.phone;

      this.$store.state.userInfo = user;
      this.$store.dispatch("editUserById", { id: user.id });

      if (this.$store.state.errors === "") {
        this.showAlert({
          info: this.locales.alerts[1],
          color: "success"
        });

        this.closeForm("edit");
      } else {
        this.showAlert({
          info: this.locales.alerts[0],
          color: "red"
        });
      }
    },
    doCloseForm() {
      this.closeForm("edit");
    }
  }
};
</script>

<style scoped></style>
