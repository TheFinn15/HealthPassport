<template>
  <v-row>
    <v-col
      cols="1"
      style="display: flex; justify-content: center; align-items: center"
    >
      <v-tooltip right color="#FB8C00">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="info"
            @click="viewResult = true"
            v-on="on"
            v-bind="attrs"
          >
            <v-icon>
              remove_red_eye
            </v-icon>
          </v-btn>
        </template>
        <span>
          Осмотр
        </span>
      </v-tooltip>
      <v-dialog v-model="viewResult" persistent max-width="420">
        <v-card rounded>
          <v-card-title style="display: flex; justify-content: center">
            Просмотр результата
            <v-btn icon absolute right @click="viewResult = false">
              <v-icon>
                close
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-divider />
          <
        </v-card>
      </v-dialog>
    </v-col>
    <v-col cols="3">
      <v-card-subtitle class="pb-0">
        Информация о обследование:
      </v-card-subtitle>
      <v-card-title>
        {{ survey.info }}
      </v-card-title>
    </v-col>
    <v-col cols="3">
      <v-card-subtitle class="pb-0">
        Время сдачи:
      </v-card-subtitle>
      <v-card-title style="word-break: break-word">
        {{ mapDate(survey.passingTime) }}
      </v-card-title>
    </v-col>
    <v-col cols="3">
      <v-card-subtitle class="pb-0">
        Время готовности:
      </v-card-subtitle>
      <v-card-title style="word-break: break-word">
        {{ mapDate(survey.readyTime) }}
      </v-card-title>
    </v-col>
    <v-col cols="2">
      <v-card-subtitle class="pb-0">
        Выявлено ?
      </v-card-subtitle>
      <v-card-title>
        {{ survey.isSick ? "Да" : "Нет" }}
      </v-card-title>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SurveysItem",
  props: ["survey"],
  data() {
    return {
      viewResult: false,
      mapDate(date) {
        if (date === null) {
          return "Ещё не готово";
        } else {
          const dateTime = new Date(date);
          return dateTime.toLocaleString();
        }
      }
    };
  }
};
</script>

<style scoped></style>
