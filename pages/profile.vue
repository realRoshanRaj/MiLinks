<template>
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
</template>

<script>
  export default {
    name: "profile",
    middleware: ['default', 'authenticated'],
    fetch({ store }) {
      store.commit('updateTitle', 'user');
      store.commit('showNavBar', true);
      store.commit('hideEndNavBtn', false);
    },
    // asyncData({params}) {
    //   // called every time before loading the component
    //   return {
    //     user: params.user
    //   }
    // }
    data: () => ({
      showAvatarOverlay: false,
      changeAvatarDialog: false,
    }),
  }
</script>

<style scoped>

</style>
