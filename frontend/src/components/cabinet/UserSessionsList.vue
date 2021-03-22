<template>
  <v-card outlined>
    <UserSessionsItem :locales="locales" v-for="(item, i) in sessions" :key="i" :session="item" />
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import UserSessionsItem from "./UserSessionsItem.vue";

export default Vue.extend({
  name: "UserSessionsList",
  components: { UserSessionsItem },
  props: ["sessions", "locales"]
});
</script>

<style scoped></style>
