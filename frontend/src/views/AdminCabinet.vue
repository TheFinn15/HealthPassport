<template>
  <v-card style="margin: 5% 10%">
    <v-tabs grow color="#FB8C00" show-arrows>
      <v-tab>
        {{ curLocale.tabs[0].name }}
      </v-tab>
      <v-tab>
        {{ curLocale.tabs[1].name }}
      </v-tab>
      <v-tab>
        {{ curLocale.tabs[2].name }}
      </v-tab>

      <v-tab-item>
        <v-card>
          <v-card-title class="d-flex justify-center">
            {{ curLocale.tabs[0].context.title }}
          </v-card-title>
          <v-divider />
          <DataList
            :locales="curLocale.tabs[0].context"
            :surveys="tables[2].surveys"
            :users="tables[1].users"
            :partners="tables[0].partners"
            :add-data="doAddNewData"
            :info="tables"
            :do-delete-data="doDeleteData"
            :searcher="doSearchData"
          />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <ManageUser
          :locales="curLocale.tabs[1].context"
          :info="tables[1].users"
          :do-update-list="doUpdateList"
        />
      </v-tab-item>
      <v-tab-item>
        <Statistics :locales="curLocale.tabs[2].context" />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import ManageUser from "@/components/admin-cabinet/tabs/managa-user/ManageUser";
import Statistics from "@/components/admin-cabinet/tabs/statistics/Statistics";
import DataList from "@/components/admin-cabinet/tabs/manage-data/data-models/DataList";
export default {
  name: "AdminCabinet",
  components: { DataList, Statistics, ManageUser },
  data() {
    return {
      tables: [
        {
          name: "Services",
          count: 0,
          data: [],
          partners: []
        },
        {
          name: "Partners",
          count: 0,
          data: [],
          users: []
        },
        {
          name: "Results",
          count: 0,
          data: [],
          surveys: []
        },
        {
          name: "Capabilities",
          count: 0,
          data: []
        }
      ],
      curLocale: {},
      pageLocale: "admin-cabinet"
    };
  },
  methods: {
    doUpdateList(info) {
      if (info.action === "delete")
        this.tables[1].users = this.tables[1].users.filter(
          i => i.id !== info.id
        );
      else this.tables[1].users.push(info.item);
    },
    async doSearchData(info) {
      const curTable = this.tables.map(i => i.name).indexOf(info.name);
      if (info.text.length <= 0) {
        const res = [];

        if (info.name === "Services") {
          res.push(...(await this.$store.getters.getServices));
        } else if (info.name === "Partners") {
          res.push(...(await this.$store.getters.getPartners));
        } else if (info.name === "Results") {
          res.push(...(await this.$store.getters.getResults));
        } else if (info.name === "Capabilites") {
          res.push(...(await this.$store.getters.getCaps));
        }
        this.tables[curTable].data = res;
      }
      const regex = new RegExp(info.text, "i");
      this.tables[curTable].data = this.tables[curTable].data.filter(
        i => regex.test(i.name) || regex.test(i.info)
      );
    },
    doAddNewData(info) {
      const curTable = this.tables.map(i => i.name).indexOf(info.name);
      this.tables[curTable].data.push(info.data);
    },
    doDeleteData(item) {
      const curTable = this.tables.map(i => i.name).indexOf(item.name);
      this.tables[curTable].data = this.tables[curTable].data.filter(
        i => i.id !== item.id
      );
    }
  },
  beforeMount() {
    this.$i18n.locale = localStorage["locale"];
    this.curLocale = this.$t(this.pageLocale);
  },
  async mounted() {
    const services = await this.$store.getters.getServices;
    const partners = await this.$store.getters.getPartners;
    const results = await this.$store.getters.getResults;
    const caps = await this.$store.getters.getCaps;
    const users = await this.$store.getters.getAllUsers;

    this.$data.tables[0].count = services.length;
    this.$data.tables[0].data = services;
    this.$data.tables[0].partners = partners;

    this.$data.tables[1].count = partners.length;
    this.$data.tables[1].data = partners;
    this.$data.tables[1].users = users;

    this.$data.tables[2].count = results.length;
    this.$data.tables[2].data = results;
    this.$data.tables[2].surveys = services.filter(
      i => i.type === "TYPE_SURVEY"
    );

    this.$data.tables[3].count = caps.length;
    this.$data.tables[3].data = caps;
  }
};
</script>

<style scoped></style>
