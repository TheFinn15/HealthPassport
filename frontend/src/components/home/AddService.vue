<template>
  <v-dialog max-width="680" persistent v-model="isOpen">
    <v-card>
      <v-card-title style="display: flex; justify-content: center">
        {{ locales.addServices.services.title }}
        <v-btn icon @click="doCloseForm" absolute right>
          <v-icon>
            close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              :label="locales.addServices.services.searchLabel"
              outlined
              shaped
              color="#FB8C00"
              v-model="searchText"
              @input="doSearchService"
            />
          </v-col>
          <v-col cols="12">
            <v-checkbox
              :label="locales.addServices.services.recommends"
              v-model="recommends.state"
              @click="getRecommends"
              color="#FB8C00"
            />
            <v-radio-group v-model="typesService" @change="filterService">
              <v-radio
                :label="locales.addServices.services.radioBtns[0]"
                color="#FB8C00"
                value="vaccines"
              />
              <v-radio
                :label="locales.addServices.services.radioBtns[1]"
                color="#FB8C00"
                value="surveys"
              />
              <v-radio
                v-if="typesService === 'surveys' || typesService === 'vaccines'"
                :label="locales.addServices.services.radioBtns[2]"
                color="#FB8C00"
                value="off"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <ServiceList
              :locales="locales"
              :close-form="doCloseForm"
              :update-service="updateService"
              :services="services"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import ServiceList from "@/components/home/ServiceList";
export default {
  name: "AddService",
  components: { ServiceList },
  props: ["isOpen", "closer", "updateService", "recommends", "locales"],
  data() {
    return {
      services: [],
      searchText: "",
      typesService: ""
    };
  },
  methods: {
    async getRecommends() {
      if (this.recommends.state) {
        const allData = [...this.recommends.data.surveys];
        allData.push(...this.recommends.data.vaccines);

        this.services = [...allData];
      } else await this.filterService();
    },
    async filterService() {
      if (this.recommends.state) {
        const allData = [...this.recommends.data.surveys];
        allData.push(...this.recommends.data.vaccines);

        this.services = [...allData];
      } else {
        this.services = (await this.$store.getters.getServices).filter(
          i => i.type === "TYPE_SURVEY" || i.type === "TYPE_VACCINE"
        );
      }

      if (this.typesService === "surveys") {
        this.services = this.services.filter(i => i.type !== "TYPE_VACCINE");
      } else if (this.typesService === "vaccines") {
        this.services = this.services.filter(i => i.type !== "TYPE_SURVEY");
      }
    },
    async doSearchService() {
      if (this.searchText !== "") {
        const regex = new RegExp(this.searchText, "i");
        this.services = this.services.filter(i => {
          if (regex.test(i.name)) {
            return i;
          }
        });
      } else {
        this.services = (await this.$store.getters.getServices).filter(
          i => i.type === "TYPE_SURVEY" || i.type === "TYPE_VACCINE"
        );
      }
    },
    doCloseForm() {
      this.closer(false);
    }
  },
  async mounted() {
    this.services = (await this.$store.getters.getServices).filter(
      i => i.type === "TYPE_SURVEY" || i.type === "TYPE_VACCINE"
    );
  }
};
</script>

<style scoped></style>
