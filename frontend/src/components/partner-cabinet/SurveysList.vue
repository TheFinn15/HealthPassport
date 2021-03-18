<template>
  <v-card>
    <v-container>
      <SurveysItem v-for="(item, i) in surveys" :key="i" :survey="item" />
    </v-container>
  </v-card>
</template>

<script>
import SurveysItem from "@/components/partner-cabinet/SurveysItem";
export default {
  name: "SurveysList",
  components: { SurveysItem },
  props: ["surveys"]
};
</script>

<style scoped></style>
