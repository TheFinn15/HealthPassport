<template>
  <v-card>
    <v-container>
      <v-row justify="center" align="center">
        <v-col sm="12" md="12" lg="6" xl="6">
          <v-card elevation="8" max-height="500" height="500">
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
            max-height="500"
            height="500"
            class="overflow-y-auto"
          >
            <v-card-title class="justify-center">
              {{ statistic[1].name }}
            </v-card-title>
            <v-divider />
            <v-container>
              <VaccinesList :all-data="statistic[1].data" />
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
          name: "Статистика популярности вакцинаций",
          data: []
        }
      ]
    };
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
        return i.filter(i1 => {
          if (i1.type === "TYPE_VACCINE") {
            i1["popular"] = true;

            return i1;
          }
        });
      });
    let vaccines = [];
    services.filter(i => vaccines.push(...i));

    this.statistic[1].data.push(...vaccines);
    vaccines = vaccines.map(i => i.id);
    this.statistic[1].data.push(
      ...(await this.$store.getters.getServices).filter(i => {
        if (i.type === "TYPE_VACCINE" && !vaccines.includes(i.id)) {
          i["popular"] = false;

          return i;
        }
      })
    );
  }
};
</script>

<style scoped></style>
