<template>
  <v-card flat>
    <v-container>
      <ResultDataItem
        v-for="(item, i) in tableInfo"
        :key="i"
        :table-item="item"
        :do-delete-service="doDeleteService"
      />
    </v-container>
  </v-card>
</template>

<script>
import ResultDataItem from "@/components/admin-cabinet/data-models/models/ResultDataItem";
export default {
  name: "ResultDataList",
  components: { ResultDataItem },
  props: ["tableInfo", "doDeleteService"]
};
</script>

<style scoped></style>
