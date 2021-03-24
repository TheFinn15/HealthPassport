<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        rounded="lg"
        max-height="180"
        height="180"
        elevation="8"
        :color="item.popular ? 'success' : 'primary'"
        dark
        outlined
      >
        <v-dialog max-width="620" v-model="showInfo">
          <v-card rounded="lg">
            <v-card-title class="justify-center">
              {{ item.name }}
            </v-card-title>
            <v-divider />
            <v-container>
              <v-row>
                <v-col cols="4">
                  <v-card-subtitle class="pa-0">
                    {{ locales.labels[0] }}
                  </v-card-subtitle>
                  <v-card-title>
                    {{ item.name }}
                  </v-card-title>
                </v-col>
                <v-col cols="4">
                  <v-card-subtitle class="pa-0">
                    {{ locales.labels[1] }}
                  </v-card-subtitle>
                  <v-card-title>
                    {{ item.info }}
                  </v-card-title>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-card-subtitle class="pa-0">
                    {{ locales.labels[2] }}
                  </v-card-subtitle>
                  <v-card-title>
                    {{ item.partner.name }}
                  </v-card-title>
                </v-col>
                <v-col cols="4">
                  <v-card-subtitle class="pa-0">
                    {{ locales.labels[3] }}
                  </v-card-subtitle>
                  <v-card-title>
                    {{ item.partner.about }}
                  </v-card-title>
                </v-col>
                <v-col cols="4">
                  <v-card-subtitle class="pa-0">
                    {{ locales.labels[4] }}
                  </v-card-subtitle>
                  <v-card-title>
                    {{ item.partner.url }}
                  </v-card-title>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>

        <v-card-title class="pb-0">
          {{ ind + 1 }} {{ locales.labels[5] }}
        </v-card-title>
        <v-card-title class="justify-center">
          {{ item.name }}
        </v-card-title>

        <v-fade-transition v-if="hover">
          <v-overlay absolute>
            <v-btn @click="showInfo = true">
              {{ locales.labels[6] }}
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
  props: ["item", "ind", "locales"],
  data() {
    return {
      showInfo: false
    };
  }
};
</script>

<style scoped></style>
