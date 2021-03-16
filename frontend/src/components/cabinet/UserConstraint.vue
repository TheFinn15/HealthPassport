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
    <v-list v-if="userInfo.caps.length > 0">
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
                  <v-card-subtitle>
                    {{ checkCapLevel(item.hazardLevel) }}
                    <v-spacer />
                    Болезнь через которую выявлено: <br />
                    <b>{{ item.ill.name }}</b>
                  </v-card-subtitle>
                </v-list-item-subtitle>
                <v-list-item-title>
                  О данной болезни: <br />
                  <v-card-subtitle>
                    {{ item.info }}
                  </v-card-subtitle>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-group>
      </v-list-group>
    </v-list>
    <div
      style="display: flex; justify-content: center; align-items: center; flex-direction: column; padding: 15%"
    >
      <v-icon x-large>
        mood
      </v-icon>
      <v-card-title>
        Ограничения отсутствуют
      </v-card-title>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { CapsType } from "@/types/caps.type";

export default Vue.extend({
  name: "UserConstraint",
  props: ["userInfo"],
  data() {
    return {
      checkCapLevel: (level: string) => {
        let res = "";

        if (level === "OKAY_LEVEL") res = "Состояние здоровое";
        if (level === "NORMAL_LEVEL") res = "Состояние вполне здоровое";
        if (level === "NOT_OKAY_LEVEL") res = "Состояние не здоровое";
        if (level === "DANGER_LEVEL") res = "Состояние критическое";
        if (level === "DEATHLY_LEVEL") res = "Состояние при смерти";

        return res;
      },
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
      const result: any = {
        OKAY_LEVEL: [] as CapsType[],
        NORMAL_LEVEL: [] as CapsType[],
        NOT_OKAY_LEVEL: [{}] as CapsType[],
        DANGER_LEVEL: [{}] as CapsType[],
        DEATHLY_LEVEL: [{}] as CapsType[]
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
});
</script>

<style scoped></style>
