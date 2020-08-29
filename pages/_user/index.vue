<template>
  <v-container fluid>
    <div v-if="user">
      <v-card color="transparent">
        <v-card-text>
          <v-row justify="center">
            <!--            {{$store.state.isAuthenticated}}-->
            <v-avatar size="40%">
              <img
                alt="Profile Picture"
                :src="user.profile.avatar"
              >
            </v-avatar>
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-row justify="center">
            <div class="text-capitalize font-weight-medium text-h4">
              {{user.name}}
            </div>
          </v-row>
        </v-card-text>
      </v-card>
      <!--    <h1>{{user}}</h1>-->
    </div>
    <div v-else>
     This user don't exist page (COMING SOON);
    </div>
  </v-container>
</template>

<script>
  export default {
    name: "user",
    // called every time before loading the component
    async asyncData({params, store, payload, $axios}) {
      store.commit('updateTitle', 'user');
      store.commit('showNavBar', false);
      store.commit('hideEndNavBtn', false);
      if (payload) {
        console.log('from payload');
        return {user: payload};
      } else {
        const {user} = await $axios.$get(`/users/getUser/${params.user}`);
        console.log('gather from axios');
        return {user};
      }
    },
    data: () => ({
      showAvatarOverlay: false,
      changeAvatarDialog: false,
    }),

  }
</script>

<style scoped>

</style>
