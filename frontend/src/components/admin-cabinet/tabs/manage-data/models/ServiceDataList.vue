<template>
  <v-card flat>
    <v-container>
      <ServiceDataItem
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
import ServiceDataItem from "@/components/admin-cabinet/tabs/manage-data/models/ServiceDataItem";
export default {
  name: "ServiceDataList",
  components: { ServiceDataItem },
  props: ["tableInfo", "doDeleteService", "locales"]
};
</script>

<style scoped></style>
