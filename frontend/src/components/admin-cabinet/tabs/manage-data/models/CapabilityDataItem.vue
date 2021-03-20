<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="8" rounded="lg">
        <v-snackbar
          top
          timeout="2000"
          :color="alert.color"
          v-model="alert.state"
        >
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
        <v-dialog max-width="420" v-model="forms.delete">
          <v-card :loading="loader">
            <template v-slot:progress>
              <v-progress-linear color="#FB8C00" height="10" indeterminate />
            </template>

            <v-card-title class="d-flex justify-center">
              Удалить эту запись ?
            </v-card-title>
            <v-divider />
            <v-card-actions class="d-flex justify-center">
              <v-btn outlined color="info" @click="forms.delete = false">
                Отмена
              </v-btn>
              <v-btn outlined color="red" @click="doDelete">
                Удалить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog max-width="420" v-model="forms.edit" persistent>
          <v-card :loading="loader">
            <template v-slot:progress>
              <v-progress-linear color="#FB8C00" height="10" indeterminate />
            </template>

            <v-card-title class="d-flex justify-center">
              Изменить запись {{ tableItem.name }}
              <v-btn icon @click="forms.edit = false" absolute right>
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
                      label="Название"
                      outlined
                      shaped
                      color="#FB8C00"
                      v-model="tableItem.name"
                      :rules="rules.text"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-textarea
                      label="Об ограничение"
                      outlined
                      shaped
                      color="#FB8C00"
                      v-model="tableItem.info"
                      :rules="rules.text"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      label="Уровень опасности"
                      outlined
                      shaped
                      color="#FB8C00"
                      :items="hazardLevels"
                      v-model="tableItem.hazardLevel"
                      :rules="rules.text"
                    />
                  </v-col>
                </v-row>
                <v-btn block color="success" @click="doEdit">
                  Редактировать
                </v-btn>
              </v-container>
            </v-form>
          </v-card>
        </v-dialog>
        <v-container>
          <v-row>
            <v-col
              cols="1"
              class="d-flex justify-center align-center flex-column"
            >
              <v-tooltip right color="#FB8C00">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    color="info"
                    v-on="on"
                    v-bind="attrs"
                    @click="forms.edit = true"
                  >
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
                  <v-btn
                    icon
                    color="red"
                    v-on="on"
                    v-bind="attrs"
                    @click="forms.delete = true"
                  >
                    <v-icon>
                      delete_outline
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
            <v-col sm="4" md="4">
              <v-card-subtitle class="pb-0">
                Доп. инфо.
              </v-card-subtitle>
              <v-card-title>
                {{ tableItem.info }}
              </v-card-title>
            </v-col>
            <v-col sm="4" md="4">
              <v-card-subtitle class="pb-0">
                Уровень опасности
              </v-card-subtitle>
              <v-card-title>
                {{ getHazardLevel }}
              </v-card-title>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="4" md="4">
              <v-card-subtitle class="pb-0">
                Пользователь
              </v-card-subtitle>
              <v-card-title>
                {{ tableItem.user.fullName }}
              </v-card-title>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="4" md="4">
              <v-card-subtitle class="pb-0">
                Болезнь
              </v-card-subtitle>
              <v-card-title>
                {{
                  tableItem.ill === undefined
                    ? "Отсутствует"
                    : tableItem.ill.name
                }}
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
  name: "CapabilityDataItem",
  props: ["tableItem", "doDeleteService"],
  data() {
    return {
      alert: {
        state: false,
        color: "success",
        info: ""
      },
      forms: {
        edit: false,
        delete: false
      },
      loader: false,
      rules: {
        text: [v => !!v || "Поле пустое !"]
      },
      hazardLevels: [
        {
          text: "Всё в порядке",
          value: "OKAY_LEVEL"
        },
        {
          text: "В норме",
          value: "NORMAL_LEVEL"
        },
        {
          text: "Не в порядке",
          value: "NOT_OKAY_LEVEL"
        },
        {
          text: "Есть угроза",
          value: "DANGER_LEVEL"
        },
        {
          text: "Смертельная",
          value: "DEATHLY_LEVEL"
        }
      ]
    };
  },
  methods: {
    doEdit() {
      if (this.$refs.editForm.validate()) {
        this.loader = true;
        setTimeout(async () => {
          this.$store.state.caps = this.tableItem;

          await this.$store.dispatch("editCap", { id: this.tableItem.id });

          if (this.$store.state.errors !== "") {
            this.loader = false;
            this.alert.state = true;
            this.alert.color = "error";
            this.alert.info = "Ошибка при изменение ограничения";
          } else {
            this.loader = false;
            this.alert.state = true;
            this.alert.info = "Ограничение успешно изменен";

            this.$data.forms.edit = false;
          }
        }, 800);
      }
    },
    doDelete() {
      this.loader = true;
      setTimeout(async () => {
        await this.$store.dispatch("deleteCap", { id: this.tableItem.id });
        if (this.$store.state.errors !== "") {
          this.loader = false;
          this.alert.state = true;
          this.alert.color = "error";
          this.alert.info = "Ошибка при удаление ограничения";
        } else {
          this.doDeleteService({ name: "Partners", id: this.tableItem.id });

          this.loader = false;
          this.alert.state = true;
          this.alert.info = "Ограничение успешно удалено";

          setTimeout(() => {
            this.$data.forms.edit = false;
          }, 1200);
        }
      }, 800);
    }
  },
  computed: {
    getHazardLevel() {
      let res = "";

      if (this.tableItem.hazardLevel === "OKAY_LEVEL") res = "Всё в порядке";
      if (this.tableItem.hazardLevel === "NORMAL_LEVEL") res = "В норме";
      if (this.tableItem.hazardLevel === "NOT_OKAY_LEVEL") res = "Не в порядке";
      if (this.tableItem.hazardLevel === "DANGER_LEVEL") res = "Есть угроза";
      if (this.tableItem.hazardLevel === "DEATHLY_LEVEL") res = "Смертельная";

      return res;
    }
  }
};
</script>

<style scoped></style>
