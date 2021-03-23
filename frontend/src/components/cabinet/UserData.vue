<template>
  <v-card flat>
    <v-alert v-model="alert.state" :type="alert.type" outlined>
      {{ alert.info }}
    </v-alert>
    <v-card-title style="justify-content: center; display: flex">
      <span v-if="!editMode">
        {{ locales.context.titles[0] }}
      </span>
      <span v-else>
        {{ locales.context.titles[1] }}
      </span>
      <v-tooltip v-if="!editMode" bottom color="#FB8C00" open-delay="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="editMode = true"
            fab
            color="info"
            absolute
            right
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              edit
            </v-icon>
          </v-btn>
        </template>
        <span>
          {{ locales.context.editBtn }}
        </span>
      </v-tooltip>
      <v-tooltip v-if="editMode" bottom color="#FB8C00" open-delay="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="doEditUser"
            fab
            color="success"
            absolute
            right
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              done
            </v-icon>
          </v-btn>
        </template>
        <span>
          {{ locales.context.saveData }}
        </span>
      </v-tooltip>
    </v-card-title>
    <v-divider />
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            :label="locales.context.labels[0]"
            v-model="userInfo.fullName"
            outlined
            :readonly="!editMode"
            shaped
            color="#FB8C00"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            :label="locales.context.labels[1]"
            v-model="userInfo.login"
            outlined
            :readonly="!editMode"
            shaped
            color="#FB8C00"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            type="password"
            :label="locales.context.labels[2]"
            v-model="userInfo.pwd"
            outlined
            :readonly="!editMode"
            shaped
            color="#FB8C00"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            :label="locales.context.labels[3]"
            v-model="userInfo.email"
            outlined
            :readonly="!editMode"
            shaped
            color="#FB8C00"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            :label="locales.context.labels[4]"
            v-model="userInfo.phone"
            outlined
            :readonly="!editMode"
            shaped
            color="#FB8C00"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "UserData",
  props: ["userInfo", "locales"],
  data() {
    return {
      editMode: false,
      alert: {
        state: false,
        info: "",
        type: "success"
      }
    };
  },
  mounted() {
    console.log(this.locales)
  },
  methods: {
    async doEditUser() {
      this.$store.state.userInfoInfo = this.userInfo;

      await this.$store.dispatch("editUser");

      const testData = (await this.$store.getters.getCurUser)[0];
      if (testData.login === this.userInfo.login) {
        this.alert.state = true;
        this.alert.info = this.locales.context.alerts[0];
      } else {
        this.alert.state = true;
        this.alert.type = "error";
        this.alert.info = this.locales.context.alerts[1];
      }

      this.editMode = false;

      setTimeout(() => {
        this.alert.state = false;
      }, 2000);
    }
  }
};
</script>

<style scoped></style>
