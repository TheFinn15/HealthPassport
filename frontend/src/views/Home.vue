<template>
  <v-card flat style="margin: 2% 10% 0 10%">
    <v-container v-if="isAuth">
      <v-row>
        <v-col cols="12">
          <v-menu offset-x>
            <template v-slot:activator="{on, attrs}">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>
                  filter_list
                </v-icon>
              </v-btn>
            </template>
          </v-menu>
        </v-col>
        <v-col cols="12">
          <v-card rounded style="padding: 2%">
            <v-card-title style="justify-content: center; display: flex;">
              Мои данные
              <v-btn
                  v-if="mapToServices[0].length > 0"
                  @click="doShowConstraint"
                  outlined
                  color="red"
                  absolute right
              >
                Ограничения
              </v-btn>
              <v-btn
                  v-else
                  text
                  color="green"
                  absolute right
              >
                Без ограничений
              </v-btn>
            </v-card-title>
            <v-list>
              <Ill :ills="mapToServices[0]"/>
              <Survey :surveys="mapToServices[1]"/>
              <Vaccine :vaccines="mapToServices[2]"/>
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
                  absolute right
              >
                Ограничения
              </v-btn>
              <v-btn
                  v-else
                  text
                  color="green"
                  absolute right
              >
                Без ограничений
              </v-btn>
            </v-card-title>
            <v-list>
              <Ill :ills="exampleData.ill"/>
              <Survey :surveys="exampleData.surveys"/>
              <Vaccine :vaccines="exampleData.vaccines"/>
            </v-list>
          </v-card>
          <v-overlay :value="hideExample" z-index="0" style="padding: 2%">
            <v-card rounded light max-width="420">
              <v-card-title style="word-break: break-word;justify-content: center; display: flex">
                Зарегистрируйтесь или войдите в систему для больших возможностей !
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
import Vue from 'vue';
import Ill from "@/components/home/Ill.vue";
import Survey from "@/components/home/Survey.vue";
import Vaccine from "@/components/home/Vaccine.vue";
import jwt from "jsonwebtoken";

export default Vue.extend({
  name: 'Home',
  components: {Vaccine, Survey, Ill},
  data() {
    return {
      userInfo: {},
      hideExample: false,
      services: [
        {
          name: "COVID",
          type: "TYPE_ILL"
        },
        {
          name: "GEpa",
          type: "TYPE_ILL"
        },
        {
          name: "COVID",
          type: "TYPE_SURVEY"
        },
        {
          name: "GEpa",
          type: "TYPE_SURVEY"
        },
        {
          name: "COVID",
          type: "TYPE_VACCINE"
        },
        {
          name: "Jopa",
          type: "TYPE_VACCINE"
        }
      ],
      isAuth: localStorage["uid"] !== undefined,
      exampleData: {
        hasConstraint: false,
        ill: [] as any,
        surveys: [] as any,
        vaccines: [] as any
      }
    }
  },
  methods: {
    randomizeExampleData() {
      if (this.exampleData.hasConstraint) {
        const ills = this.services.filter(i => i.type === "TYPE_ILL")
        const surveys = this.services.filter(i => i.type === "TYPE_SURVEY")
        const vaccines = this.services.filter(i => i.type === "TYPE_VACCINE")

        let tempChoiceIll = [ills[Math.floor(Math.random() * ills.length)]];
        let tempChoiceSurvey = [surveys[Math.floor(Math.random() * surveys.length)]];
        let tempChoiceVaccine = [vaccines[Math.floor(Math.random() * vaccines.length)]];

        if (tempChoiceIll[0].name === tempChoiceVaccine[0].name) {
          console.log(tempChoiceIll)
          tempChoiceIll = tempChoiceIll.filter(i => i.name !== tempChoiceVaccine[0].name);
          console.log(tempChoiceIll)
              // this.services.filter(i =>
              //     i.type === "TYPE_ILL" &&
              //     i.name !== tempChoiceVaccine[0].name
              // )[0];
        }
        if (tempChoiceIll[0].name !== tempChoiceSurvey[0].name) {
          tempChoiceIll = [];
          tempChoiceIll.push(tempChoiceSurvey[0]);
        } else if (tempChoiceSurvey[0].name !== tempChoiceIll[0].name) {
          tempChoiceSurvey.push(tempChoiceIll[0]);
        }

        this.exampleData.ill.push(...tempChoiceIll);
        this.exampleData.surveys.push(...tempChoiceSurvey);
        this.exampleData.vaccines.push(...tempChoiceVaccine);
      } else {
        this.exampleData.ill = [];
        this.exampleData.surveys = [];
        this.exampleData.vaccines = [];
      }
    },
    doShowConstraint() {

    }
  },
  computed: {
    mapToServices() {
      return [[], [], []];
    }
  },
  mounted() {

  }
});
</script>
