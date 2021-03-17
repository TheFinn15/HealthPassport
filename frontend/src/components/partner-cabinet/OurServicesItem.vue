<template>
  <v-row>
    <v-col cols="1" style="display: flex; justify-content: center; align-items: center; flex-direction: column">
      <v-tooltip right color="#FB8C00">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="info" @click="doEdit" v-on="on" v-bind="attrs">
            <v-icon>
              edit
            </v-icon>
          </v-btn>
        </template>
        <span>
          Изменить сервис
        </span>
      </v-tooltip>
      <v-tooltip right color="#FB8C00">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="red" @click="doDelete" v-on="on" v-bind="attrs">
            <v-icon>
              remove
            </v-icon>
          </v-btn>
        </template>
        <span>
          Удалить сервис
        </span>
      </v-tooltip>
    </v-col>
    <v-col cols="4">
      <v-card-subtitle class="pb-0">
        Название:
      </v-card-subtitle>
      <v-card-title>
        {{ service.name }}
      </v-card-title>
    </v-col>
    <v-col cols="4">
      <v-card-subtitle class="pb-0">
        Информация о сервисе:
      </v-card-subtitle>
      <v-card-text>
        {{ service.info }}
      </v-card-text>
    </v-col>
    <v-col>
      <v-card-subtitle class="pb-0">
        Тип сервиса:
      </v-card-subtitle>
      <v-card-title>
        {{ checkTypeService(service.type) }}
      </v-card-title>
    </v-col>
  </v-row>
</template>

<script lang="ts">

export default {
  name: "OurServicesItem",
  props: ["service"],
  data() {
    return {
      checkTypeService(service: string) {
        let res = "";
        if (service === "TYPE_ILL") res = "Болезнь";
        if (service === "TYPE_SURVEY") res = "Обследование";
        if (service === "TYPE_VACCINE") res = "Вакцинация";

        return res;
      }
    };
  },
  methods: {
    doDelete() {
      console.log("");
    },
    doEdit() {
      console.log("");
    }
  }
};
</script>

<style scoped></style>
