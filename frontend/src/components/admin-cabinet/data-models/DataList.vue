<template>
  <v-card>
    <v-container>
      <v-row>
        <DataItem
          v-for="(item, i) in info"
          :key="i"
          :item="item"
          :all-partners="partners"
          :do-delete-service="doDeleteService"
          :add-data="addData"
          :all-users="users"
          :searcher="searcher"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import DataItem from "@/components/admin-cabinet/data-models/DataItem";
export default {
  name: "DataList",
  components: { DataItem },
  props: ["info", "doDeleteService", "addData", "partners", "users", "searcher"]
};
</script>

<style scoped></style>
