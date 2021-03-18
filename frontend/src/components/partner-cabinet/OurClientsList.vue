<template>
  <v-card>
    <v-card-title style="display: flex; justify-content: center">
      Информация о клиентах
    </v-card-title>
    <v-divider />
    <v-container>
      <v-row>
        <OurClientsItem v-for="(item, i) in clients" :key="i" :client="item" :all-results="allResults" />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import OurClientsItem from "@/components/partner-cabinet/OurClientsItem";
export default {
  name: "OurClientsList",
  components: { OurClientsItem },
  props: ["clients", "allResults"]
};
</script>

<style scoped></style>
