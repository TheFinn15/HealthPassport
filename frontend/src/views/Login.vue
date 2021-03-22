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
    <v-form ref="authForm">
      <v-container>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              :label="curLocale.labels[0]"
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
              :label="curLocale.labels[1]"
              outlined
              shaped
              v-model="info.pwd"
              color="#FFCC80"
              :rules="rules.text"
            />
          </v-col>
          <v-col cols="12">
            <v-checkbox
              color="#FFCC80"
              :label="curLocale.labels[2]"
              v-model="info.isRememberMe"
            />
          </v-col>
        </v-row>
        <v-btn color="#FB8C00" block outlined @click="doAuth">
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
  name: "Login",
  data() {
    return {
      curLocale: {},
      pageLocale: "login",
      rules: {
        text: [v => v.length !== 0 || this.curLocale.rules.text]
      },
      info: {
        login: "",
        pwd: "",
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
    async doAuth() {
      if (this.$refs.authForm.validate()) {
        this.alert.loader = true;

        const ip = await axios.get("https://api.ipify.org?format=json");
        this.info.ip = ip.data["ip"];

        this.$store.state.userInfo = this.info;
        await this.$store.dispatch("auth");
        setTimeout(() => {
          this.alert.loader = false;
          this.alert.state = true;
          if (localStorage["uid"] !== undefined) {
            const token = jwt.decode(localStorage["uid"]);

            this.alert.info = this.curLocale.alerts[0];

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
            this.alert.info = this.curLocale.alerts[1];
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
