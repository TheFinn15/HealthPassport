<template>
  <v-col cols="4">
    <v-card
      max-width="340"
      max-height="500"
      height="300"
      elevation="8"
      rounded="lg"
      class="overflow-y-auto"
    >
      <v-snackbar top timeout="2000" :color="alert.color" v-model="alert.state">
        {{ alert.info }}
      </v-snackbar>
      <EditForm
        :is-open="forms.edit"
        :info="item"
        :form-rules="rules"
        :close-form="doCloseForm"
        :show-alert="doShowAlert"
        :roles="roles"
      />
      <DeleteForm
        :is-open="forms.delete"
        :info="item"
        :close-form="doCloseForm"
        :show-alert="doShowAlert"
        :roles="roles"
        :update="doUpdateList"
      />
      <v-container>
        <v-row>
          <v-col>
            <v-tooltip top color="#FB8C00">
              <template v-slot:activator="{ on, attrs }">
                <v-btn text outlined color="info" v-on="on" v-bind="attrs">
                  {{ item.role }}
                </v-btn>
              </template>
              <span>
                Роль пользователя
              </span>
            </v-tooltip>
          </v-col>
          <v-col>
            <v-menu offset-x left max-width="220">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon absolute right v-on="on" v-bind="attrs">
                  <v-icon>
                    more_vert
                  </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-container>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-btn text @click="forms.edit = true" color="primary">
                        <v-icon>
                          edit
                        </v-icon>
                        Редактировать
                      </v-btn>
                    </v-col>
                    <v-col cols="12">
                      <v-btn text @click="forms.delete = true" color="red">
                        <v-icon>
                          delete_outline
                        </v-icon>
                        Удалить
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-card-subtitle class="pa-0">
              Логин:
              <v-card-text class="font-weight-bold">
                {{ item.login }}
              </v-card-text>
            </v-card-subtitle>
          </v-col>
          <v-col cols="6">
            <v-card-subtitle class="pa-0">
              ФИО:
              <v-card-text class="font-weight-bold">
                {{ item.fullName }}
              </v-card-text>
            </v-card-subtitle>
          </v-col>
          <v-col cols="6">
            <v-card-subtitle class="pa-0">
              E-mail:
              <v-card-text class="font-weight-bold">
                {{ item.email }}
              </v-card-text>
            </v-card-subtitle>
          </v-col>
          <v-col cols="6">
            <v-card-subtitle class="pa-0">
              Телефон:
              <v-card-text class="font-weight-bold">
                {{ item.phone }}
              </v-card-text>
            </v-card-subtitle>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text v-on="on" v-bind="attrs">
                  БОЛЕЗНИ
                </v-btn>
              </template>
              <v-card>
                <v-card-text v-if="services.ills.length > 0">
                  <span v-for="(item, i) in services.ills" :key="i" class="font-weight-bold">
                    {{ item.name }} <br />
                  </span>
                </v-card-text>
                <v-card-text v-else>
                  <span class="font-weight-bold">
                    Болезни отсутствуют
                  </span>
                </v-card-text>
              </v-card>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text v-on="on" v-bind="attrs">
                  ВАКЦИНЫ
                </v-btn>
              </template>
              <v-card>
                <v-card-text v-if="services.vaccines.length > 0">
                  <span v-for="(item, i) in services.vaccines" :key="i" class="font-weight-bold">
                    {{ item.name }} <br />
                  </span>
                </v-card-text>
                <v-card-text v-else>
                  <span class="font-weight-bold">
                    Вакцинации отсутствуют
                  </span>
                </v-card-text>
              </v-card>
            </v-menu>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text v-on="on" v-bind="attrs">
                  ОБСЛЕДОВАНИЯ
                </v-btn>
              </template>
              <v-card>
                <v-card-text v-if="services.surveys.length > 0">
                  <span v-for="(item, i) in services.surveys" :key="i" class="font-weight-bold">
                    - {{ item.name }} <br />
                  </span>
                </v-card-text>
                <v-card-text v-else>
                  <span class="font-weight-bold">
                    Обследования отсутствуют
                  </span>
                </v-card-text>
              </v-card>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
import EditForm from "@/components/admin-cabinet/tabs/managa-user/forms/EditForm";
import DeleteForm from "@/components/admin-cabinet/tabs/managa-user/forms/DeleteForm";

export default {
  name: "UsersItem",
  components: { DeleteForm, EditForm },
  props: ["item", "doUpdateList", "roles", "rules"],
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
      services: {
        ills: [],
        surveys: [],
        vaccines: []
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
  },
  mounted() {
    this.services.ills = this.item.services.filter(i => i.type === "TYPE_ILL");
    this.services.surveys = this.item.services.filter(
      i => i.type === "TYPE_SURVEY"
    );
    this.services.vaccines = this.item.services.filter(
      i => i.type === "TYPE_VACCINE"
    );
  }
};
</script>

<style scoped></style>
