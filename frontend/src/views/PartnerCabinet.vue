<template>
  <v-card style="margin: 2% 10% 0 10%">
    <v-tabs color="#FB8C00" grow show-arrows>
      <v-tab>Наши сервисы</v-tab>
      <v-tab>Основная информация</v-tab>
      <v-tab>Иследования</v-tab>
      <v-tab>Наши клиенты</v-tab>

      <v-tab-item>
        <v-card>
          <v-card-title style="display: flex; justify-content: center">
            Сервисы в системе
            <v-tooltip left color="#FB8C00">
              <template v-slot:activator="{ on, attrs }">
                <v-btn fab absolute right color="success" small v-on="on" v-bind="attrs">
                  <v-icon>
                    create
                  </v-icon>
                </v-btn>
              </template>
              <span>
                Добавить сервис
              </span>
            </v-tooltip>
          </v-card-title>
          <v-divider />
          <OurServicesList :services="services" />
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
import OurServicesList from "@/components/partner-cabinet/OurServicesList.vue";

export default Vue.extend({
  name: "PartnerCabinet",
  components: {OurServicesList},
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
      console.log(this.info)
      this.services = this.info.services;
      console.log(this.services)
    }
  }
});
</script>

<style scoped></style>
