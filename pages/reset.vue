<template>

</template>

<script>
  export default {
    name: "reset",
    fetch({store}) {
      store.commit('updateTitle', 'reset');
      store.commit('showNavBar', true);
      store.commit('hideEndNavBtn', true);
    },
  }
</script>

<style scoped>

</style>
