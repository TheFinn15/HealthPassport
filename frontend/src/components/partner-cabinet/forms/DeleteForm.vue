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
        Удалить сервис
        <v-btn icon absolute right @click="closeForm">
          <v-icon>
            close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-actions class="d-flex justify-center pa-5">
        <v-btn outlined color="primary" @click="closeForm">
          Отменить
        </v-btn>
        <v-btn outlined color="red" @click="deleteService">
          Удалить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Delete",
  props: ["info", "doCloseForm", "isOpen", "doDeleteService"],
  data() {
    return {
      alert: {
        state: false,
        color: "success",
        info: ""
      },
      loader: false
    };
  },
  methods: {
    closeForm() {
      this.doCloseForm({ state: false, name: "delete" });
    },
    deleteService() {
      this.loader = true;
      setTimeout(async () => {
        await this.$store.dispatch("deleteService", { id: this.info.id });
        if (this.$store.state.errors !== "") {
          this.loader = false;
          this.alert.state = true;
          this.alert.color = "error";
          this.alert.info = "Ошибка при удаление сервиса";
        } else {
          this.doDeleteService(this.info.id);

          this.loader = false;
          this.alert.state = true;
          this.alert.info = "Сервис успешно удален";

          setTimeout(() => {
            this.doCloseForm({ state: false, name: "delete" });
          }, 1200);
        }
      }, 800);
    }
  }
});
</script>

<style scoped></style>
