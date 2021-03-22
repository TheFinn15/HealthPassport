<template>
  <v-card flat style="margin: 2% 10% 0 10%">
    <v-container v-if="isAuth">
      <v-row>
        <v-col cols="12">
          <v-menu offset-x>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon large>
                  filter_list
                </v-icon>
              </v-btn>
            </template>
            <v-card rounded>
              <v-card-subtitle>
                {{ curLocale.filter.subtitle }}
              </v-card-subtitle>
              <v-divider />
              <v-container>
                <v-checkbox
                  :label="curLocale.filter.items[0]"
                  v-model="filterList.ill"
                  value="Ill"
                />
                <v-checkbox
                  :label="curLocale.filter.items[1]"
                  v-model="filterList.survey"
                  value="Survey"
                />
                <v-checkbox
                  :label="curLocale.filter.items[2]"
                  v-model="filterList.vaccine"
                  value="Vaccine"
                />
              </v-container>
            </v-card>
          </v-menu>
          <v-tooltip right color="#FB8C00">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-on="on"
                v-bind="attrs"
                @click="showAddService = true"
              >
                <v-icon large>
                  add
                </v-icon>
              </v-btn>
            </template>
            <span>
              {{ curLocale.addServices.subtitle }}
            </span>
          </v-tooltip>
          <AddService
            :update-service="updateService"
            :is-open="showAddService"
            :closer="doClose"
            :recommends="recommends"
            :locales="curLocale"
          />
        </v-col>
        <v-col cols="12">
          <v-snackbar
            color="red"
            top
            outlined
            timeout="2500"
            v-model="constraintInfo"
          >
            <span>
              {{ curLocale.alert.constraintLabel }}
            </span>
            <template v-slot:action="{ attrs }">
              <v-btn
                v-bind="attrs"
                text
                color="red"
                @click="constraintInfo = false"
              >
                {{ curLocale.alert.closeLabel }}
              </v-btn>
            </template>
          </v-snackbar>
          <v-card rounded style="padding: 2%">
            <v-card-title style="justify-content: center; display: flex;">
              {{ curLocale.userData.title }}
              <v-btn
                v-if="services.ills.length > 0"
                @click="constraintInfo = !constraintInfo"
                outlined
                color="red"
                absolute
                right
              >
                {{ curLocale.userData.btns[0] }}
              </v-btn>
              <v-btn v-else text color="green" absolute right>
                {{ curLocale.userData.btns[1] }}
              </v-btn>
            </v-card-title>
            <v-list>
              <Ill
                :locales="curLocale"
                v-if="!filterList.ill"
                :ills="services.ills"
              />
              <Survey
                :locales="curLocale"
                v-if="!filterList.survey"
                :surveys="services.surveys"
              />
              <Vaccine
                :locales="curLocale"
                v-if="!filterList.vaccine"
                :vaccines="services.vaccines"
              />
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row>
        <v-col cols="12">
          <v-switch
            style="justify-content: center; display: flex"
            color="#FFB74D"
            label="Вкл. систему"
            v-if="!exampleData.hasConstraint"
            v-model="exampleData.hasConstraint"
            @click="randomizeExampleData"
          />
          <v-switch
            style="justify-content: center; display: flex"
            color="#FFB74D"
            label="Выкл. систему"
            v-else
            v-model="exampleData.hasConstraint"
            @click="randomizeExampleData"
          />
        </v-col>
        <v-col cols="12">
          <v-card rounded style="padding: 2%">
            <v-card-title style="justify-content: center; display: flex;">
              {{ curLocale.exampleData.title }}
              <v-btn
                v-if="exampleData.ill.length > 0"
                @click="hideExample = true"
                outlined
                color="red"
                absolute
                right
              >
                {{ curLocale.exampleData.btns[0] }}
              </v-btn>
              <v-btn v-else text color="green" absolute right>
                {{ curLocale.exampleData.btns[1] }}
              </v-btn>
            </v-card-title>
            <v-list>
              <Ill :locales="curLocale" :ills="exampleData.ill" />
              <Survey :locales="curLocale" :surveys="exampleData.surveys" />
              <Vaccine :locales="curLocale" :vaccines="exampleData.vaccines" />
            </v-list>
          </v-card>
          <v-overlay :value="hideExample" z-index="0" style="padding: 2%">
            <v-card rounded light max-width="420">
              <v-card-title
                style="text-align: center; display: block; word-break: break-word"
              >
                {{ curLocale.exampleData.alert.title }}
              </v-card-title>
              <v-divider />
              <v-card-actions style="justify-content: center; display: flex">
                <v-btn outlined color="info" to="/login">
                  {{ curLocale.exampleData.alert.btns[0] }}
                </v-btn>
                <v-btn text color="red" @click="hideExample = false">
                  {{ curLocale.exampleData.alert.btns[1] }}
                </v-btn>
                <v-btn outlined color="info" to="/register">
                  {{ curLocale.exampleData.alert.btns[2] }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-overlay>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Ill from "@/components/home/Ill.vue";
import Survey from "@/components/home/Survey.vue";
import Vaccine from "@/components/home/Vaccine.vue";
import { ServiceType } from "@/types/service.type";
import AddService from "@/components/home/AddService.vue";

export default Vue.extend({
  name: "Home",
  components: { AddService, Vaccine, Survey, Ill },
  data() {
    return {
      pageLocale: "home",
      curLocale: {},
      userInfo: {
        services: []
      },
      hideExample: false,
      services: {
        ills: [] as ServiceType[],
        surveys: [] as ServiceType[],
        vaccines: [] as ServiceType[]
      },
      isAuth: localStorage["uid"] !== undefined,
      exampleData: {
        hasConstraint: false,
        ill: [] as ServiceType[],
        surveys: [] as ServiceType[],
        vaccines: [] as ServiceType[]
      },
      constraintInfo: false,
      filterList: {
        ill: false,
        survey: false,
        vaccine: false
      },
      showAddService: false,
      recommends: {
        state: false,
        data: {}
      }
    };
  },
  methods: {
    updateService(service: ServiceType) {
      if (service.type === "TYPE_SURVEY") {
        this.$data.services.surveys.push(service);
      } else if (service.type === "TYPE_VACCINE") {
        this.$data.services.surveys.push(service);
      }
    },
    randomizeExampleData() {
      if (this.$data.exampleData.hasConstraint) {
        const randChoiceSurvey = [
          this.$data.services.surveys[
            Math.floor(Math.random() * this.$data.services.surveys.length)
          ]
        ];

        const randChoiceVaccine = this.$data.services.vaccines.filter(
          (i: ServiceType) => i.name === randChoiceSurvey[0].name
        );
        const randChoiceIll = this.$data.services.ills.filter(
          (i: ServiceType) => i.name === randChoiceSurvey[0].name
        );

        this.$data.exampleData.ill.push(
          ...(randChoiceIll.length > 0 && randChoiceVaccine.length > 0
            ? []
            : randChoiceIll)
        );
        this.$data.exampleData.surveys.push(...randChoiceSurvey);
        this.$data.exampleData.vaccines.push(...randChoiceVaccine);
      } else {
        this.$data.exampleData.ill = [];
        this.$data.exampleData.surveys = [];
        this.$data.exampleData.vaccines = [];
      }
    },
    doClose(state: boolean) {
      this.$data.showAddService = state;
    }
  },
  async beforeMount() {
    if (localStorage["uid"] !== undefined)
      this.recommends.data = await this.$store.getters.getRecommend;

    this.$i18n.locale = localStorage["locale"];
    this.$data.curLocale = this.$t(this.$data.pageLocale);
  },
  async mounted() {
    if (this.$data.isAuth) {
      this.$data.userInfo = (await this.$store.getters.getCurUser)[0];

      this.$data.services.ills = this.$data.userInfo.services.filter(
        (i: ServiceType) => i.type === "TYPE_ILL"
      );
      this.$data.services.surveys = this.$data.userInfo.services.filter(
        (i: ServiceType) => i.type === "TYPE_SURVEY"
      );
      this.$data.services.vaccines = this.$data.userInfo.services.filter(
        (i: ServiceType) => i.type === "TYPE_VACCINE"
      );
    } else {
      const services = await this.$store.getters.getServices;

      this.$data.services.ills = services.filter(
        (i: ServiceType) => i.type === "TYPE_ILL"
      );
      this.$data.services.surveys = services.filter(
        (i: ServiceType) => i.type === "TYPE_SURVEY"
      );
      this.$data.services.vaccines = services.filter(
        (i: ServiceType) => i.type === "TYPE_VACCINE"
      );
    }
  }
});
</script>
