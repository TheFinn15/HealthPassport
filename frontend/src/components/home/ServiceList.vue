<template>
  <v-card flat>
    <v-container>
      <v-row>
        <ServiceItem
          v-for="(item, i) in services"
          :key="i"
          :service="item"
          :close-form="closeForm"
          :update-service="updateService"
          :locales="locales"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import ServiceItem from "@/components/home/ServiceItem";
export default {
  name: "ServiceList",
  components: { ServiceItem },
  props: ["services", "updateService", "closeForm", "locales"]
};
</script>

<style scoped></style>
