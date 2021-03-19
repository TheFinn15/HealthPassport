<template>
  <v-col cols="3">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card max-width="180" max-height="180" height="180" rounded="lg">
          <v-card-subtitle class="pb-0">
            Название:
          </v-card-subtitle>
          <v-card-title>
            {{ item.name }}
          </v-card-title>
          <v-card-subtitle class="pb-0">
            Кол-во записей:
          </v-card-subtitle>
          <v-card-title>
            {{ item.count }}
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
    <v-dialog max-width="620" persistent v-model="showInfo">
      <v-card>
        <v-card-title class="d-flex justify-center">
          Работа с таблицей {{ item.name }}
          <v-btn icon @click="showInfo = false" absolute right>
            <v-icon>
              close
            </v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  name: "DataItem",
  props: ["item"],
  data() {
    return {
      showInfo: false
    };
  }
};
</script>

<style scoped></style>
