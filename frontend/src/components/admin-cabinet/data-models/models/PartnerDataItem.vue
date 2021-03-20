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
                    <v-text-field
                      label="Ссылка на сайт"
                      outlined
                      shaped
                      color="#FB8C00"
                      v-model="tableItem.url"
                      :rules="rules.text"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-textarea
                      label="О Партнере"
                      outlined
                      shaped
                      color="#FB8C00"
                      v-model="tableItem.about"
                      :rules="rules.text"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="Время начало партнерства"
                      outlined
                      readonly
                      shaped
                      color="#FB8C00"
                      v-model="getTimeWork"
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
            <v-col sm="4" md="4">
              <v-card-subtitle class="pb-0">
                Доп. инфо.
              </v-card-subtitle>
              <v-card-title>
                {{ tableItem.about }}
              </v-card-title>
            </v-col>
            <v-col sm="4" md="4">
              <v-card-subtitle class="pb-0">
                Ссылка на партнера
              </v-card-subtitle>
              <v-card-title>
                {{ tableItem.url }}
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
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PartnerDataItem",
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
      }
    };
  },
  methods: {
    doEdit() {
      if (this.$refs.editForm.validate()) {
        this.loader = true;
        setTimeout(async () => {

          this.$store.state.service = this.tableItem;

          await this.$store.dispatch("editPartner", { id: this.tableItem.id });

          if (this.$store.state.errors !== "") {
            this.loader = false;
            this.alert.state = true;
            this.alert.color = "error";
            this.alert.info = "Ошибка при изменение партнера";
          } else {
            this.loader = false;
            this.alert.state = true;
            this.alert.info = "Партнер успешно изменен";

            this.$data.forms.edit = false;
          }
        }, 800);
      }
    },
    doDelete() {
      this.loader = true;
      setTimeout(async () => {

        await this.$store.dispatch("deletePartner", { id: this.tableItem.id });

        if (this.$store.state.errors !== "") {
          this.loader = false;
          this.alert.state = true;
          this.alert.color = "error";
          this.alert.info = "Ошибка при удаление партнера";
        } else {

          this.doDeleteService({ name: "Partners", id: this.tableItem.id });

          this.loader = false;
          this.alert.state = true;
          this.alert.info = "Партнер успешно удален";

          setTimeout(() => {
            this.$data.forms.edit = false;
          }, 1200);
        }
      }, 800);
    }
  },
  computed: {
    getTimeWork() {
      const [day, month, year] = new Date(this.tableItem.timeWork).toLocaleDateString().split(".");
      return `${day}/${month}/${year} - ` + new Date().toLocaleTimeString();
    }
  }
};
</script>

<style scoped></style>
