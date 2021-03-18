<template>
  <v-card style="margin: 2% 10% 0 10%">
    <v-tabs color="#FB8C00" grow show-arrows>
      <v-tab>Наши сервисы</v-tab>
      <v-tab>Основная информация</v-tab>
      <v-tab>Иследования</v-tab>
      <v-tab>Наши клиенты</v-tab>

      <v-tab-item>
        <v-card>
          <AddForm
            :is-open="isOpen"
            :info="forms"
            :do-close-form="doCloseForm"
            :update-service="doUpdateServices"
          />
          <v-card-title style="display: flex; justify-content: center">
            Сервисы в системе
            <v-tooltip left color="#FB8C00">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  absolute
                  right
                  color="success"
                  small
                  v-on="on"
                  v-bind="attrs"
                  @click="isOpen = true"
                >
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
          <OurServicesList
            :do-delete-service="doRemoveService"
            :services="services"
          />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <UserData :user-info="info.user" />
      </v-tab-item>
      <v-tab-item>
        <SurveysList :surveys="surveys" />
      </v-tab-item>
      <v-tab-item>
        <OurClientsList :clients="clients" :all-results="surveys" />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { PartnerType } from "@/types/partner.type";
import { ServiceType } from "@/types/service.type";
import { UserType } from "@/types/user.type";
import OurServicesList from "@/components/partner-cabinet/OurServicesList.vue";
import AddForm from "@/components/partner-cabinet/forms/AddForm.vue";
import UserData from "@/components/cabinet/UserData.vue";
import SurveysList from "@/components/partner-cabinet/SurveysList.vue";
import { ResultType } from "@/types/result.type";
import OurClientsList from "@/components/partner-cabinet/OurClientsList.vue";

export default Vue.extend({
  name: "PartnerCabinet",
  components: {
    OurClientsList,
    SurveysList,
    UserData,
    AddForm,
    OurServicesList
  },
  data: () => {
    return {
      isAuth: localStorage["uid"] !== undefined,
      info: {} as PartnerType,
      services: [] as ServiceType[],
      surveys: [] as ResultType[],
      clients: [] as UserType[],
      isOpen: false,
      forms: {
        name: "",
        type: "",
        info: ""
      }
    };
  },
  methods: {
    doCloseForm(info: { state: boolean }) {
      this.isOpen = info.state;
    },
    doRemoveService(id: number) {
      this.services = this.services.filter((i: ServiceType) => i.id !== id);
    },
    doUpdateServices(item: ServiceType) {
      this.services.push(item);
    }
  },
  async mounted() {
    if (this.isAuth) {
      const user = await this.$store.getters.getCurUser;

      this.info = (await this.$store.getters.getPartners).filter(
        (i: PartnerType) => i.user.id === user[0].id
      )[0];
      this.services = this.info.services;

      this.surveys = (await this.$store.getters.getResults).filter(
        (i: ResultType) => i.survey.partner.id === this.info.id
      );

      this.clients = this.surveys.map(i => i.user);
    }
  }
});
</script>

<style scoped></style>
