<template>
  <v-col cols="12">
    <v-card rounded="lg" elevation="10">
      <v-snackbar top timeout="2000" v-model="alert.state" :color="alert.color">
        {{ alert.info }}
        <template v-slot:action>
          <v-btn icon @click="alert.state = false">
            <v-icon>
              close
            </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-card-subtitle class="pb-0">
              {{ locales.addServices.services.labels[0] }}
            </v-card-subtitle>
            <v-card-title>
              {{ service.name }}
            </v-card-title>
          </v-col>
          <v-col cols="4">
            <v-card-subtitle class="pb-0">
              {{ locales.addServices.services.labels[1] }}
            </v-card-subtitle>
            <v-card-title>
              {{ service.type === "TYPE_SURVEY" ? locales.addServices.services.types[0] : locales.addServices.types[1] }}
            </v-card-title>
          </v-col>
          <v-col cols="3">
            <v-card-subtitle class="pb-0">
              {{ locales.addServices.services.labels[2] }}
            </v-card-subtitle>
            <v-card-title>
              {{ service.info }}
            </v-card-title>
          </v-col>
          <v-col
            cols="1"
            style="display: flex;justify-content: center; align-items: center;flex-direction: column"
          >
            <v-tooltip left color="#FB8C00">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  x-large
                  color="info"
                  @click="chooseService"
                  v-on="on"
                  v-bind="attrs"
                >
                  <v-icon>
                    chevron_right
                  </v-icon>
                </v-btn>
              </template>
              <span>
                {{ locales.addServices.services.labels[3] }}
              </span>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-card-subtitle class="pb-0">
              {{ locales.addServices.services.labels[4] }}
            </v-card-subtitle>
            <v-card-title>
              {{ service.partner.name }}
            </v-card-title>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "ServiceItem",
  props: ["service", "updateService", "closeForm", "locales"],
  data() {
    return {
      alert: {
        state: false,
        color: "success",
        info: ""
      }
    };
  },
  methods: {
    async chooseService() {
      this.$store.state.userInfo = { service: this.service.id };
      await this.$store.dispatch("editUser");
      if (this.$store.state.errors === "") {
        this.alert.state = true;
        this.alert.info = this.locales.addServices.services.alerts[0];

        this.updateService(this.service);
      } else {
        this.alert.state = true;
        this.alert.color = "red";
        this.alert.info = this.locales.addServices.services.alerts[1];
      }
    }
  }
};
</script>

<style scoped></style>
