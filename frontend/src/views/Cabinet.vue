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
        <UserData :user="userInfo" />
      </v-tab-item>
      <v-tab-item>
        <UserConstraint :constraint="userInfo" />
      </v-tab-item>
      <v-tab-item>
        <UserSessions :user="userInfo" />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import UserData from "@/components/cabinet/UserData";
import UserConstraint from "@/components/cabinet/UserConstraint";
import UserSessions from "@/components/cabinet/UserSessions";
export default {
  name: "Cabinet",
  components: {UserSessions, UserConstraint, UserData},
  data() {
    return {
      isAuth: localStorage["uid"] === undefined,
      userInfo: {
        fullName: "",
        login: "",
        pwd: "",
        email: "",
        phone: "",
      }
    }
  },
  async mounted() {
    this.userInfo = (await this.$store.getters.getCurUser)[0];
  }
}
</script>

<style scoped>

</style>
