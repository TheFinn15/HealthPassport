<template>
  <v-card>
    <v-container>
      <v-row justify="center" align="center">
        <v-col sm="12" md="12" lg="6" xl="6">
          <v-card
            elevation="8"
            :max-height="showPart.sickUsers ? 500 : ''"
            :height="showPart.sickUsers ? 500 : ''"
            class="overflow-y-auto"
          >
            <v-card-title class="justify-center">
              {{ statistic[0].name }}
              <v-tooltip left color="#FB8C00" v-if="!showPart.sickUsers">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    absolute
                    right
                    @click="showPart.sickUsers = !showPart.sickUsers"
                    v-on="on"
                    v-bind="attrs"
                  >
                    <v-icon>
                      visibility
                    </v-icon>
                  </v-btn>
                </template>
                <span>
                  {{ locales.statistic[0].btns[0] }}
                </span>
              </v-tooltip>
              <v-tooltip left color="#FB8C00" v-else>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    absolute
                    right
                    @click="showPart.sickUsers = !showPart.sickUsers"
                    v-on="on"
                    v-bind="attrs"
                  >
                    <v-icon>
                      visibility_off
                    </v-icon>
                  </v-btn>
                </template>
                <span>
                  {{ locales.statistic[0].btns[1] }}
                </span>
              </v-tooltip>
            </v-card-title>
            <v-divider />
            <v-container v-if="showPart.sickUsers">
              <v-row justify="center" align="center">
                <v-col
                  sm="5"
                  md="3"
                  lg="6"
                  xl="4"
                  v-for="(item, i) in locales.statistic[0].months"
                  :key="i"
                >
                  <v-card
                    rounded="lg"
                    elevation="8"
                    max-width="220"
                    max-height="200"
                    height="200"
                  >
                    <v-btn text color="info">
                      {{ item.text }}
                    </v-btn>
                    <v-card-subtitle class="pb-0">
                      {{ locales.statistic[0].labels[0] }}
                    </v-card-subtitle>
                    <v-card-title>
                      {{ statistic[0].data[i][0] }}
                    </v-card-title>
                    <v-card-subtitle class="pb-0">
                      {{ locales.statistic[0].labels[1] }}
                    </v-card-subtitle>
                    <v-card-title>
                      {{ statistic[0].data[i][1] }}
                    </v-card-title>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col sm="12" md="12" lg="6" xl="6">
          <v-card
            elevation="8"
            :max-height="showPart.vaccines ? 500 : ''"
            :height="showPart.vaccines ? 500 : ''"
            class="overflow-y-auto"
          >
            <v-card-title class="justify-center">
              {{ statistic[1].name }}
              <v-tooltip left color="#FB8C00" v-if="!showPart.vaccines">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    absolute
                    right
                    @click="showPart.vaccines = !showPart.vaccines"
                    v-on="on"
                    v-bind="attrs"
                  >
                    <v-icon>
                      visibility
                    </v-icon>
                  </v-btn>
                </template>
                <span>
                  {{ locales.statistic[1].btns[0] }}
                </span>
              </v-tooltip>
              <v-tooltip left color="#FB8C00" v-else>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    absolute
                    right
                    @click="showPart.vaccines = !showPart.vaccines"
                    v-on="on"
                    v-bind="attrs"
                  >
                    <v-icon>
                      visibility_off
                    </v-icon>
                  </v-btn>
                </template>
                <span>
                  {{ locales.statistic[1].btns[1] }}
                </span>
              </v-tooltip>
            </v-card-title>
            <v-divider />
            <v-container v-if="showPart.vaccines">
              <VaccinesList :locales="locales.statistic[1]" :all-data="statistic[1].data" />
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
  props: ["locales"],
  data() {
    return {
      showPart: {
        sickUsers: true,
        vaccines: true
      },
      statistic: [
        {
          name: this.locales.statistic[0].title,
          data: [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
          ]
        },
        {
          name: this.locales.statistic[1].title,
          data: []
        }
      ]
    };
  },
  async mounted() {
    // users with ills
    const curMonth = new Date().getMonth();
    const userWithSick = (await this.$store.getters.getResults).filter(
      i => i.isSick
    );
    for (const item of userWithSick) {
      const userMonth = new Date(item.passingTime).getMonth();
      if (curMonth === userMonth) {
        this.statistic[0].data[curMonth][0] += 1;
        this.statistic[0].data[curMonth][1] = new Date(item.passingTime).toLocaleDateString();
      }
    }

    // top of vaccines
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
    let allData = [];
    const vaccines = [];

    services.filter(i => vaccines.push(...i));

    vaccines.reduce((back, next) => {
      if (back !== undefined) {
        if (back["name"] === next["name"]) {
          allData.push(next);
        } else {
          allData.push(next);
        }
      }
    }, "");

    this.statistic[1].data.push(...allData);
    allData = allData.map(i => i.id);
    this.statistic[1].data.push(
      ...(await this.$store.getters.getServices).filter(i => {
        if (i.type === "TYPE_VACCINE" && !allData.includes(i.id)) {
          i["popular"] = false;

          return i;
        }
      })
    );
  }
};
</script>

<style scoped></style>
