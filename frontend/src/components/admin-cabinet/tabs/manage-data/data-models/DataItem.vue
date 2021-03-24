<template>
  <v-col sm="4" md="3" lg="2" xl="2">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card max-width="180" max-height="180" height="180" rounded="lg">
          <v-card-subtitle class="pb-0">
            {{ locales.dataLabels[0] }}
          </v-card-subtitle>
          <v-card-title>
            {{ item.name }}
          </v-card-title>
          <v-card-subtitle class="pb-0">
            {{ locales.dataLabels[1] }}
          </v-card-subtitle>
          <v-card-title>
            {{ item.count }}
          </v-card-title>

          <v-fade-transition>
            <v-overlay v-if="hover" absolute>
              <v-btn @click="showInfo = true">
                {{ locales.dataLabels[2] }}
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </template>
    </v-hover>
    <v-dialog max-width="840" persistent v-model="showInfo">
      <v-card>
        <v-card-title class="d-flex justify-center">
          {{ locales.dataTable.title }} {{ item.name }}
          <v-btn icon @click="showInfo = false" absolute right>
            <v-icon>
              close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-container>
          <v-text-field
            :label="locales.dataTable.searchBar + item.name"
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
            <span> {{ locales.dataTable.addBtn }} {{ item.name }} </span>
          </v-tooltip>
          <ServiceDataList
            :locales="locales.dataTable.services"
            :do-delete-service="doDeleteData"
            v-if="item.name === 'Services'"
            :table-info="item.data"
          />
          <PartnerDataList
            :locales="locales.dataTable.partners"
            :do-delete-service="doDeleteData"
            v-if="item.name === 'Partners'"
            :table-info="item.data"
          />
          <ResultDataList
            :locales="locales.dataTable.results"
            :do-delete-service="doDeleteData"
            v-if="item.name === 'Results'"
            :table-info="item.data"
          />
          <CapabilityDataList
            :locales="locales.dataTable.caps"
            :do-delete-service="doDeleteData"
            v-if="item.name === 'Capabilities'"
            :table-info="item.data"
          />
        </v-container>

        <AddServiceForm
          :locales="locales.dataTable.services"
          :is-open="showAddForm.services"
          :info="addForm"
          :close-form="closeForm"
          :all-partners="allPartners"
          :update-data="addData"
        />
        <AddPartnerForm
          :locales="locales.dataTable.partners"
          :is-open="showAddForm.partners"
          :info="addForm"
          :close-form="closeForm"
          :all-users="allUsers"
          :update-data="addData"
        />
        <AddResultForm
          :locales="locales.dataTable.results"
          :is-open="showAddForm.results"
          :info="addForm"
          :close-form="closeForm"
          :all-surveys="allSurveys"
          :all-users="allUsers"
          :update-data="addData"
        />
        <AddCapabilityForm
          :locales="locales.dataTable.caps"
          :is-open="showAddForm.capabilities"
          :info="addForm"
          :close-form="closeForm"
          :all-users="allUsers"
          :update-data="addData"
        />
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import ServiceDataList from "@/components/admin-cabinet/tabs/manage-data/models/ServiceDataList";
import AddServiceForm from "@/components/admin-cabinet/tabs/manage-data/forms/AddServiceForm";
import PartnerDataList from "@/components/admin-cabinet/tabs/manage-data/models/PartnerDataList";
import ResultDataList from "@/components/admin-cabinet/tabs/manage-data/models/ResultDataList";
import CapabilityDataList from "@/components/admin-cabinet/tabs/manage-data/models/CapabilityDataList";
import AddPartnerForm from "@/components/admin-cabinet/tabs/manage-data/forms/AddPartnerForm";
import AddResultForm from "@/components/admin-cabinet/tabs/manage-data/forms/AddResultForm";
import AddCapabilityForm from "@/components/admin-cabinet/tabs/manage-data/forms/AddCapabilityForm";
export default {
  name: "DataItem",
  components: {
    AddCapabilityForm,
    AddResultForm,
    AddPartnerForm,
    CapabilityDataList,
    ResultDataList,
    PartnerDataList,
    AddServiceForm,
    ServiceDataList
  },
  props: [
    "item",
    "doDeleteData",
    "addData",
    "allPartners",
    "allUsers",
    "allSurveys",
    "searcher",
    "locales"
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
      addForm: {}
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
  }
};
</script>

<style scoped></style>
