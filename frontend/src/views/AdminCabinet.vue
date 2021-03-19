<template>
  <v-card style="margin: 5% 10%">
    <v-tabs grow color="#FB8C00" show-arrows>
      <v-tab>
        Управление данными
      </v-tab>
      <v-tab>
        Управление пользователями
      </v-tab>
      <v-tab>
        Статистика сервиса
      </v-tab>

      <v-tab-item>
        <v-card>
          <v-card-title class="d-flex justify-center">
            Все данные системы
          </v-card-title>
          <v-divider />
          <DataList :info="tables" />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <ManageUser />
      </v-tab-item>
      <v-tab-item>
        <Statistics />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import ManageUser from "@/components/admin-cabinet/ManageUser";
import Statistics from "@/components/admin-cabinet/Statistics";
import DataList from "@/components/admin-cabinet/DataList";
export default {
  name: "AdminCabinet",
  components: { DataList, Statistics, ManageUser },
  data() {
    return {
      tables: [
        {
          name: "Services",
          count: 0,
          data: []
        },
        {
          name: "Partners",
          count: 0,
          data: []
        },
        {
          name: "Results",
          count: 0,
          data: []
        },
        {
          name: "Capability",
          count: 0,
          data: []
        }
      ]
    };
  },
  async mounted() {
    const services = await this.$store.getters.getServices;
    const partners = await this.$store.getters.getPartners;
    const results = await this.$store.getters.getResults;
    const caps = await this.$store.getters.getCaps;


    this.$data.tables[0].count = services.length;
    this.$data.tables[0].data = services;

    this.$data.tables[1].count = partners.length;
    this.$data.tables[1].data = partners;

    this.$data.tables[2].count = results.length;
    this.$data.tables[2].data = results;

    this.$data.tables[3].count = caps.length;
    this.$data.tables[3].data = caps;
  }
};
</script>

<style scoped></style>
