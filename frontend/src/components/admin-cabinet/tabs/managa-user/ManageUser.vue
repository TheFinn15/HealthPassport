<template>
  <v-card>
    <v-snackbar top timeout="2000" :color="alert.color" v-model="alert.state">
      {{ alert.info }}
    </v-snackbar>

    <AddForm
      :is-open="forms.add"
      :form-rules="rules"
      :close-form="doCloseForm"
      :show-alert="doShowAlert"
      :roles="roles"
      :update="doUpdateList"
      :locales="locales.addForm"
    />
    <v-card-title class="d-flex justify-center">
      {{ locales.title }}
      <v-btn text absolute top right @click="forms.add = true" color="success" outlined>
        {{ locales.btnCreate }}
      </v-btn>
    </v-card-title>
    <v-divider />
    <UsersList
      :info="info"
      :do-update-list="doUpdateList"
      :roles="roles"
      :rules="rules"
      :locales="locales.usersList"
    />
  </v-card>
</template>

<script>
import UsersList from "@/components/admin-cabinet/tabs/managa-user/UsersList";
import AddForm from "@/components/admin-cabinet/tabs/managa-user/forms/AddForm";
export default {
  name: "ManageUser",
  components: { AddForm, UsersList },
  props: ["info", "doUpdateList", "locales"],
  data() {
    return {
      forms: {
        edit: false,
        delete: false,
        add: false
      },
      roles: [
        {
          text: this.locales.roles[0],
          value: "ROLE_USER"
        },
        {
          text: this.locales.roles[1],
          value: "ROLE_ADMIN"
        },
        {
          text: this.locales.roles[2],
          value: "ROLE_PARTNER"
        }
      ],
      alert: {
        state: false,
        color: "success",
        info: ""
      },
      rules: {
        email: [
          v =>
            v.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$") !== null ||
            this.locales.rules.email
        ],
        phone: [v => v.length === 11 || this.locales.rules.phone],
        text: [v => !!v || this.locales.rules.text]
      }
    };
  },
  methods: {
    doShowAlert(info) {
      this.loader = false;
      this.alert.state = true;
      this.alert.info = info.info;
      this.alert.color = info.color;
    },
    doCloseForm(nameForm) {
      this.forms[nameForm] = false;
    }
  }
};
</script>

<style scoped></style>
