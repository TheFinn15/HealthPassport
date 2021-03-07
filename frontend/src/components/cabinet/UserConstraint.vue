<template>
  <v-card>
    <v-card-title>
      Статус профиля
      <v-spacer />
      <v-hover v-slot="{hover}">
        <v-tooltip bottom color="#FB8C00" v-for="(item, i) in statusProfile.statusIcon" :key="i">
          <template v-slot:activator="{on, attrs}">

            <v-icon x-large v-on="on" v-bind="attrs">
              sentiment_{{ item }}
            </v-icon>
          </template>
          <span>
          {{statusProfile.statusInfo[i]}}
        </span>
        </v-tooltip>
      </v-hover>
    </v-card-title>
    <v-divider />
  </v-card>
</template>

<script>
export default {
  name: "UserConstraint",
  props: ["constraint"],
  data() {
    return {
      statusProfile: {
        statusIcon: [
          "very_satisfied",
          "satisfied",
          "neutral",
          "dissatisfied",
          "very_dissatisfied",
        ],
        statusInfo: [
            "Состояние человека - полностью здоровое. Ограничения отсутствуют",
            "Состояние человека - есть маленький недуг. Рекомендация, проконсультироваться с врачом",
            "Состояние человека - не здоровое, есть отклонения от нормы.",
            "Состояние человека - требуется срочная мед. помощь !",
            "Состояние человека - человек при смерти!"
        ]
      }
    }
  },
  computed: {
    defineStatusPerson() {
      if (this.constraint)

    }
  }
}
</script>

<style scoped>

</style>
