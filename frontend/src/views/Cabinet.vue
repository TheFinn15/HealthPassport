<template>
  <v-card flat>
    <v-card rounded style="margin: 5%" v-if="isAuth">
      <v-tabs color="#FB8C00" icons-and-text grow>
        <v-tab>
          <v-icon>
            person_pin
          </v-icon>
          {{ curLocale.tabs[0].name }}
        </v-tab>
        <v-tab>
          <v-icon>
            block
          </v-icon>
          {{ curLocale.tabs[1].name }}
        </v-tab>
        <v-tab>
          <v-icon>
            devices
          </v-icon>
          {{ curLocale.tabs[2].name }}
        </v-tab>
        <v-tab-item>
          <UserData :locales="curLocale.tabs[0]" :user-info="userInfo" />
        </v-tab-item>
        <v-tab-item>
          <UserConstraint :locales="curLocale.tabs[1]" :user-info="userInfo" />
        </v-tab-item>
        <v-tab-item>
          <UserSessions :locales="curLocale.tabs[2]" :user-info="userInfo" />
        </v-tab-item>
      </v-tabs>
    </v-card>
    <v-hover v-else>
      <template v-slot:default="{ hover }">
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
          <v-fade-transition>
            <v-overlay z-index="5" v-if="hover" absolute color="#FFA726">
              <v-card-title style="text-align: center;">
                Для продолжения <br />
                выполните одно из этих действий
              </v-card-title>
              <v-card-actions style="justify-content: center">
                <v-btn color="#FB8C00" to="/login">
                  Логин
                </v-btn>
                <v-btn color="#FB8C00" to="/register">
                  Регистрация
                </v-btn>
              </v-card-actions>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </template>
    </v-hover>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import UserData from "@/components/cabinet/UserData.vue";
import UserConstraint from "@/components/cabinet/UserConstraint.vue";
import UserSessions from "@/components/cabinet/UserSessions.vue";
import { UserType } from "@/types/user.type";
import { ResultType } from "@/types/result.type";
import { CapsType } from "@/types/caps.type";
import { AuthType } from "@/types/auth.type";
import { ServiceType } from "@/types/service.type";

export default Vue.extend({
  name: "Cabinet",
  components: { UserSessions, UserConstraint, UserData },
  data() {
    return {
      curLocale: {},
      pageLocale: "cabinet",
      isAuth: localStorage["uid"] !== undefined,
      userInfo: {
        fullName: "Test Test Test",
        login: "Testo12345",
        pwd: "",
        email: "telo@te.com",
        phone: "1802345645",
        services: [] as ServiceType[],
        resultsSurvey: [] as ResultType[],
        caps: [] as CapsType[],
        auths: [] as AuthType[]
      } as UserType
    };
  },
  async mounted() {
    if (this.isAuth) {
      this.userInfo = (await this.$store.getters.getCurUser)[0];
    }
  },
  beforeMount() {
    this.$i18n.locale = localStorage["locale"];
    this.curLocale = this.$t(this.pageLocale);
  }
});
</script>

<style scoped></style>
