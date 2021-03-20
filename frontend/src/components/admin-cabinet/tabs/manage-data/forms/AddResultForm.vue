<template>
  <v-dialog max-width="420" persistent v-model="isOpen">
    <v-snackbar top timeout="2000" :color="alert.color" v-model="alert.state">
      <span>
        {{ alert.info }}
      </span>
      <template v-slot:action>
        <v-btn icon>
          <v-icon>
            close
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-card :loading="loader">
      <template v-slot:progress>
        <v-progress-linear color="#FB8C00" height="10" indeterminate />
      </template>

      <v-card-title class="d-flex justify-center">
        Добавить результат анализа
        <v-btn icon absolute right @click="doClose">
          <v-icon>
            close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-form ref="addForm">
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-textarea
                  label="Об результате"
                  outlined
                  shaped
                  color="#FB8C00"
                  v-model="info.about"
                  :rules="rules.text"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                  label="Время сдачи"
                  outlined
                  shaped
                  color="#FB8C00"
                  v-model="getNowDate"
                  :rules="rules.text"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                  label="Клиент"
                  outlined
                  shaped
                  color="#FB8C00"
                  :items="getUsers"
                  v-model="info.user"
                  :rules="rules.text"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                  label="Обследование"
                  outlined
                  shaped
                  color="#FB8C00"
                  :items="getSurveys"
                  v-model="info.survey"
                  :rules="rules.text"
              />
            </v-col>
          </v-row>
          <v-btn block color="success" @click="doAdd">
            Создать
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddResultForm",
  props: [
    "info",
    "isOpen",
    "closeForm",
    "allUsers",
    "allSurveys",
    "updateData"
  ],
  data() {
    return {
      alert: {
        state: false,
        color: "success",
        info: ""
      },
      loader: false,
      rules: {
        text: [v => !!v || "Поле пустое !"]
      },
      users: []
    };
  },
  methods: {
    doClose() {
      this.closeForm({ name: "results" });
    },
    doAdd() {
      if (this.$refs.addForm.validate()) {
        this.loader = true;
        setTimeout(async () => {
          this.$store.state.result = this.info;

          await this.$store.dispatch("createResult");
          if (this.$store.state.errors !== "") {
            this.loader = false;
            this.alert.state = true;
            this.alert.color = "error";
            this.alert.info = "Ошибка при создание результата";
          } else {
            this.loader = false;
            this.alert.state = true;
            this.alert.info = "Результат успешно создан";

            this.updateData({ name: "Results", data: this.info });

            setTimeout(() => {
              this.closeForm({ name: "results" });
            }, 1000);
          }
        }, 800);
      }
    }
  },
  computed: {
    getNowDate() {
      const [day, month, year] = new Date().toLocaleDateString().split(".");
      return `${day}/${month}/${year} - ` + new Date().toLocaleTimeString();
    },
    getSurveys() {
      return this.allSurveys.map(i => {
        return {
          text: i.name + " - " + i.info,
          value: i.id
        };
      });
    },
    getUsers() {
      return this.allUsers.map(i => {
        return {
          text: i.login + " - " + i.email,
          value: i.id
        };
      });
    }
  }
};
</script>

<style scoped></style>
