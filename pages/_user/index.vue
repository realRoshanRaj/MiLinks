<template>
  <div>
    {{$store.state.isAuthenticated}}
    <h1>{{user}}</h1>
  </div>

</template>

<script>
  export default {
    name: "user",
    // asyncData({params}) {
    //   // called every time before loading the component
    //   return {
    //     user: params.user
    //   }
    // }
    async asyncData({params, store, payload, $axios}) {
      store.commit('updateTitle', 'user');
      store.commit('showNavBar', true);
      store.commit('hideEndNavBtn', false);
      if (payload) {
        return {user: payload};
      } else {
        const {user} = await $axios.$get(`/users/getUser/${params.user}`);
        return {user};
      }
    }

  }
</script>

<style scoped>

</style>
