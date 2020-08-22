<template>
  <div>
  </div>
</template>

<script>
  const platform = require('platform');
  export default {
    name: "home",
    fetch({ store }) {
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

</style>
