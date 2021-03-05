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
          <v-col cols="12">
            <v-switch
                color="#FFB74D"
                label="Есть ограничения?"
                v-model="exampleData.hasConstraint"
                @click="randomizeExampleData"
            />
          </v-col>
        </v-col>
        <v-col cols="12">
          <v-card rounded style="padding: 2%">
            <v-card-title style="justify-content: center; display: flex;">
              Примерные данные
              <v-btn
                  v-if="exampleData.ill.length > 0"
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
              <Ill :ills="exampleData.ill"/>
              <Survey :surveys="exampleData.surveys"/>
              <Vaccine :vaccines="exampleData.vaccines"/>
            </v-list>
          </v-card>
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

export default Vue.extend({
  name: 'Home',
  components: {Vaccine, Survey, Ill},
  data() {
    return {
      userInfo: {},
      isAuth: false,
      exampleData: {
        hasConstraint: false,
        ill: [],
        surveys: [],
        vaccines: []
      }
    }
  },
  methods: {
    randomizeExampleData() {

    },
    doShowConstraint() {

    }
  },
  computed: {
    mapToServices() {
      return [[], [], []];
    }
  }
});
</script>
