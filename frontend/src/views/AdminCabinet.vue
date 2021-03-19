<template>
  <v-card style="margin: 5% 10%">
    <v-tabs grow color="#FB8C00">
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
  components: {DataList, Statistics, ManageUser },
  data() {
    return {
      tables: [
        {
          name: "Services",
          count: 0
        },
        {
          name: "Partners",
          count: 0
        },
        {
          name: "Results",
          count: 0
        },
        {
          name: "Capability",
          count: 0
        }
      ]
    };
  },
  async mounted() {
    this.$data.tables[0].count = (await this.$store.getters.getServices).length;
    this.$data.tables[1].count = (await this.$store.getters.getPartners).length;
    this.$data.tables[2].count = (await this.$store.getters.getResults).length;
    this.$data.tables[3].count = (await this.$store.getters.getCaps).length;
  }
};
</script>

<style scoped></style>
