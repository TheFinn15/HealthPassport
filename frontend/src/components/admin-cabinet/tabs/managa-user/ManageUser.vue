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
    />
    <v-card-title class="d-flex justify-center">
      Пользователи
      <v-btn text absolute top right @click="forms.add = true" color="success" outlined>
        СОЗДАТЬ
      </v-btn>
    </v-card-title>
    <v-divider />
    <UsersList
      :info="info"
      :do-update-list="doUpdateList"
      :roles="roles"
      :rules="rules"
    />
  </v-card>
</template>

<script>
import UsersList from "@/components/admin-cabinet/tabs/managa-user/UsersList";
import AddForm from "@/components/admin-cabinet/tabs/managa-user/forms/AddForm";
export default {
  name: "ManageUser",
  components: { AddForm, UsersList },
  props: ["info", "doUpdateList"],
  data() {
    return {
      forms: {
        edit: false,
        delete: false,
        add: false
      },
      roles: [
        {
          text: "Обычный",
          value: "ROLE_USER"
        },
        {
          text: "Админ",
          value: "ROLE_ADMIN"
        },
        {
          text: "Партнер",
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
            "Неверный e-mail"
        ],
        phone: [v => v.length === 11 || "Неверный телефон"],
        text: [v => !!v || "Поле пустое !"]
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
