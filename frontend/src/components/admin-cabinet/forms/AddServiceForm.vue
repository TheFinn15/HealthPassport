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
        Добавить сервис
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
              <v-text-field
                label="Название"
                outlined
                shaped
                color="#FB8C00"
                v-model="info.name"
                :rules="rules.text"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                label="Вид сервиса"
                outlined
                shaped
                color="#FB8C00"
                :items="typesServices"
                v-model="info.type"
                :rules="rules.text"
              />
            </v-col>
            <v-col cols="6">
              <v-textarea
                label="О сервисе"
                outlined
                shaped
                color="#FB8C00"
                v-model="info.info"
                :rules="rules.text"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                label="Партнер"
                outlined
                shaped
                color="#FB8C00"
                :items="getPartners"
                v-model="info.partner"
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
  name: "AddServiceForm",
  props: ["info", "isOpen", "closeForm", "allPartners", "updateData"],
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
      typesServices: [
        {
          text: "Болезнь",
          value: "TYPE_ILL"
        },
        {
          text: "Обследование",
          value: "TYPE_SURVEY"
        },
        {
          text: "Вакцина",
          value: "TYPE_VACCINE"
        }
      ],
      partners: []
    };
  },
  methods: {
    doClose() {
      this.closeForm({ name: "services" });
    },
    doAdd() {
      if (this.$refs.addForm.validate()) {
        this.loader = true;
        setTimeout(async () => {
          this.$store.state.service = this.info;

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

            this.updateData({ name: "Services", data: this.info });

            setTimeout(() => {
              this.closeForm({ name: "services" });
            }, 1000);
          }
        }, 800);
      }
    }
  },
  computed: {
    getPartners() {
      return this.allPartners.map(i => {
        return {
          text: i.id + " | " + i.name + " - " + i.about,
          value: i.id
        };
      });
    }
  }
};
</script>

<style scoped></style>
