<template>
  <v-card flat>
    <v-alert v-model="alert.state" :type="alert.type" outlined>
      {{ alert.info }}
    </v-alert>
    <v-card-title style="justify-content: center; display: flex">
      <span v-if="!editMode">
        Просмотр данных
      </span>
      <span v-else>
        Редактирование данных
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
          Режим редактирования
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
          Сохранить данные
        </span>
      </v-tooltip>
    </v-card-title>
    <v-divider />
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="ФИО"
            v-model="userInfo.fullName"
            outlined
            :readonly="!editMode"
            shaped
            color="#FB8C00"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Логин"
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
            label="Пароль"
            v-model="userInfo.pwd"
            outlined
            :readonly="!editMode"
            shaped
            color="#FB8C00"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="E-mail"
            v-model="userInfo.email"
            outlined
            :readonly="!editMode"
            shaped
            color="#FB8C00"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Телефон"
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
  props: ["userInfo"],
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
  methods: {
    async doEditUser() {
      this.$store.state.userInfoInfo = this.userInfo;

      await this.$store.dispatch("editUser");

      const testData = (await this.$store.getters.getCurUser)[0];
      if (testData.login === this.userInfo.login) {
        this.alert.state = true;
        this.alert.info = "Успешное редактирование!";
      } else {
        this.alert.state = true;
        this.alert.type = "error";
        this.alert.info = "Ошибка редактирования!";
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
