<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="8" rounded="lg">
        <v-container>
          <v-row>
            <v-col
              cols="1"
              class="d-flex justify-center align-center flex-column"
            >
              <v-tooltip right color="#FB8C00">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon color="info" v-on="on" v-bind="attrs">
                    <v-icon>
                      edit
                    </v-icon>
                  </v-btn>
                </template>
                <span>
                  Изменить запись
                </span>
              </v-tooltip>
              <v-tooltip right color="#FB8C00">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon color="red" v-on="on" v-bind="attrs">
                    <v-icon>
                      remove_circle_outline
                    </v-icon>
                  </v-btn>
                </template>
                <span>
                  Удалить запись
                </span>
              </v-tooltip>
            </v-col>
            <v-col sm="4" md="3">
              <v-card-subtitle class="pb-0">
                Название
              </v-card-subtitle>
              <v-card-title>
                {{ tableItem.name }}
              </v-card-title>
            </v-col>
            <v-col sm="4" md="3">
              <v-card-subtitle class="pb-0">
                Доп. инфо.
              </v-card-subtitle>
              <v-card-title>
                {{ tableItem.info }}
              </v-card-title>
            </v-col>
            <v-col sm="4" md="3">
              <v-card-subtitle class="pb-0">
                Вид сервиса
              </v-card-subtitle>
              <v-card-title>
                {{ getTypeService }}
              </v-card-title>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="4" md="4">
              <v-card-subtitle class="pb-0">
                Партнер
              </v-card-subtitle>
              <v-card-title>
                {{ tableItem.partner.name }}
              </v-card-title>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ServiceDataItem",
  props: ["tableItem"],
  computed: {
    getTypeService() {
      let res = "";
      if (this.tableItem.type === "TYPE_ILL") res = "Болезнь";
      if (this.tableItem.type === "TYPE_SURVEY") res = "Обследование";
      if (this.tableItem.type === "TYPE_VACCINE") res = "Вакцина";

      return res;
    }
  }
};
</script>

<style scoped></style>
