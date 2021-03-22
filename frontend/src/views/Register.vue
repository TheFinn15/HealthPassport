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
      {{ curLocale.title }}
    </v-card-title>
    <v-form ref="registerForm">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              :label="curLocale.labels[0]"
              outlined
              shaped
              v-model="info.fullName"
              color="#FFCC80"
              :rules="rules.text"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              :label="curLocale.labels[1]"
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
              :label="curLocale.labels[2]"
              outlined
              shaped
              v-model="info.pwd"
              color="#FFCC80"
              :rules="rules.text"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              :label="curLocale.labels[3]"
              outlined
              shaped
              v-model="info.email"
              color="#FFCC80"
              :rules="rules.email"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              :label="curLocale.labels[4]"
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
              :label="curLocale.labels[5]"
              v-model="info.isRememberMe"
            />
          </v-col>
        </v-row>
        <v-btn color="#FB8C00" block outlined @click="doRegister">
          {{ curLocale.btn }}
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
      curLocale: {},
      pageLocale: "register",
      rules: {
        text: [v => v.length !== 0 || this.curLocale.rules.text],
        email: [
          v =>
            v.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$") !== null ||
            this.curLocale.rules.email
        ],
        phone: [v => v.length === 11 || this.curLocale.rules.phone]
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

            setTimeout(() => {
              if (token.data.role === "ROLE_USER")
                this.$router.push("/cabinet");
              if (token.data.role === "ROLE_PARTNER")
                this.$router.push("/partner");
              if (token.data.role === "ROLE_ADMIN") this.$router.push("/admin");

              window.location.reload();
            }, 1500);
          } else {
            this.alert.type = "error";
            this.alert.info = "Ошибка регистрации!";
          }
        }, 1500);
      }
    }
  },
  beforeMount() {
    this.$i18n.locale = localStorage["locale"];
    this.curLocale = this.$t(this.pageLocale);
  }
};
</script>

<style scoped></style>
