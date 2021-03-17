<template>
  <v-card max-height="300" style="overflow-y: scroll">
    <v-container>
      <OurServicesItem v-for="(item, i) in services" :key="i" :service="item" />
    </v-container>
  </v-card>
</template>

<script>
import OurServicesItem from "@/components/partner-cabinet/OurServicesItem";
export default {
  name: "OurServicesList",
  components: {OurServicesItem},
  props: ["services"]
};
</script>

<style scoped></style>
