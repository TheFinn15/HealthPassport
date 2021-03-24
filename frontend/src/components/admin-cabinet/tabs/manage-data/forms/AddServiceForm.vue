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
        {{ locales.addForm.title }}
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
                :label="locales.addForm.labels[0]"
                outlined
                shaped
                color="#FB8C00"
                v-model="info.name"
                :rules="rules.text"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                :label="locales.addForm.labels[1]"
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
                :label="locales.addForm.labels[2]"
                outlined
                shaped
                color="#FB8C00"
                v-model="info.info"
                :rules="rules.text"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                :label="locales.addForm.labels[3]"
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
            {{ locales.addForm.btn }}
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddServiceForm",
  props: [
    "info",
    "isOpen",
    "closeForm",
    "allPartners",
    "updateData",
    "locales"
  ],
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
            this.alert.info = this.locales.addForm.alerts[0];
          } else {
            this.loader = false;
            this.alert.state = true;
            this.alert.info = this.locales.addForm.alerts[1];

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
