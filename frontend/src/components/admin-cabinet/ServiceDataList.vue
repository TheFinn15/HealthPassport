<template>
  <v-card flat>
    <v-container>
      <ServiceDataItem
        v-for="(item, i) in tableInfo"
        :key="i"
        :table-item="item"
        :do-delete-service="doDeleteService"
      />
    </v-container>
  </v-card>
</template>

<script>
import ServiceDataItem from "@/components/admin-cabinet/ServiceDataItem";
export default {
  name: "ServiceDataList",
  components: { ServiceDataItem },
  props: ["tableInfo", "doDeleteService"]
};
</script>

<style scoped></style>
