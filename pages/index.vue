<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" sm="7" >
        <p class="text-md-h4 text-sm-h6 text-body-1 font-weight-medium mb-2 text-center text-no-wrap">
          One link for everything your bio needs</p>
        <p class="font-weight-bold text--disabled mb-3 text-center"
          >Every link you need, all in one place
        </p>

        <v-layout justify-center>
          <v-btn class="my-5" color="mainPurple" rounded large to="/register">
            Sign up now!
          </v-btn>
        </v-layout>

        <p class="text-center">
          <nuxt-link
            to="/login"
            style="text-decoration: none; color: inherit;"
          >Already signed up? Login</nuxt-link>
        </p>
      </v-col>
<!--      <v-col v-else>-->
<!--        <v-btn to="/profile">Go to profile</v-btn>-->
<!--      </v-col>-->
    </v-row>
  </v-container>

</template>

<script>
  const platform = require('platform');
  export default {
    name: "home",
    // middleware: 'default',
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
  /*p {*/
  /*  font-family: "Playfair Display", "Roboto", serif;*/
  /*}*/
</style>
