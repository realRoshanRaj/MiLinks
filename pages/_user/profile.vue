<template>
  <h3>{{user}}</h3>
</template>

<script>
  export default {
    name: "user-profile",
    middleware: ['default', 'authenticated'],
    fetch({ store }) {
      store.commit('updateTitle', 'user');
      store.commit('showNavBar', true);
      store.commit('hideEndNavBtn', false);
    },
    asyncData({params}) {
      // called every time before loading the component
      return {
        user: params.user
      }
    }
  }
</script>

<style scoped>

</style>
