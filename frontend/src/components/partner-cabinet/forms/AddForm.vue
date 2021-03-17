<template>
  <v-dialog v-model="isOpen" persistent max-width="420">
    <v-card rounded :loading="loader">
      <template v-slot:progress>
        <v-progress-linear color="#FB8C00" height="10" indeterminate />
      </template>

      <v-snackbar
        v-model="alert.state"
        :color="alert.color"
        shaped
        top
        timeout="2000"
      >
        {{ alert.info }}
      </v-snackbar>
      <v-card-title style="display: flex; justify-content: center">
        Добавить сервис
        <v-btn icon absolute right @click="closeForm">
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
              <v-text-field
                color="#FB8C00"
                label="Название сервиса"
                outlined
                shaped
                v-model="info.name"
                :rules="rules.text"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                color="#FB8C00"
                label="Вид сервиса"
                outlined
                shaped
                :items="['Болезнь', 'Обследование', 'Вакцинация']"
                v-model="info.type"
                :rules="rules.text"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                color="#FB8C00"
                label="Описание сервиса"
                outlined
                shaped
                v-model="info.info"
                :rules="rules.text"
              />
            </v-col>
          </v-row>
          <v-btn block color="success" outlined @click="createService">
            СОЗДАТЬ СЕРВИС
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";
import jwt from "jsonwebtoken";

export default Vue.extend({
  name: "AddForm",
  props: ["info", "doCloseForm", "isOpen", "updateService"],
  data() {
    return {
      alert: {
        state: false,
        color: "success",
        info: ""
      },
      loader: false,
      rules: {
        text: [v => !!v || "Поле пустое"]
      }
    };
  },
  methods: {
    closeForm() {
      this.doCloseForm({ state: false });
    },
    createService() {
      if (this.$refs.addForm.validate()) {
        this.loader = true;
        setTimeout(async () => {
          this.$store.state.service = this.info;
          this.$store.state.service["partner"] = jwt.decode(localStorage["uid"]).data.id;

          if (this.info.type === "Болезнь")
            this.$store.state.service["type"] = "TYPE_ILL";
          if (this.info.type === "Обследование")
            this.$store.state.service["type"] = "TYPE_SURVEY";
          if (this.info.type === "Вакцинация")
            this.$store.state.service["type"] = "TYPE_VACCINE";

          await this.$store.dispatch("addService");
          if (this.$store.state.errors !== "") {
            this.loader = false;
            this.alert.state = true;
            this.alert.color = "error";
            this.alert.info = "Ошибка при создание сервиса";
          } else {
            this.loader = false;
            this.alert.state = true;
            this.alert.info = "Сервис успешно создан";

            this.updateService(this.info);

            this.doCloseForm({ state: false });
          }
        }, 800);
      }
    }
  }
});
</script>

<style scoped></style>
