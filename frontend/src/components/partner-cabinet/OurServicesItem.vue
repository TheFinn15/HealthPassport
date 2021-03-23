<template>
  <v-row>
    <EditForm
      :info="service"
      :do-close-form="doCloseForm"
      :is-open="isOpen.edit"
      :locales="locales.editForm"
    />
    <DeleteForm
      :do-delete-service="doDelete"
      :info="service"
      :do-close-form="doCloseForm"
      :is-open="isOpen.delete"
      :locales="locales.deleteForm"
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
          {{ locales.btns[0] }}
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
              delete_outline
            </v-icon>
          </v-btn>
        </template>
        <span>
          {{ locales.btns[1] }}
        </span>
      </v-tooltip>
    </v-col>
    <v-col cols="4">
      <v-card-subtitle class="pb-0">
        {{ locales.labels[0] }}
      </v-card-subtitle>
      <v-card-title>
        {{ service.name }}
      </v-card-title>
    </v-col>
    <v-col cols="4">
      <v-card-subtitle class="pb-0">
        {{ locales.labels[1] }}
      </v-card-subtitle>
      <v-card-text>
        {{ service.info }}
      </v-card-text>
    </v-col>
    <v-col cols="2">
      <v-card-subtitle class="pb-0">
        {{ locales.labels[1] }}
      </v-card-subtitle>
      <v-card-title>
        {{ checkTypeService }}
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
  props: ["service", "doDeleteService", "locales"],
  data() {
    return {
      isOpen: {
        edit: false,
        delete: false
      }
    };
  },
  computed: {
    checkTypeService() {
      let res = "";

      if (this.service.type === "TYPE_ILL") res = this.locales.types[0];
      if (this.service.type === "TYPE_SURVEY") res = this.locales.types[1];
      if (this.service.type === "TYPE_VACCINE") res = this.locales.types[2];

      return res;
    }
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
