<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        rounded="lg"
        max-height="180"
        height="180"
        elevation="8"
        color="primary"
        dark
        outlined
      >
        <v-card-title class="justify-center align-center flex-column">
          {{ item.name }}
        </v-card-title>

        <v-fade-transition v-if="hover">
          <v-overlay absolute>
            <v-btn @click="doShowInfo">
              СВЕДЕНИЯ
            </v-btn>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  name: "VaccinesItem",
  props: ["item", "showInfo"],
  methods: {
    doShowInfo() {
      this.showInfo();
    }
  }
};
</script>

<style scoped></style>
