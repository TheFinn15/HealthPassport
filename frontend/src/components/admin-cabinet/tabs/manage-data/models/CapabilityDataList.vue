<template>
  <v-card flat>
    <v-container>
      <CapabilityDataItem
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
import CapabilityDataItem from "@/components/admin-cabinet/tabs/manage-data/models/CapabilityDataItem";
export default {
  name: "CapabilityDataList",
  components: { CapabilityDataItem },
  props: ["tableInfo", "doDeleteService", "locales"]
};
</script>

<style scoped></style>
