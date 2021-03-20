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
        Добавить ограничение
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
                label="Название"
                outlined
                shaped
                color="#FB8C00"
                v-model="info.name"
                :rules="rules.text"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Об ограничение"
                outlined
                shaped
                color="#FB8C00"
                v-model="info.info"
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
  name: "AddCapabilityForm",
  props: ["info", "isOpen", "closeForm", "allUsers", "updateService"],
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
      this.closeForm({ name: "capabilities" });
    },
    doAdd() {
      if (this.$refs.addForm.validate()) {
        this.loader = true;
        setTimeout(async () => {
          this.$store.state.userInfo = this.info;

          await this.$store.dispatch("createCapability");
          if (this.$store.state.errors !== "") {
            this.loader = false;
            this.alert.state = true;
            this.alert.color = "error";
            this.alert.info = "Ошибка при создание ограничея";
          } else {
            this.loader = false;
            this.alert.state = true;
            this.alert.info = "Ограничие успешно создан";

            this.updateService({ name: "Capabilities", data: this.info });

            setTimeout(() => {
              this.closeForm({ name: "capabilities" });
            }, 1000);
          }
        }, 800);
      }
    }
  },
  computed: {
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
