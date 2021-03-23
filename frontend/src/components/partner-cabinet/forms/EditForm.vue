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
        {{ locales.title }}
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
                :label="locales.labels[0]"
                outlined
                shaped
                v-model="info.name"
                :rules="rules.text"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                color="#FB8C00"
                :label="locales.labels[1]"
                outlined
                shaped
                v-model="info.type"
                :items="typesServices"
                :rules="rules.text"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                color="#FB8C00"
                :label="locales.labels[2]"
                outlined
                shaped
                v-model="info.info"
                :rules="rules.text"
              />
            </v-col>
          </v-row>
          <v-btn block color="success" outlined @click="editService">
            {{ locales.btn }}
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
  props: ["info", "doCloseForm", "isOpen", "locales"],
  data() {
    return {
      alert: {
        state: false,
        color: "success",
        info: ""
      },
      loader: false,
      rules: {
        text: [v => !!v || this.locales.rules.text]
      },
      typesServices: [
        {
          text: this.locales.types[0],
          value: "TYPE_ILL"
        },
        {
          text: this.locales.types[1],
          value: "TYPE_SURVEY"
        },
        {
          text: this.locales.types[2],
          value: "TYPE_VACCINE"
        }
      ]
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

          await this.$store.dispatch("editService", { id: this.info.id });
          if (this.$store.state.errors !== "") {
            this.loader = false;
            this.alert.state = true;
            this.alert.color = "error";
            this.alert.info = this.locales.alerts[0];
          } else {
            this.loader = false;
            this.alert.state = true;
            this.alert.info = this.locales.alerts[1];

            this.doCloseForm({ state: false, name: "edit" });
          }
        }, 800);
      }
    }
  }
});
</script>

<style scoped></style>
