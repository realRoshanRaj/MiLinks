<template>
  <div>
    <v-card>
      <v-row justify="center">
        <v-avatar
          @mouseenter="showAvatarOverlay = true"
          @mouseleave="showAvatarOverlay = false"
          size="250"
        >
          <v-img
            :src="user.profile.avatar"
            alt="Avatar"
            lazy-src="/imageNotFound.jpg"
          ></v-img>
          <v-overlay :value="showAvatarOverlay" absolute>
            <v-btn @click="changeAvatarDialog = true" large>
              Edit Avatar
            </v-btn>
          </v-overlay>
        </v-avatar>
      </v-row>
    </v-card>
    <!--    <h1>{{user}}</h1>-->
    {{$store.state.isAuthenticated}}

  </div>
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
        return {user: payload};
      } else {
        const {user} = await $axios.$get(`/users/getUser/${params.user}`);
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
