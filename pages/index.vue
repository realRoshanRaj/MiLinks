<template>
  <div>
    <a href="https://www.instagram.com/barackobama">Browser</a>
    <a href="instagram://user?username=barackobama">Mobile</a>
    {{os.family}}
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
