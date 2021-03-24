<template>
  <v-card>
    <v-container>
      <v-row>
        <UsersItem
          v-for="(item, i) in info"
          :key="i"
          :item="item"
          :do-update-list="doUpdateList"
          :rules="rules"
          :roles="roles"
          :locales="locales"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import UsersItem from "@/components/admin-cabinet/tabs/managa-user/UsersItem";
export default {
  name: "UsersList",
  components: { UsersItem },
  props: ["info", "doUpdateList", "roles", "rules", "locales"]
};
</script>

<style scoped></style>
