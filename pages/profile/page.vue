<template>
  <v-container>
    <section>
      <div
        class="text-left headline font-weight-bold blue--text text--accent-3"
      >Page
      </div>
      <v-progress-linear buffer-value="0" color="" stream></v-progress-linear>
    </section>
    <section>
      <v-row class="ma-1 mt-6" no-gutters>
        <v-col
          cols="12"
          lg="3"
          md="4"
          xl="5"
        >
          <p class="title">Bio</p>
        </v-col>
        <v-col
          cols="12"
          lg="9"
          md="8"
          xl="7"
        >
          <v-textarea :counter-value="counter" clearable counter no-resize outlined rounded
                      rows="3" v-model="bio">
          </v-textarea>
        </v-col>
      </v-row>
    </section>
    <section>
    <v-row class="ma-1 mt-6" no-gutters>
      <v-col
        cols="12"
        lg="3"
        md="4"
        xl="5"
      >
        <p class="title">Socials</p>
      </v-col>
      <v-col
        cols="12"
        lg="9"
        md="8"
        xl="7"
      >
        <socials></socials>
      </v-col>
    </v-row>
    </section>
  </v-container>
</template>

<script>
  import Socials from "../../components/Socials";
  export default {
    name: "profile-page",
    components: {Socials},
    middleware: ['default', 'authenticated'],
    async asyncData({store, $axios}) {
      store.commit('updateTitle', 'user');
      store.commit('showNavBar', true);
      store.commit('hideEndNavBtn', false);
      // if (store.state.authenticatedUser != null) {
      return {
        user: store.state.authenticatedUser,
        email: store.state.authenticatedUser.email,
        displayName: store.state.authenticatedUser.name
      };
    },
    data: () => ({
      bio: ''
    }),
    methods: {
      counter(value) {
        if (value) {
          return value.length + '/' + 70;
        } else {
          return '/' + 70;
        }
      }
    }
  }
</script>

<style scoped>

</style>
