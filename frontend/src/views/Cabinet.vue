<template>
  <v-card rounded style="margin: 5%">
    <v-tabs color="#FB8C00" icons-and-text grow>
      <v-tab>
        <v-icon>
          person_pin
        </v-icon>
        Мои данные
      </v-tab>
      <v-tab>
        <v-icon>
          block
        </v-icon>
        Мои ограничения
      </v-tab>
      <v-tab>
        <v-icon>
          devices
        </v-icon>
        Активные сессии
      </v-tab>
      <v-tab-item>
        <UserData :user-info="userInfo" />
      </v-tab-item>
      <v-tab-item>
        <UserConstraint :user-info="userInfo" />
      </v-tab-item>
      <v-tab-item>
        <UserSessions :user-info="userInfo" />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import UserData from "@/components/cabinet/UserData.vue";
import UserConstraint from "@/components/cabinet/UserConstraint.vue";
import UserSessions from "@/components/cabinet/UserSessions.vue";
import {UserType} from "@/types/user.type";
import {ResultType} from "@/types/result.type";
import {CapsType} from "@/types/caps.type";
import {AuthType} from "@/types/auth.type";
import {CapLevelType} from "@/types/capLevel.type";

export default Vue.extend({
  name: "Cabinet",
  components: { UserSessions, UserConstraint, UserData },
  data() {
    return {
      isAuth: localStorage["uid"] === undefined,
      userInfo: {
        fullName: "",
        login: "",
        pwd: "",
        email: "",
        phone: "",
        services: [],
        resultsSurvey: [] as ResultType[],
        caps: [] as CapsType[],
        auths: [] as AuthType[]
      } as UserType
    };
  },
  async mounted() {
    this.userInfo = (await this.$store.getters.getCurUser)[0];
  }
});
</script>

<style scoped></style>
