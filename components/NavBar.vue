<template>
  <nav v-if="!hide">
    <v-toolbar>
      <v-toolbar-title>
        <nuxt-link
          style="text-decoration: none; color: inherit;"
          to="/"
        >
          <v-avatar>
            <img
              alt="Logo"
              src="/LogoMiLinks.png"
            >
          </v-avatar>
          <span v-if="$vuetify.breakpoint.smAndUp">MiLinks</span>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer/>
      <!--            <v-switch-->
      <!--                    v-model="$vuetify.theme.dark"-->
      <!--                    label="Dark Theme"-->
      <!--            />-->
      <div v-if="!hideEndButtons">
        <div v-if="authenticated">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="transparent"
                depressed
                v-bind="attrs"
                v-on="on"
              >
                <v-avatar class="mr-1" size="32px">
                  <img
                    :src="$store.state.authenticatedUser.profile.avatar"
                    alt="PFP"
                  >
                </v-avatar>
                <!--                        <v-icon left>mdi-dots-vertical</v-icon>-->
                {{$store.state.authenticatedUser.username}}
              </v-btn>
            </template>

            <v-list>
              <v-list-item to="/profile" exact>
                <v-icon left>mdi-account</v-icon>
                <v-list-item-content>Account</v-list-item-content>
              </v-list-item>

              <v-list-item to="/profile/page" exact>
                <v-icon left>mdi-logout-variant</v-icon>
                <v-list-item-content>MiPage</v-list-item-content>
              </v-list-item>

              <v-list-item @click="logout">
                <!--                <v-list-item-icon>-->

                <!--                </v-list-item-icon>-->
                <v-icon left>mdi-logout-variant</v-icon>
                <v-list-item-content>Logout</v-list-item-content>
              </v-list-item>

            </v-list>
          </v-menu>
          <!--<v-btn
                  color="mainGreen"
                  rounded
                  @click="logout"
          >
              Logout
          </v-btn>-->
        </div>
        <div v-else>


          <v-btn
            @click="showLoginForm = !showLoginForm"
            class="mx-2"
            rounded
            text
            to="/login"
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
        </div>
      </div>
    </v-toolbar>
  </nav>
</template>

<script>
  export default {
    name: "NavBar",
    data: () => ({
      showLoginForm: false,
    }),
    props: {
      hide: {
        type: Boolean,
        default: false
      },
      hideEndButtons: {
        type: Boolean,
        default: false
      },
      authenticated: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      async logout() {
        const data = await this.$axios.$get('/users/logout');
        if (data.success) {
          this.$store.commit('setUser', null);
        }
        await this.$router.push('/');
      }
    }
  }
</script>

<style scoped>

</style>
