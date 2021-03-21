<template>
  <v-card class="text-center mx-5">
    <v-card-text>
      <div class="display-1">
        Ывфафыа
      </div>
    </v-card-text>
    <v-card-text>
      <v-sparkline
        auto-draw
        padding="20"
        height="100"
        :value="users"
        :labels="getMonthForNow"
        :label-size="5"
        smooth
      >
        <template v-slot:label="item">
          {{ item.value }}
        </template>
      </v-sparkline>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Statistics",
  props: ["info"],
  data() {
    return {
      users: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      months: [
        {
          value: 0,
          text: "Январь"
        },
        {
          value: 1,
          text: "Февраль"
        },
        {
          value: 2,
          text: "Март"
        },
        {
          value: 3,
          text: "Апрель"
        },
        {
          value: 4,
          text: "Май"
        },
        {
          value: 5,
          text: "Июнь"
        },
        {
          value: 6,
          text: "Июль"
        },
        {
          value: 7,
          text: "Август"
        },
        {
          value: 8,
          text: "Сентябрь"
        },
        {
          value: 9,
          text: "Октябрь"
        },
        {
          value: 10,
          text: "Ноябрь"
        },
        {
          value: 11,
          text: "Декабрь"
        }
      ]
    };
  },
  computed: {
    getMonthForNow() {
      const nowDate = new Date().getMonth();
      const dates = [];

      for (let i = nowDate; i < 12; i++) {
        dates.push(i);
      }
      return this.months.filter(i => dates.includes(i.value)).map(i => i.text);
    }
  },
  async mounted() {
    const results = await this.$store.getters.getResults;
    console.log(this.months);
    for (let i = 0; i < results.length; i++) {
      try {
        const date = new Date(results[i].readyTime).getMonth();
        const ind = this.months.map(i => i.value).indexOf(date);
        console.log(ind);
        this.users[ind - 1] = i;
      } catch (e) {
        this.users[i] = 0;
      }
    }
  }
};
</script>

<style scoped></style>
