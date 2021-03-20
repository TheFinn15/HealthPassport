<template>
  <v-col sm="4" md="3" lg="2" xl="2">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card max-width="180" max-height="180" height="180" rounded="lg">
          <v-card-subtitle class="pb-0">
            Название:
          </v-card-subtitle>
          <v-card-title>
            {{ item.name }}
          </v-card-title>
          <v-card-subtitle class="pb-0">
            Кол-во записей:
          </v-card-subtitle>
          <v-card-title>
            {{ item.count }}
          </v-card-title>

          <v-fade-transition>
            <v-overlay v-if="hover" absolute>
              <v-btn @click="showInfo = true">
                СВЕДЕНИЯ
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </template>
    </v-hover>
    <v-dialog max-width="840" persistent v-model="showInfo">
      <v-card>
        <v-card-title class="d-flex justify-center">
          Работа с таблицей {{ item.name }}
          <v-btn icon @click="showInfo = false" absolute right>
            <v-icon>
              close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-container>
          <v-text-field
            :label="'Поиск по таблице ' + item.name"
            outlined
            shaped
            v-model="searchText"
            @input="searchData"
            color="#FB8C00"
          />
          <v-tooltip left color="#FB8C00">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                fab
                x-large
                color="success"
                fixed
                bottom
                right
                v-on="on"
                v-bind="attrs"
                @click="openAddForm"
              >
                <v-icon x-large>
                  add_circle_outline
                </v-icon>
              </v-btn>
            </template>
            <span> Добавить {{ item.name }} </span>
          </v-tooltip>
          <ServiceDataList
            :do-delete-service="doDeleteService"
            v-if="item.name === 'Services'"
            :table-info="tableInfo"
          />
          <PartnerDataList
            :do-delete-service="doDeleteService"
            v-if="item.name === 'Partners'"
            :table-info="tableInfo"
          />
          <ResultDataList
            :do-delete-service="doDeleteService"
            v-if="item.name === 'Results'"
            :table-info="tableInfo"
          />
          <CapabilityDataList
            :do-delete-service="doDeleteService"
            v-if="item.name === 'Capabilities'"
            :table-info="tableInfo"
          />
        </v-container>

        <AddServiceForm
          :is-open="showAddForm.services"
          :info="addForm"
          :close-form="closeForm"
          :all-partners="allPartners"
          :update-service="addData"
        />
        <AddPartnerForm
          :is-open="showAddForm.partners"
          :info="addForm"
          :close-form="closeForm"
          :all-users="allUsers"
          :update-service="addData"
        />
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import ServiceDataList from "@/components/admin-cabinet/data-models/models/ServiceDataList";
import AddServiceForm from "@/components/admin-cabinet/forms/AddServiceForm";
import PartnerDataList from "@/components/admin-cabinet/data-models/models/PartnerDataList";
import ResultDataList from "@/components/admin-cabinet/data-models/models/ResultDataList";
import CapabilityDataList from "@/components/admin-cabinet/data-models/models/CapabilityDataList";
import AddPartnerForm from "@/components/admin-cabinet/forms/AddPartnerForm";
export default {
  name: "DataItem",
  components: {
    AddPartnerForm,
    CapabilityDataList,
    ResultDataList,
    PartnerDataList,
    AddServiceForm,
    ServiceDataList
  },
  props: [
    "item",
    "doDeleteService",
    "addData",
    "allPartners",
    "allUsers",
    "searcher"
  ],
  data() {
    return {
      showInfo: false,
      searchText: "",
      showAddForm: {
        services: false,
        partners: false,
        results: false,
        capabilities: false
      },
      addForm: {},
      tableInfo: {}
    };
  },
  methods: {
    searchData() {
      this.searcher({ name: this.item.name, text: this.searchText });
    },
    closeForm(item) {
      this.addForm = {};
      this.showAddForm[item.name] = false;
    },
    openAddForm() {
      if (this.item.name === "Services") this.showAddForm.services = true;
      if (this.item.name === "Partners") this.showAddForm.partners = true;
      if (this.item.name === "Results") this.showAddForm.results = true;
      if (this.item.name === "Capabilities")
        this.showAddForm.capabilities = true;
    }
  },
  beforeUpdate() {
    this.tableInfo = this.item.data;
  }
};
</script>

<style scoped></style>
