<template>
  <v-dialog max-width="420" persistent v-model="isOpen">
    <v-card>
      <v-card-title class="d-flex justify-center">
        {{ locales.title }} {{ info.fullName }}
        <v-btn icon absolute right @click="doCloseForm">
          <v-icon>
            close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-actions class="d-flex justify-center pa-5">
        <v-btn color="primary" outlined @click="doCloseForm">
          {{ locales.btns[0] }}
        </v-btn>
        <v-btn color="red" outlined @click="doDelete">
          {{ locales.btns[1] }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteForm",
  props: [
    "isOpen",
    "info",
    "closeForm",
    "showAlert",
    "roles",
    "update",
    "locales"
  ],
  methods: {
    doDelete() {
      this.$store.dispatch("deleteUserById", { id: this.info.id });
      if (this.$store.state.errors === "") {
        this.showAlert({
          info: this.locales.alerts[1],
          color: "success"
        });

        this.update({ id: this.info.id, action: "delete" });

        this.closeForm("delete");
      } else {
        this.showAlert({
          info: this.locales.alerts[0],
          color: "red"
        });
      }
    },
    doCloseForm() {
      this.closeForm("delete");
    }
  }
};
</script>

<style scoped></style>
