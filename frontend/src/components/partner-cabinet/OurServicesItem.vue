<template>
  <v-row>
    <EditForm
      :info="service"
      :do-close-form="doCloseForm"
      :is-open="isOpen.edit"
    />
    <DeleteForm
      :do-delete-service="doDelete"
      :info="service"
      :do-close-form="doCloseForm"
      :is-open="isOpen.delete"
    />
    <v-col
      cols="1"
      style="display: flex; justify-content: center; align-items: center; flex-direction: column"
    >
      <v-tooltip right color="#FB8C00">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="info"
            @click="isOpen.edit = true"
            v-on="on"
            v-bind="attrs"
          >
            <v-icon>
              edit
            </v-icon>
          </v-btn>
        </template>
        <span>
          Изменить сервис
        </span>
      </v-tooltip>
      <v-tooltip right color="#FB8C00">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="red"
            @click="isOpen.delete = true"
            v-on="on"
            v-bind="attrs"
          >
            <v-icon>
              remove_circle_outline
            </v-icon>
          </v-btn>
        </template>
        <span>
          Удалить сервис
        </span>
      </v-tooltip>
    </v-col>
    <v-col cols="4">
      <v-card-subtitle class="pb-0">
        Название:
      </v-card-subtitle>
      <v-card-title>
        {{ service.name }}
      </v-card-title>
    </v-col>
    <v-col cols="4">
      <v-card-subtitle class="pb-0">
        Информация о сервисе:
      </v-card-subtitle>
      <v-card-text>
        {{ service.info }}
      </v-card-text>
    </v-col>
    <v-col cols="2">
      <v-card-subtitle class="pb-0">
        Тип сервиса:
      </v-card-subtitle>
      <v-card-title>
        {{ checkTypeService(service.type) }}
      </v-card-title>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import EditForm from "@/components/partner-cabinet/forms/EditForm.vue";
import DeleteForm from "@/components/partner-cabinet/forms/DeleteForm.vue";
import Vue from "vue";

export default Vue.extend({
  name: "OurServicesItem",
  components: { EditForm, DeleteForm },
  props: ["service", "doDeleteService"],
  data() {
    return {
      checkTypeService(service: string) {
        let res = "";
        if (service === "TYPE_ILL") res = "Болезнь";
        if (service === "TYPE_SURVEY") res = "Обследование";
        if (service === "TYPE_VACCINE") res = "Вакцинация";

        return res;
      },
      isOpen: {
        edit: false,
        delete: false
      }
    };
  },
  methods: {
    doCloseForm(info: { state: boolean; name: "edit" | "delete" }) {
      this.isOpen[info.name] = info.state;
    },
    doDelete(id: number) {
      this.doDeleteService(id);
    }
  }
});
</script>

<style scoped></style>
