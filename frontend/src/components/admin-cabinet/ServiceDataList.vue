<template>
  <v-card flat>
    <v-container>
      <ServiceDataItem
        v-for="(item, i) in tableInfo"
        :key="i"
        :table-item="item"
      />
    </v-container>
  </v-card>
</template>

<script>
import ServiceDataItem from "@/components/admin-cabinet/ServiceDataItem";
export default {
  name: "ServiceDataList",
  components: { ServiceDataItem },
  props: ["tableInfo"]
};
</script>

<style scoped></style>
