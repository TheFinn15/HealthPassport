<template>
  <v-card outlined>
    <v-list-group :value="true" append-icon="subdirectory_arrow_left">
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>
            <v-card-title>
              {{ locales.userData.services.ills.title }}
            </v-card-title>
          </v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item three-line>
        <v-list-item-content>
          <v-card v-if="ills.length > 0">
            <v-card-subtitle>
              {{ locales.userData.services.ills.subtitle }}
            </v-card-subtitle>
            <v-card v-for="(item, i) in ills" :key="i" flat>
              <v-divider />
              <v-container>
                <v-row>
                  <v-col cols="1" class="d-flex justify-center align-center">
                    <v-card-title>
                      {{ i + 1 }}
                    </v-card-title>
                  </v-col>
                  <v-col cols="3">
                    <v-card-subtitle class="pb-0">
                      {{ locales.userData.services.labels[0] }}
                    </v-card-subtitle>
                    <v-card-title>
                      {{ item.name }}
                    </v-card-title>
                  </v-col>
                  <v-col cols="3">
                    <v-card-subtitle class="pb-0">
                      {{ locales.userData.services.labels[1] }}
                    </v-card-subtitle>
                    <v-card-title>
                      {{ item.partner.name }}
                    </v-card-title>
                  </v-col>
                  <v-col cols="3">
                    <v-card-subtitle>
                      {{ locales.userData.services.labels[2] }}
                    </v-card-subtitle>
                    <v-card-text>
                      {{ item.info }}
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-card>
          <v-card v-else>
            <div style="justify-content: center; display: flex">
              <v-icon>
                warning
              </v-icon>
              <v-card-title>
                {{ locales.userData.services.ills.notFound }}
              </v-card-title>
              <v-icon>
                warning
              </v-icon>
            </div>
          </v-card>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Ill",
  props: ["ills", "locales"],
  data() {
    return {
      alertInfo: false
    };
  }
});
</script>

<style scoped></style>
