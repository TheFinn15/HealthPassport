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
              {{ locales.deleteForm.title }}
            </v-card-title>
            <v-divider />
            <v-card-actions class="d-flex justify-center">
              <v-btn outlined color="info" @click="forms.delete = false">
                {{ locales.deleteForm.btns[0] }}
              </v-btn>
              <v-btn outlined color="red" @click="doDelete">
                {{ locales.deleteForm.btns[1] }}
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
              {{ locales.editForm.title }} {{ tableItem.name }}
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
                      :label="locales.editForm.labels[0]"
                      outlined
                      shaped
                      color="#FB8C00"
                      v-model="tableItem.name"
                      :rules="rules.text"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      :label="locales.editForm.labels[1]"
                      outlined
                      shaped
                      color="#FB8C00"
                      :items="typesServices"
                      v-model="tableItem.type"
                      :rules="rules.text"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      :label="locales.editForm.labels[2]"
                      outlined
                      shaped
                      color="#FB8C00"
                      v-model="tableItem.info"
                      :rules="rules.text"
                    />
                  </v-col>
                </v-row>
                <v-btn block color="success" @click="doEdit">
                  {{ locales.editForm.btn }}
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
                  {{ locales.viewForm.btns[0] }}
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
                  {{ locales.viewForm.btns[1] }}
                </span>
              </v-tooltip>
            </v-col>
            <v-col sm="4" md="3">
              <v-card-subtitle class="pb-0">
                {{ locales.viewForm.labels[0] }}
              </v-card-subtitle>
              <v-card-title>
                {{ tableItem.name }}
              </v-card-title>
            </v-col>
            <v-col sm="4" md="4">
              <v-card-subtitle class="pb-0">
                {{ locales.viewForm.labels[1] }}
              </v-card-subtitle>
              <v-card-title>
                {{ tableItem.info }}
              </v-card-title>
            </v-col>
            <v-col sm="4" md="4">
              <v-card-subtitle class="pb-0">
                {{ locales.viewForm.labels[2] }}
              </v-card-subtitle>
              <v-card-title>
                {{ getTypeService }}
              </v-card-title>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="4" md="4">
              <v-card-subtitle class="pb-0">
                {{ locales.viewForm.labels[3] }}
              </v-card-subtitle>
              <v-card-title>
                {{ tableItem.partner.name }}
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
  name: "ServiceDataItem",
  props: ["tableItem", "doDeleteService", "locales"],
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
    doEdit() {
      if (this.$refs.editForm.validate()) {
        this.loader = true;
        setTimeout(async () => {
          delete this.tableItem.partner;
          this.tableItem.partner = this.tableItem.partnerId;

          this.$store.state.service = this.tableItem;

          await this.$store.dispatch("editService", { id: this.tableItem.id });

          if (this.$store.state.errors !== "") {
            this.loader = false;
            this.alert.state = true;
            this.alert.color = "error";
            this.alert.info = this.locales.editForm.alerts[0];
          } else {
            this.loader = false;
            this.alert.state = true;
            this.alert.info = this.locales.editForm.alerts[1];

            this.$data.forms.edit = false;
          }
        }, 800);
      }
    },
    doDelete() {
      this.loader = true;
      setTimeout(async () => {
        await this.$store.dispatch("deleteService", { id: this.tableItem.id });
        if (this.$store.state.errors !== "") {
          this.loader = false;
          this.alert.state = true;
          this.alert.color = "error";
          this.alert.info = this.locales.deleteForm.alerts[0];
        } else {
          this.doDeleteService({ name: "Services", id: this.tableItem.id });

          this.loader = false;
          this.alert.state = true;
          this.alert.info = this.locales.deleteForm.alerts[1];

          setTimeout(() => {
            this.$data.forms.edit = false;
          }, 1200);
        }
      }, 800);
    }
  },
  computed: {
    getTypeService() {
      let res = "";
      if (this.tableItem.type === "TYPE_ILL") res = this.locales.types[0];
      if (this.tableItem.type === "TYPE_SURVEY") res = this.locales.types[1];
      if (this.tableItem.type === "TYPE_VACCINE") res = this.locales.types[2];

      return res;
    }
  }
};
</script>

<style scoped></style>
