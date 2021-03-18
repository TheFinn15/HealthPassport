<template>
  <v-card flat style="margin: 5%">
    <v-alert v-model="alert.state" :type="alert.type" outlined border="left">
      <span>
        {{ alert.info }}
      </span>
    </v-alert>
    <v-progress-linear
      height="6"
      indeterminate
      rounded
      :active="alert.loader"
      color="#FB8C00"
    />
    <v-card-title style="justify-content: center; display: flex">
      Регистрация
    </v-card-title>
    <v-form ref="registerForm">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="ФИО"
              outlined
              shaped
              v-model="info.fullName"
              color="#FFCC80"
              :rules="rules.text"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Логин"
              outlined
              shaped
              v-model="info.login"
              color="#FFCC80"
              :rules="rules.text"
            />
          </v-col>
          <v-col cols="6">
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
          <v-col cols="6">
            <v-text-field
              label="E-mail"
              outlined
              shaped
              v-model="info.email"
              color="#FFCC80"
              :rules="rules.email"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Телефон"
              outlined
              shaped
              v-model="info.phone"
              color="#FFCC80"
              :rules="rules.phone"
            />
          </v-col>
          <v-col cols="12">
            <v-checkbox
              color="#FFCC80"
              label="Запомнить меня"
              v-model="info.isRememberMe"
            />
          </v-col>
        </v-row>
        <v-btn color="#FB8C00" block outlined @click="doRegister">
          СОЗДАТЬ АККАУНТ
        </v-btn>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import axios from "axios";
import jwt from "jsonwebtoken";

export default {
  name: "Register",
  data: () => {
    return {
      rules: {
        text: [v => v.length !== 0 || "Пустое поле!"],
        email: [
          v =>
            v.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$") !== null ||
            "Неверный e-mail"
        ],
        phone: [v => v.length === 11 || "Неверный телефон"]
      },
      info: {
        fullName: "",
        login: "",
        pwd: "",
        email: "",
        phone: "",
        isRememberMe: false,
        device: "DEVICE_BROWSER",
        ip: ""
      },
      alert: {
        state: false,
        type: "success",
        info: "",
        loader: false
      }
    };
  },
  methods: {
    async doRegister() {
      if (this.$refs.registerForm.validate()) {
        this.alert.loader = true;

        const ip = await axios.get("https://api.ipify.org?format=json");
        this.info.ip = ip.data["ip"];

        this.$store.state.userInfo = this.info;
        console.log(this.info);
        await this.$store.dispatch("register");
        await this.$store.dispatch("auth");
        setTimeout(() => {
          this.alert.loader = false;
          this.alert.state = true;
          if (localStorage["uid"] !== undefined) {
            const token = jwt.decode(localStorage["uid"]);

            this.alert.info = "Успешная регистрация!";

            if (token.data.role === "ROLE_USER") this.$router.push("/cabinet");
            if (token.data.role === "ROLE_PARTNER")
              this.$router.push("/partner");
            if (token.data.role === "ROLE_ADMIN") this.$router.push("/admin");

            window.location.reload();
          } else {
            this.alert.type = "error";
            this.alert.info = "Ошибка регистрации!";
          }
        }, 1500);
      }
    }
  }
};
</script>

<style scoped></style>
