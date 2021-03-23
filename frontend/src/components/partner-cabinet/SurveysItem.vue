<template>
  <v-row>
    <v-col
      cols="1"
      style="display: flex; justify-content: center; align-items: center"
    >
      <v-tooltip right color="#FB8C00">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="info"
            @click="viewResult = true"
            v-on="on"
            v-bind="attrs"
          >
            <v-icon>
              remove_red_eye
            </v-icon>
          </v-btn>
        </template>
        <span>
          {{ locales.btnView }}
        </span>
      </v-tooltip>
      <v-dialog v-model="viewResult" persistent max-width="420">
        <v-card rounded>
          <v-card-title style="display: flex; justify-content: center">
            <v-dialog v-model="showUserInfo" max-width="420" persistent>
              <v-card rounded>
                <v-card-title style="display: flex; justify-content: center">
                  {{ locales.viewDialog.user.title }}
                  <v-btn icon absolute right @click="showUserInfo = false">
                    <v-icon>
                      close
                    </v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider />
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        :label="locales.viewDialog.user.labels[0]"
                        v-model="survey.user.fullName"
                        outlined
                        readonly
                        shaped
                        color="#FB8C00"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        :label="locales.viewDialog.user.labels[1]"
                        v-model="survey.user.login"
                        outlined
                        readonly
                        shaped
                        color="#FB8C00"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        :label="locales.viewDialog.user.labels[2]"
                        v-model="survey.user.phone"
                        outlined
                        readonly
                        shaped
                        color="#FB8C00"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        :label="locales.viewDialog.user.labels[3]"
                        v-model="survey.user.email"
                        outlined
                        readonly
                        shaped
                        color="#FB8C00"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-dialog>
            <v-tooltip right color="#FB8C00">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  outlined
                  absolute
                  left
                  small
                  color="#FB8C00"
                  v-on="on"
                  v-bind="attrs"
                  @click="showUserInfo = true"
                >
                  <v-icon>
                    person
                  </v-icon>
                </v-btn>
              </template>
              <span>
                {{ locales.viewDialog.btnUser }}
              </span>
            </v-tooltip>
            {{ locales.viewDialog.title }}
            <v-btn icon absolute right @click="viewResult = false">
              <v-icon>
                close
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-textarea
                  :label="locales.viewDialog.labels[0]"
                  outlined
                  shaped
                  color="#FB8C00"
                  :readonly="isDone"
                  v-model="survey.info"
                />
              </v-col>
              <v-col cols="6">
                <v-card-subtitle class="pb-0">
                  {{ locales.viewDialog.labels[1] }}
                </v-card-subtitle>
                <v-radio-group v-model="isDone" :readonly="isDone">
                  <v-radio
                    :label="locales.viewDialog.labels[2][0]"
                    :value="true"
                    color="#FB8C00"
                  />
                  <v-radio
                    :label="locales.viewDialog.labels[2][1]"
                    :value="false"
                    color="#FB8C00"
                  />
                </v-radio-group>
              </v-col>
              <v-col cols="6" v-if="!isDone">
                <v-checkbox
                  :label="locales.viewDialog.labels[3]"
                  v-model="isDone"
                  color="#FB8C00"
                />
              </v-col>
              <v-col cols="12" v-if="isDone">
                <v-text-field
                  :label="locales.viewDialog.labels[4]"
                  shaped
                  outlined
                  color="#FB8C00"
                  readonly
                  v-model="getNowDate"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-col>
    <v-col cols="3">
      <v-card-subtitle class="pb-0">
        {{ locales.labels[0] }}
      </v-card-subtitle>
      <v-card-title>
        {{ survey.info }}
      </v-card-title>
    </v-col>
    <v-col cols="3">
      <v-card-subtitle class="pb-0">
        {{ locales.labels[1] }}
      </v-card-subtitle>
      <v-card-title style="word-break: break-word">
        {{ mapDate(survey.passingTime) }}
      </v-card-title>
    </v-col>
    <v-col cols="3">
      <v-card-subtitle class="pb-0">
        {{ locales.labels[2] }}
      </v-card-subtitle>
      <v-card-title style="word-break: break-word">
        {{ mapDate(survey.readyTime) }}
      </v-card-title>
    </v-col>
    <v-col cols="2">
      <v-card-subtitle class="pb-0">
        {{ locales.labels[3] }}
      </v-card-subtitle>
      <v-card-title>
        {{ survey.isSick ? locales.labels[4][0] : locales.labels[4][1] }}
      </v-card-title>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SurveysItem",
  props: ["survey", "locales"],
  data() {
    return {
      isDone: this.survey.isSick,
      viewResult: false,
      showUserInfo: false,
      mapDate(date) {
        if (date === null) {
          return this.locales.labels[5];
        } else {
          const dateTime = new Date(date);
          return dateTime.toLocaleString();
        }
      }
    };
  },
  computed: {
    getNowDate() {
      const [day, month, year] = new Date().toLocaleDateString().split(".");
      return `${day}/${month}/${year} - ` + new Date().toLocaleTimeString();
    }
  }
};
</script>

<style scoped></style>
