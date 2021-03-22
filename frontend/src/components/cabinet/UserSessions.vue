<template>
  <v-card>
    <v-card-title style="display: flex; justify-content: center">
      {{ locales.context.title }}
      <v-btn text color="red" absolute left @click="hardLogout">
        {{ locales.context.btnLogout }}
      </v-btn>
    </v-card-title>
    <v-divider />
    <v-card elevation="20">
      <v-card-title>
        {{ locales.context.currentSession }}
      </v-card-title>
      <v-divider />
      <UserSessionsItem :locales="locales" :session="activeSession" />
    </v-card>
    <v-card v-if="otherSessions.length > 0">
      <v-card-title>
        {{ locales.context.otherSession }}
      </v-card-title>
      <v-divider />
      <UserSessionsList :locales="locales" :sessions="otherSessions" />
    </v-card>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { AuthType } from "@/types/auth.type";
import UserSessionsList from "@/components/cabinet/UserSessionsList.vue";
import UserSessionsItem from "@/components/cabinet/UserSessionsItem.vue";

export default Vue.extend({
  name: "UserSessions",
  components: { UserSessionsList, UserSessionsItem },
  props: ["userInfo", "locales"],
  data() {
    return {
      otherSessions: [] as AuthType[],
      activeSession: {} as any
    };
  },
  methods: {
    async hardLogout() {
      for (const item of this.userInfo.auths) {
        this.$store.state.userInfo = { ip: item.ip };
        await this.$store.dispatch("logout");
      }
      localStorage.removeItem("uid");
      window.location.href = "/";
    }
  },
  beforeMount() {
    this.activeSession = this.userInfo.auths.filter(
      (i: AuthType) => i.token === localStorage["uid"]
    )[0];
    this.activeSession["currentSession"] = true;

    this.otherSessions = this.userInfo.auths.filter(
      (i: AuthType) => i.token !== localStorage["uid"]
    );
  }
});
</script>

<style scoped></style>
