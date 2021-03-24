<template>
  <v-row justify="center">
    <v-col cols="5" v-for="(item, i) in allData" :key="i">
      <VaccinesItem :locales="locales" :item="item" :ind="i" />
    </v-col>
  </v-row>
</template>

<script>
import VaccinesItem from "@/components/admin-cabinet/tabs/statistics/VaccinesItem";
export default {
  name: "VaccinesList",
  components: { VaccinesItem },
  props: ["allData", "locales"]
};
</script>

<style scoped></style>
