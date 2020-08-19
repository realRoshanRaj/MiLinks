<template>
    <b-navbar toggleable="md">
      <b-navbar-brand href="#">MiLinks</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-button class="text-decoration-none mx-1" to="/login"
                    :variant="$store.state.theme === 'dark'? 'white' : 'black' ">Login
          </b-button>
          <b-button to="/register" pill variant="info">Signup</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>

</style>
