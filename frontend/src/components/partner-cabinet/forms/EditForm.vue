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
        Редактировать сервис
        <v-btn icon absolute right @click="closeForm">
          <v-icon>
            close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-form ref="editForm">
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
                v-model="getCurrentType"
                :items="['Болезнь', 'Обследование', 'Вакцинация']"
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
          <v-btn block color="success" outlined @click="editService">
            ИЗМЕНИТЬ СЕРВИС
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "EditForm",
  props: ["info", "doCloseForm", "isOpen"],
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
      this.doCloseForm({ state: false, name: "edit" });
    },
    editService() {
      if (this.$refs.editForm.validate()) {
        this.loader = true;
        setTimeout(async () => {
          this.$store.state.service = this.info;

          if (this.info.type === "Болезнь")
            this.$store.state.service["type"] = "TYPE_ILL";
          if (this.info.type === "Обследование")
            this.$store.state.service["type"] = "TYPE_SURVEY";
          if (this.info.type === "Вакцинация")
            this.$store.state.service["type"] = "TYPE_VACCINE";

          await this.$store.dispatch("editService", { id: this.info.id });
          if (this.$store.state.errors !== "") {
            this.loader = false;
            this.alert.state = true;
            this.alert.color = "error";
            this.alert.info = "Ошибка при изменение сервиса";
          } else {
            this.loader = false;
            this.alert.state = true;
            this.alert.info = "Сервис успешно изменен";


            this.doCloseForm({ state: false, name: "edit" });
          }
        }, 800);
      }
    }
  },
  computed: {
    getCurrentType() {
      let res = "";

      if (this.info.type === "TYPE_ILL") res = "Болезнь";
      if (this.info.type === "TYPE_SURVEY") res = "Обследование";
      if (this.info.type === "TYPE_VACCINE") res = "Вакцинация";

      return res;
    }
  }
});
</script>

<style scoped></style>
