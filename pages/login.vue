<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" sm="7">
        <h1 class="text-center">Login</h1>
        <v-form @submit.prevent="register" method="post">

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
                  </v-col>
                  <v-col cols="12">
                    <v-checkbox v-model="rememberMe" label="Remember Me"></v-checkbox>
                  </v-col>
                  <v-btn
                    block
                    color="mainGreen"
                    rounded
                    type="submit"
                    :disabled="$v.$invalid"
                  >Login
                  </v-btn>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {validationMixin} from 'vuelidate';
  import {email, maxLength, minLength, required, sameAs} from 'vuelidate/lib/validators';

  export default {
    name: "Login",
    mixins: [validationMixin],
    data: () => ({
      username: '',
      email: '',
      password: '',
      rememberMe: false
    }),
    validations: {
      username: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(25)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
    },
    methods: {
      usernameBlur() {
        this.showPrefix = false;
        this.$v.username.$touch();
      },
      register() {

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
        !this.$v.username.minLength &&
        errors.push('Username must be at least 4 characters long');
        !this.$v.username.maxLength &&
        errors.push("Usernames can't be longer than 25 characters");
        !this.$v.username.required && errors.push('Username is required.');
        return errors;
      },
      emailErrors() {
        const errors = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.email && errors.push('Must be valid e-mail');
        !this.$v.email.required && errors.push('E-mail is required');
        return errors;
      },
      passwordErrors() {
        const errors = [];
        if (!this.$v.password.$dirty) return errors;
        !this.$v.password.minLength &&
        errors.push('Password must be at least 6 characters long');
        !this.$v.password.required && errors.push('Password is required.');
        return errors;
      },
    }
  }
</script>

<style scoped>

</style>
