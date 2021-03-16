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
              Ваши ограничения находятся в личном кабинете
            </span>
            <template v-slot:action="{ attrs }">
              <v-btn
                v-bind="attrs"
                text
                color="red"
                @click="constraintInfo = false"
              >
                ЗАКРЫТЬ
              </v-btn>
            </template>
          </v-snackbar>
          <v-card rounded style="padding: 2%">
            <v-card-title style="justify-content: center; display: flex;">
              Мои данные
              <v-btn
                v-if="mapToServices[0].length > 0"
                @click="constraintInfo = !constraintInfo"
                outlined
                color="red"
                absolute
                right
              >
                Наложены ограничения
              </v-btn>
              <v-btn v-else text color="green" absolute right>
                Без ограничений
              </v-btn>
            </v-card-title>
            <v-list>
              <Ill v-if="!filterList.ill" :ills="mapToServices[0]" />
              <Survey v-if="!filterList.survey" :surveys="mapToServices[1]" />
              <Vaccine
                v-if="!filterList.vaccine"
                :vaccines="mapToServices[2]"
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
              Примерные данные
              <v-btn
                v-if="exampleData.ill.length > 0"
                @click="hideExample = true"
                outlined
                color="red"
                absolute
                right
              >
                Ограничения
              </v-btn>
              <v-btn v-else text color="green" absolute right>
                Без ограничений
              </v-btn>
            </v-card-title>
            <v-list>
              <Ill :ills="exampleData.ill" />
              <Survey :surveys="exampleData.surveys" />
              <Vaccine :vaccines="exampleData.vaccines" />
            </v-list>
          </v-card>
          <v-overlay :value="hideExample" z-index="0" style="padding: 2%">
            <v-card rounded light max-width="420">
              <v-card-title
                style="text-align: center; display: block; word-break: break-word"
              >
                Зарегистрируйтесь или войдите в систему для больших возможностей
                !
              </v-card-title>
              <v-divider />
              <v-card-actions style="justify-content: center; display: flex">
                <v-btn outlined color="info" to="/login">
                  Авторизация
                </v-btn>
                <v-btn text color="red" @click="hideExample = false">
                  Закрыть
                </v-btn>
                <v-btn outlined color="info" to="/register">
                  Регистрация
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

export default Vue.extend({
  name: "Home",
  components: { Vaccine, Survey, Ill },
  data() {
    return {
      pageLocale: "home",
      curLocale: {},
      userInfo: {
        services: []
      },
      hideExample: false,
      services: [] as ServiceType[],
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
      }
    };
  },
  methods: {
    randomizeExampleData() {
      if (this.$data.exampleData.hasConstraint) {
        const ills = this.services.filter((i: any) => i.type === "TYPE_ILL");
        const surveys = this.services.filter(
          (i: any) => i.type === "TYPE_SURVEY"
        );
        const vaccines = this.services.filter(
          (i: any) => i.type === "TYPE_VACCINE"
        );

        const randChoiceSurvey = [
          surveys[Math.floor(Math.random() * surveys.length)]
        ];
        const randChoiceVaccine = vaccines.filter(
          i => i.name === randChoiceSurvey[0].name
        );
        const randChoiceIll = ills.filter(
          i => i.name === randChoiceSurvey[0].name
        );

        this.exampleData.ill.push(
          ...(randChoiceIll.length > 0 && randChoiceVaccine.length > 0
            ? []
            : randChoiceIll)
        );
        this.exampleData.surveys.push(...randChoiceSurvey);
        this.exampleData.vaccines.push(...randChoiceVaccine);
      } else {
        this.exampleData.ill = [];
        this.exampleData.surveys = [];
        this.exampleData.vaccines = [];
      }
    }
  },
  computed: {
    mapToServices() {
      if (this.$data.userInfo.services.length > 0) {
        const ills = this.$data.userInfo.services.filter(
          (i: any) => i.type === "TYPE_ILL"
        );
        const surveys = this.$data.userInfo.services.filter(
          (i: any) => i.type === "TYPE_SURVEY"
        );
        const vaccines = this.$data.userInfo.services.filter(
          (i: any) => i.type === "TYPE_VACCINE"
        );

        return [ills, surveys, vaccines];
      } else {
        return [[], [], []];
      }
    }
  },
  async beforeMount() {
    this.$i18n.locale = localStorage["locale"];
    this.curLocale = this.$t(this.pageLocale);

    this.services = await this.$store.getters.getServices;
  },
  async mounted() {
    if (this.isAuth) {
      this.$data.userInfo = (await this.$store.getters.getCurUser)[0];
    }
  }
});
</script>
