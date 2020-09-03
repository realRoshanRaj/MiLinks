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
          <v-layout class="justify-end">
            <v-btn :disabled="bioButton" @click="updateBio" color="mainGreen" right rounded>Update Bio</v-btn>
          </v-layout>
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
          <socials :socials="profile.socials"></socials>
        </v-col>
      </v-row>
    </section>
    <v-snackbar
      :color="snackBarColor"
      :timeout="2000"
      right
      top
      v-model="showSnackbar"
    >
      {{ snackBarText }}
      <v-btn @click="showSnackbar = false" text>Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  import Socials from "../../components/Socials";

  export default {
    name: "profile-page",
    components: {Socials},
    middleware: ['default', 'authenticated'],
    computed: {
      bioButton() {
        return (this.bio == this.profile.bio)
      }
    },
    async asyncData({store, $axios}) {
      store.commit('updateTitle', 'user');
      store.commit('showNavBar', true);
      store.commit('hideEndNavBtn', false);
      // if (store.state.authenticatedUser != null) {
      return {
        user: store.state.authenticatedUser,
        email: store.state.authenticatedUser.email,
        displayName: store.state.authenticatedUser.name,
        profile: store.state.authenticatedUser.profile,
        bio: store.state.authenticatedUser.profile.bio
      };
    },
    data: () => ({
      bio: '',
      showSnackbar: false,
      snackBarText: 'Test',
      snackBarColor: undefined,
    }),
    methods: {
      counter(value) {
        if (value) {
          return value.length + '/' + 70;
        } else {
          return '/' + 70;
        }
      },
      async updateBio() {
        if (this.bio == null) {
          this.bio = '';
        }
        const data = await this.$axios.$patch('/users/updateBio', {bio: this.bio});
        if (data.success) {
          // await this.$store.dispatch('checkAuth');
          const user = this.$store.state.authenticatedUser;
          user.profile.bio = this.bio;
          this.$store.commit('setUser', user);
          this.profile.bio = this.bio;
          this.showSnackbar = true;
          this.snackBarText = 'Bio Successfully Updated';
          this.snackBarColor = 'success';
        } else {
          this.showSnackbar = true;
          this.snackBarText = 'Error Updating Bio';
          this.snackBarColor = 'error';
        }
      },
    }
  }
</script>

<style scoped>

</style>
