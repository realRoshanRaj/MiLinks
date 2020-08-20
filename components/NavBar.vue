<template>
  <nav>
    <v-toolbar>
      <v-toolbar-title>
        <router-link to="/"
                     style="text-decoration: none; color: inherit;">
          <v-avatar>
            <img
              src="/LogoMiLinks.png"
              alt="Logo"
            >
          </v-avatar>
          MiLinks
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-btn rounded>Login</v-btn>
      <v-btn rounded>Sign up</v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>

</style>
