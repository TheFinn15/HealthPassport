<template>
  <v-card>
    <v-card-title>
      Статус профиля
      <v-spacer />
      <v-tooltip
        bottom
        color="#FB8C00"
        v-for="(item, i) in statusProfile.statusIcon"
        :key="i"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-if="statusProfile.activeStatus[i] !== ''"
            :color="statusProfile.activeStatus[i]"
            x-large
            v-on="on"
            v-bind="attrs"
          >
            sentiment_{{ item }}
          </v-icon>
          <v-icon v-else x-large v-on="on" v-bind="attrs">
            sentiment_{{ item }}
          </v-icon>
        </template>
        <span v-if="statusProfile.activeStatus[i] !== ''">
          {{ statusProfile.statusInfo[i].name }}
        </span>
        <span v-else>
          Статус неактивен
        </span>
      </v-tooltip>
    </v-card-title>
    <v-divider />
    <v-list>
      <v-list-group
        v-for="(item, i) in userInfo.caps"
        :key="i"
        append-icon="subdirectory_arrow_left"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              <v-card-title>
                {{ item.name }}
              </v-card-title>
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-group sub-group no-action prepend-icon="">
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>
                  {{item.hazardLevel}}
                </v-list-item-subtitle>
                <v-list-item-title>
                  {{ item.info }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-group>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
export default {
  name: "UserConstraint",
  props: ["userInfo"],
  data() {
    return {
      statusProfile: {
        activeStatus: ["", "", "", "", ""],
        statusIcon: [
          "very_satisfied",
          "satisfied",
          "neutral",
          "dissatisfied",
          "very_dissatisfied"
        ],
        statusInfo: [
          {
            name:
              "Состояние человека - полностью здоровое. Ограничения отсутствуют",
            level: "OKAY_LEVEL"
          },
          {
            name:
              "Состояние человека - есть маленький недуг. Рекомендация, проконсультироваться с врачом",
            level: "NORMAL_LEVEL"
          },
          {
            name: "Состояние человека - не здоровое, есть отклонения от нормы.",
            level: "NOT_OKAY_LEVEL"
          },
          {
            name: "Состояние человека - требуется срочная мед. помощь !",
            level: "DANGER_LEVEL"
          },
          {
            name: "Состояние человека - человек при смерти!",
            level: "DEATHLY_LEVEL"
          }
        ]
      }
    };
  },
  beforeMount() {
    if (this.userInfo.caps.length > 0) {
      const caps = this.userInfo.caps;
      const result = {
        OKAY_LEVEL: [],
        NORMAL_LEVEL: [],
        NOT_OKAY_LEVEL: [{}],
        DANGER_LEVEL: [{}],
        DEATHLY_LEVEL: [{}]
      };
      for (const item of caps) {
        result[item.hazardLevel].push(item);
      }
      const allCounts = [
        result.OKAY_LEVEL.length,
        result.NORMAL_LEVEL.length,
        result.NOT_OKAY_LEVEL.length,
        result.DANGER_LEVEL.length,
        result.DEATHLY_LEVEL.length
      ];
      const maxInd = allCounts.indexOf(Math.max(...allCounts));

      if (maxInd === 0) this.statusProfile.activeStatus[0] = "success";
      if (maxInd === 1) this.statusProfile.activeStatus[1] = "info";
      if (maxInd === 2) this.statusProfile.activeStatus[2] = "primary";
      if (maxInd === 3) this.statusProfile.activeStatus[3] = "orange";
      if (maxInd === 4) this.statusProfile.activeStatus[4] = "red";
    } else {
      this.statusProfile.activeStatus[0] = "success";
    }
  }
};
</script>

<style scoped></style>
