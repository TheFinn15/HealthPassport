<template>
  <v-col cols="3">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card rounded="lg" max-width="240" max-height="180" height="180">
          <v-card-title
            style="display: flex; justify-content: center; flex-direction: column"
          >
            <v-card-subtitle class="pb-0">
              Клиент
            </v-card-subtitle>
            <span>
              {{ client.fullName }}
            </span>
            <v-card-subtitle class="pb-0">
              Кол-во использований
            </v-card-subtitle>
            <span>
              {{ getUseCount }}
            </span>
          </v-card-title>

          <v-fade-transition>
            <v-overlay v-if="hover" absolute>
              <v-btn @click="showInfo = true">
                СВЕДЕНИЯ
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </template>
    </v-hover>
    <v-dialog v-model="showInfo" max-width="620" persistent>
      <v-card>
        <v-card-title style="display: flex; justify-content: center">
          Информация о {{ client.fullName }}
          <v-btn icon absolute right @click="showInfo = false">
            <v-icon>
              close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="ФИО"
                v-model="client.fullName"
                outlined
                readonly
                shaped
                color="#FB8C00"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Логин"
                v-model="client.login"
                outlined
                readonly
                shaped
                color="#FB8C00"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Телефон"
                v-model="client.phone"
                outlined
                readonly
                shaped
                color="#FB8C00"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="E-mail"
                v-model="client.email"
                outlined
                readonly
                shaped
                color="#FB8C00"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { ResultType } from "@/types/result.type";

export default Vue.extend({
  name: "OurClientsItem",
  props: ["client", "allResults"],
  data() {
    return {
      showInfo: false
    };
  },
  computed: {
    getUseCount() {
      let counter = 0;

      this.allResults.filter((i: ResultType) => {
        if (i.user.id === this.client.id) {
          counter += 1;
        }
      });

      return counter;
    }
  }
});
</script>

<style scoped></style>
