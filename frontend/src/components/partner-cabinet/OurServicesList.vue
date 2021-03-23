<template>
  <v-card max-height="400" style="overflow-y: scroll">
    <v-container>
      <OurServicesItem
        :locales="locales"
        v-for="(item, i) in services"
        :key="i"
        :service="item"
        :do-delete-service="doDelete"
      />
    </v-container>
  </v-card>
</template>

<script>
import OurServicesItem from "@/components/partner-cabinet/OurServicesItem";
export default {
  name: "OurServicesList",
  components: { OurServicesItem },
  props: ["services", "doDeleteService", "locales"],
  methods: {
    doDelete(id) {
      this.doDeleteService(id);
    }
  }
};
</script>

<style scoped></style>
