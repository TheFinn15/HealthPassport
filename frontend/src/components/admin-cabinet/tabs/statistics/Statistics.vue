<template>
  <v-card>
    <v-container>
      <v-row justify="center" align="center">
        <v-col sm="12" md="12" lg="6" xl="6">
          <v-card elevation="8" max-height="280" height="280">
            <v-card-title class="justify-center">
              {{ statistic[0].name }}
            </v-card-title>
            <v-divider />
            <v-container>
              <v-row>
                <v-col
                  cols="4"
                  v-for="(item1, ind) in statistic[0].data"
                  :key="ind"
                >
                  <v-card-text>
                    Кол-во болеющих: {{ statistic[0].data.length }}
                  </v-card-text>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col sm="12" md="12" lg="6" xl="6">
          <v-card
            elevation="8"
            max-height="280"
            height="280"
            class="overflow-y-auto"
          >
            <v-card-title class="justify-center">
              {{ statistic[1].name }}
            </v-card-title>
            <v-divider />
            <v-container>
              <VaccinesList
                :popular="statistic[1].data"
                :all-data="statistic[1].allData"
              />
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import VaccinesList from "@/components/admin-cabinet/tabs/statistics/VaccinesList";
export default {
  name: "Statistics",
  components: { VaccinesList },
  props: ["info"],
  data() {
    return {
      statistic: [
        {
          name: "Статистика по кол-ву людей с болезнями",
          data: []
        },
        {
          name: "Статистика по популярности вакцинаций",
          data: {},
          allData: []
        }
      ],
      users: [],
      months: [
        {
          value: 0,
          text: "Январь"
        },
        {
          value: 1,
          text: "Февраль"
        },
        {
          value: 2,
          text: "Март"
        },
        {
          value: 3,
          text: "Апрель"
        },
        {
          value: 4,
          text: "Май"
        },
        {
          value: 5,
          text: "Июнь"
        },
        {
          value: 6,
          text: "Июль"
        },
        {
          value: 7,
          text: "Август"
        },
        {
          value: 8,
          text: "Сентябрь"
        },
        {
          value: 9,
          text: "Октябрь"
        },
        {
          value: 10,
          text: "Ноябрь"
        },
        {
          value: 11,
          text: "Декабрь"
        }
      ]
    };
  },
  computed: {
    getPopularVaccine() {
      return this.statistic[1];
    }
  },
  async mounted() {
    this.statistic[0].data = (await this.$store.getters.getResults).filter(
      i => i.isSick
    );
    const users = await this.$store.getters.getAllUsers;

    const services = users
      .map(i => {
        if (i.services.length > 0) {
          return i.services;
        } else {
          return [];
        }
      })
      .map(i => {
        return i.filter(i1 => i1.type === "TYPE_VACCINE");
      });
    const vaccines = [];
    services.filter(i => vaccines.push(...i));

    this.statistic[1].data = vaccines;
    this.statistic[1].allData = (await this.$store.getters.getServices).filter(
      i => i.type === "TYPE_VACCINE"
    );
  }
};
</script>

<style scoped></style>
