<template>
  <v-card>
    <v-container>
      <v-row>
        <DataItem
          v-for="(item, i) in info"
          :key="i"
          :item="item"
          :do-delete-data="doDeleteData"
          :add-data="addData"
          :all-partners="partners"
          :all-users="users"
          :all-surveys="surveys"
          :searcher="searcher"
          :locales="locales"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import DataItem from "@/components/admin-cabinet/tabs/manage-data/data-models/DataItem";
export default {
  name: "DataList",
  components: { DataItem },
  props: [
    "info",
    "doDeleteData",
    "addData",
    "partners",
    "users",
    "surveys",
    "searcher",
    "locales"
  ]
};
</script>

<style scoped></style>
