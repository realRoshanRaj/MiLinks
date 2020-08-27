<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" sm="7">
        <h1 class="text-center">Login</h1>
        <v-form @submit.prevent="login" method="post">
          <v-card raised rounded>
            <v-card-text>
              <v-container>
                <v-row align="center" justify="center">
                  <v-col cols="12">
                    <v-text-field
                      v-model="username"
                      :error-messages="usernameErrors"
                      :value="modifyUsername"
                      autofocus
                      dense
                      label="Username"
                      required
                      @blur="usernameBlur"
                      @input="$v.username.$touch;"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      :error-messages="passwordErrors"
                      dense
                      label="Password"
                      required
                      type="password"
                      @blur="$v.password.$touch"
                      @input="$v.password.$touch"
                    />
                    <v-alert
                      v-if="validationError"
                      dismissible
                      elevation="2"
                      type="error"
                    >{{ validationError }}
                    </v-alert>
                  </v-col>
                  <!--                  <v-col cols="12">-->
                  <!--                    <v-checkbox v-model="rememberMe" label="Remember Me"></v-checkbox>-->
                  <!--                  </v-col>-->

                  <v-btn
                    block
                    color="mainGreen"
                    rounded
                    type="submit"
                    :disabled="$v.$invalid"
                  >Login
                  </v-btn>
                  <nuxt-link style="text-decoration: none; color: inherit;" to="/reset">
                    <div class="text-center my-4">
                      Forgot Username or Password
                    </div>
                  </nuxt-link>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-form>
        <nuxt-link style="text-decoration: none; color: inherit;" to="/register">
          <div class="text-center my-4">
            Don't have an account? Signup
          </div>
        </nuxt-link>
<!--        <v-btn @click="checkAuth">{{$store.state.isAuthenticated}}</v-btn>-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {validationMixin} from 'vuelidate';
  import {required} from 'vuelidate/lib/validators';

  export default {
    name: "Login",
    mixins: [validationMixin],
    middleware: 'notAuth',
    data: () => ({
      username: '',
      password: '',
      rememberMe: false,
      validationError: ''
    }),
    validations: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
    fetch({store}) {
      store.commit('updateTitle', 'login');
      store.commit('showNavBar', true);
      store.commit('hideEndNavBtn', true);
    },
    methods: {
      usernameBlur() {
        this.showPrefix = false;
        this.$v.username.$touch();
      },
      async login() {
        // console.log('it has entered thy zoone')
        this.$v.$touch();
        if (!this.$v.$invalid) {
          const data = await this.$axios.$post('/users/login', {
            username: this.username.trim().toLowerCase(),
            password: this.password
          });

          console.log('data', data);

          if(data.success) {
            this.validationError = '';
            this.$store.commit('setUser', data.user);
            this.$router.push({path: `/${data.user.username}`});
          } else {
            console.log(data.errors);
            this.validationError = 'Invalid Login Credentials';
          }

          // await this.$store.dispatch('login');
        }
      },
      async checkAuth() {
        const data = await this.$axios.$post('/users/isAuth');
        console.log('data recieved');
        console.log(data);
      }
    },
    computed: {
      modifyUsername() {
        this.username = this.username.toLowerCase().replace(/\s/g, "").trim();
        return this.username;
      },

      usernameErrors() {
        const errors = [];
        if (!this.$v.username.$dirty) return errors;
        !this.$v.username.required && errors.push('Username is required.');
        return errors;
      },
      passwordErrors() {
        const errors = [];
        if (!this.$v.password.$dirty) return errors;
        !this.$v.password.required && errors.push('Password is required.');
        return errors;
      },

    }
  }
</script>

<style scoped>

</style>
