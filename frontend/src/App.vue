<template>
  <v-app>
    <v-app-bar
      app
      color="#FFA726"
      dark
    >
      <v-toolbar-title>
        <v-icon>
          health_and_safety
        </v-icon>
        <router-link to="/" style="color: inherit; text-decoration: none">
          HealthPassport
        </router-link>
      </v-toolbar-title>
      <v-menu offset-y>
        <template v-slot:activator="{on, attrs}">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>
              translate
            </v-icon>
          </v-btn>
        </template>
      </v-menu>
      <v-spacer />

      <AuthForm :closer="doCloseForm" :is-show="forms.auth" />
      <RegisterForm :closer="doCloseForm" :is-show="forms.register" />
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <footer>
      <BottomNav :show-form="doShowForm" :bottom-val="bottomNav" :is-auth="isAuth" />
    </footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import BottomNav from "@/components/drawer/BottomNav.vue";
import AuthForm from "@/components/auth-form/AuthForm.vue";
import RegisterForm from "@/components/register-form/RegisterForm.vue";

export default Vue.extend({
  name: 'App',
  data: () => ({
    drawer: false,
    isAuth: false,
    bottomNav: "main",
    forms: {
      auth: false,
      register: false,
      alert: {
        state: false,
        info: ['success', '']
      }
    }
  }),
  components: {
    RegisterForm,
    AuthForm,
    BottomNav
  },
  methods: {
    doCloseForm(info: any) {
      console.log(info)
      if (info.type === 'auth') this.forms.auth = false;
      else this.forms.register = false;
    },
    doShowForm(info: any) {
      console.log(info)
      if (info.type === 'auth') this.forms.auth = true;
      else this.forms.register = true;
      // this.forms[info.type === "auth" ? "auth" : "register"] = true;
    }
  }
});
</script>
