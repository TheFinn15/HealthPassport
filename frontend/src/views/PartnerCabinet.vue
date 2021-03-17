<template>
  <v-card style="margin: 2% 10% 0 10%">
    <v-tabs color="#FB8C00" grow>
      <v-tab>Наши сервисы</v-tab>
      <v-tab>Основная информация</v-tab>
      <v-tab>Иследования</v-tab>
      <v-tab>Наши клиенты</v-tab>

      <v-tab-item>
        <v-card>
          <v-card-title style="display: flex; justify-content: center">
            Сервисы в системе
            <v-btn fab absolute right color="success">
              <v-icon large>
                create
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-divider />
        </v-card>
      </v-tab-item>
      <v-tab-item></v-tab-item>
      <v-tab-item></v-tab-item>
      <v-tab-item></v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { PartnerType } from "@/types/partner.type";
import { ServiceType } from "@/types/service.type";
import { UserType } from "@/types/user.type";

export default Vue.extend({
  name: "PartnerCabinet",
  data: () => {
    return {
      isAuth: localStorage["uid"] !== undefined,
      info: {} as PartnerType,
      services: [] as ServiceType[],
      surveys: [] as ServiceType[],
      clients: [] as UserType[]
    };
  },
  async mounted() {
    if (this.isAuth) {
      const user = await this.$store.getters.getCurUser;

      this.info = (await this.$store.getters.getPartners).filter(
        (i: PartnerType) => i.user.id === user[0].id
      )[0];

      this.services = this.info.services;
    }
  }
});
</script>

<style scoped></style>
