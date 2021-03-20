<template>
  <v-card flat>
    <v-container>
      <PartnerDataItem
        v-for="(item, i) in tableInfo"
        :key="i"
        :table-item="item"
        :do-delete-service="doDeleteService"
      />
    </v-container>
  </v-card>
</template>

<script>
import PartnerDataItem from "@/components/admin-cabinet/tabs/manage-data/models/PartnerDataItem";
export default {
  name: "PartnerDataList",
  components: { PartnerDataItem },
  props: ["tableInfo", "doDeleteService"]
};
</script>

<style scoped></style>
