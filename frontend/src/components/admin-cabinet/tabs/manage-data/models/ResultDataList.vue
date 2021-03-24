<template>
  <v-card flat>
    <v-container>
      <ResultDataItem
        v-for="(item, i) in tableInfo"
        :key="i"
        :table-item="item"
        :do-delete-service="doDeleteService"
        :locales="locales"
      />
    </v-container>
  </v-card>
</template>

<script>
import ResultDataItem from "@/components/admin-cabinet/tabs/manage-data/models/ResultDataItem";
export default {
  name: "ResultDataList",
  components: { ResultDataItem },
  props: ["tableInfo", "doDeleteService", "locales"]
};
</script>

<style scoped></style>
