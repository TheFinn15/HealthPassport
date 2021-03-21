<template>
  <v-row justify="center">
    <v-col cols="5" v-for="(item, i) in allData" :key="i">
      <VaccinesItem :item="item" :ind="i" />
    </v-col>
  </v-row>
</template>

<script>
import VaccinesItem from "@/components/admin-cabinet/tabs/statistics/VaccinesItem";
export default {
  name: "VaccinesList",
  components: { VaccinesItem },
  props: ["allData", "popular"],
  data() {
    return {
      showInfo: false,
      aboutPopular: []
    };
  },
  mounted() {
    for (const item in this.popular[0]) {
      this.aboutPopular.push(item);
    }
  }
};
</script>

<style scoped></style>
