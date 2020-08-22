<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" sm="7">
        <h1 class="mb-2 display-1 text-center" style="font-weight: 900;">
          The social network for epic content</h1>
        <div class="subheading mb-3 text-center" justify-center
             style="font-weight: 900">Unlesh your creativity without limitations
        </div>

        <v-layout justify-center>
          <v-btn class="mt-5" color="mainPurple" rounded large to="/register">
            Sign up now!
          </v-btn>
        </v-layout>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
  const platform = require('platform');
  export default {
    name: "home",
    fetch({store}) {
      store.commit('updateTitle', 'home');
      store.commit('showNavBar', true);
      store.commit('hideEndNavBtn', false);
    },
    data: () => ({
      os: platform.os
    }),

  }
</script>

<style scoped>

</style>
