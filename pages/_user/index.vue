<template>
  <div>
    {{$store.state.isAuthenticated}}
    <h1>{{user}}</h1>
  </div>

</template>

<script>
  export default {
    name: "user",
    fetch({store}) {
      store.commit('updateTitle', 'user');
      store.commit('showNavBar', true);
      store.commit('hideEndNavBtn', false);
      return store.dispatch('checkAuth');
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
        // const user = await $axios.$get(`/users/${params.user}`);
        return {user: null};
      }
    }

  }
</script>

<style scoped>

</style>
