<template>
  <h1>{{user}}</h1>
</template>

<script>
  export default {
    name: "user",
    fetch({store}) {
      store.commit('updateTitle', 'user');
      store.commit('showNavBar', false);
    },
    // asyncData({params}) {
    //   // called every time before loading the component
    //   return {
    //     user: params.user
    //   }
    // }
    async asyncData({params, error, payload, $axios}) {
      if (payload) {
        return {user: payload};
      } else {
        const user = await $axios.$get(`/users/${params.user}`);
        return {user};
      }
    }

  }
</script>

<style scoped>

</style>
