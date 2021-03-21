<template>
  <v-row justify="center">
    <v-col cols="5">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card
            rounded="lg"
            max-height="180"
            height="180"
            elevation="8"
            color="success"
            outlined
            dark
          >
            <v-card-title class="justify-center align-center">
              Популярная
            </v-card-title>

            <v-fade-transition v-if="hover">
              <v-overlay absolute>
                <v-btn @click="showInfo">
                  СВЕДЕНИЯ
                </v-btn>
              </v-overlay>
            </v-fade-transition>
          </v-card>
        </template>
      </v-hover>
    </v-col>
    <v-col cols="5" v-for="(item, i) in allData" :key="i">
      <v-dialog max-width="420" v-model="showInfo">
        <v-card>
          <v-card-title>
            {{ item }}
          </v-card-title>
        </v-card>
      </v-dialog>
      <VaccinesItem :item="item" :show-info="doShowInfo" />
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
      showInfo: false
    }
  },
  methods: {
    doShowInfo() {
      this.showInfo = true;
    }
  }
};
</script>

<style scoped></style>
