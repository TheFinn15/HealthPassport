<template>
  <v-card>
    <v-container>
      <v-row>
        <DataItem v-for="(item, i) in info" :key="i" :item="item" />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import DataItem from "@/components/admin-cabinet/DataItem";
export default {
  name: "DataList",
  components: {DataItem},
  props: ["info"]
}
</script>

<style scoped>

</style>
