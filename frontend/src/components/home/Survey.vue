<template>
  <v-card outlined>
    <v-list-group append-icon="subdirectory_arrow_left">
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>
            <v-card-title>
              Обследования
            </v-card-title>
          </v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item>
        <v-list-item-content>
          <v-card v-if="surveys.length > 0">
            <v-card-subtitle>
              Вы делали обследования:
            </v-card-subtitle>
            <v-card v-for="(item, i) in surveys" :key="i" flat>
              <v-divider />
              <v-card-title>
                {{i+1}} - {{item.name}}
                <v-spacer />
                <v-snackbar color="info" top timeout="3000" v-model="alertInfo">
                  <span>
                    {{item.info}}
                  </span>
                  <template v-slot:action="{attrs}">
                    <v-btn icon @click="alertInfo = false" v-bind="attrs">
                      <v-icon>
                        close
                      </v-icon>
                    </v-btn>
                  </template>
                </v-snackbar>
                <v-tooltip bottom>
                  <template v-slot:activator="{on, attrs}">
                    <v-btn icon v-on="on" v-bind="attrs" @click="alertInfo = !alertInfo">
                      <v-icon>
                        info
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>
                    Инфо о обследование
                  </span>
                </v-tooltip>
              </v-card-title>
            </v-card>
          </v-card>
          <v-card v-else>
            <div style="justify-content: center; display: flex">
              <v-icon>
                warning
              </v-icon>
              <v-card-title>
                Обследования отсутствуют
              </v-card-title>
              <v-icon>
                warning
              </v-icon>
            </div>
          </v-card>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-card>
</template>

<script>
export default {
  name: "Survey",
  props: ['surveys']
}
</script>

<style scoped>

</style>
