<template>
  <nav>
    <v-toolbar>
      <v-toolbar-title>
        <nuxt-link
          to="/"
          style="text-decoration: none; color: inherit;"
        >
          <v-avatar>
            <img
              src="/LogoMiLinks.png"
              alt="Logo"
            >
          </v-avatar>
          <span v-if="$vuetify.breakpoint.smAndUp">MiLinks</span>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-switch
        v-model="$vuetify.theme.dark"
        label="Dark Theme"
      />
      <v-btn
        class="mx-2"
        rounded
        text
        to="/login"
        @click="showLoginForm = !showLoginForm"
      >
        Login
      </v-btn>
      <v-btn
        color="mainGreen"
        rounded
        to="/register"
      >
        Sign up
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
  export default {
    name: "NavBar",
    data: () => ({
      showLoginForm: false,
    }),
  }
</script>

<style scoped>

</style>
