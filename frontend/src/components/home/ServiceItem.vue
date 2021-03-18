<template>
  <v-col cols="12">
    <v-card rounded="lg" elevation="10">
      <v-snackbar top timeout="2000" v-model="alert.state" :color="alert.color">
        {{ alert.info }}
        <template v-slot:action>
          <v-btn icon @click="alert.state = false">
            <v-icon>
              close
            </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
      <v-container>
        <v-row>
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
              Тип сервиса:
            </v-card-subtitle>
            <v-card-title>
              {{ service.type === "TYPE_SURVEY" ? "Обследование" : "Вакцина" }}
            </v-card-title>
          </v-col>
          <v-col cols="3">
            <v-card-subtitle class="pb-0">
              О сервисе:
            </v-card-subtitle>
            <v-card-title>
              {{ service.info }}
            </v-card-title>
          </v-col>
          <v-col
            cols="1"
            style="display: flex;justify-content: center; align-items: center;flex-direction: column"
          >
            <v-tooltip left color="#FB8C00">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  x-large
                  color="info"
                  @click="chooseService"
                  v-on="on"
                  v-bind="attrs"
                >
                  <v-icon>
                    chevron_right
                  </v-icon>
                </v-btn>
              </template>
              <span>
                Выбрать сервис
              </span>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-card-subtitle class="pb-0">
              О Партнере
            </v-card-subtitle>
            <v-card-title>
              {{ service.partner.name }}
            </v-card-title>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "ServiceItem",
  props: ["service", "updateService", "closeForm"],
  data() {
    return {
      alert: {
        state: false,
        color: "success",
        info: ""
      }
    };
  },
  methods: {
    async chooseService() {
      this.$store.state.userInfo = { service: this.service.id };
      await this.$store.dispatch("editUser");
      if (this.$store.state.errors === "") {
        this.alert.state = true;
        this.alert.info = "Успешный выбор сервиса";

        this.updateService(this.service);
      } else {
        this.alert.state = true;
        this.alert.color = "red";
        this.alert.info = "Ошибка при выборе сервиса";
      }
    }
  }
};
</script>

<style scoped></style>
