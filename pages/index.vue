<template>
  <div>
  </div>
</template>

<script>
  const platform = require('platform');
  export default {
    name: "home",
    data: () => ({
        os: platform.os
    }),

  }
</script>

<style scoped>

</style>
