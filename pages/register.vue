<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" sm="7">
        <h1 class="text-center">Create an Account</h1>
        <v-form @submit.prevent="register" method="post">
          <v-card raised rounded>
            <v-card-text>
              <v-container>
                <v-row align="center" justify="center">
                  <v-col cols="12">
                    <v-text-field
                      :error-messages="nameErrors"
                      @blur="$v.name.$touch"
                      @input="$v.name.$touch"
                      autofocus
                      counter="30"
                      label="Name"
                      required
                      v-model="name"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :error-messages="usernameErrors"
                      :loading="loadingUsername"
                      :prefix="(showPrefix || username.trim() !== '') ? 'milinks.ml/' : ''"
                      :value="modifyUsername"
                      @blur="$v.username.$touch"
                      @focus="showPrefix = false"
                      counter="25"
                      dense
                      hint="username may only contain letters numbers and underscores"
                      label="Username"
                      required
                      v-model="username"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :error-messages="emailErrors"
                      :loading="loadingEmail"
                      @blur="$v.email.$touch"
                      dense
                      label="Email"
                      required
                      v-model="email"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      :error-messages="passwordErrors"
                      @blur="$v.password.$touch"
                      @input="$v.password.$touch"
                      dense
                      label="Password"
                      required
                      type="password"
                      v-model="password"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field :error-messages="confirmPasswordErrors" @blur="$v.confirmPassword.$touch()"
                                  @input="$v.confirmPassword.$touch()" dense label="Confirm Password" required
                                  type="password"
                                  v-model="confirmPassword"></v-text-field>
                  </v-col>
                  <v-btn
                    :disabled="$v.$invalid"
                    block
                    color="mainGreen"
                    rounded
                    type="submit"
                  >Create an Account
                  </v-btn>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-form>
        <nuxt-link style="text-decoration: none; color: inherit;" to="/login">
          <div class="text-center my-4">
            Already have an account? Login
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
    name: "register",
    mixins: [validationMixin],
    middleware: ['notAuth'],
    fetch({store}) {
      store.commit('updateTitle', 'register');
      store.commit('showNavBar', true);
      store.commit('hideEndNavBtn', true);
    },
    data: () => ({
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPrefix: false,
      loadingUsername: false,
      loadingEmail: false,
    }),
    validations: {
      name: {
        required,
        maxLength: maxLength(30)
      },
      username: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(25),
        async isUnique(value) {
          this.loadingUsername = true;
          const data = await this.$axios.$post(`/users/uniqueUsername`, {
            username: value.trim().toLowerCase()
          });
          this.loadingUsername = false;
          return data.isUnique;
        }
      },
      email: {
        required,
        email,
        async isUnique(value) {
          this.loadingEmail = true;
          const data = await this.$axios.$post(`/users/uniqueEmail`, {
            email: value.trim().toLowerCase()
          });
          this.loadingEmail = false;
          return data.isUnique;
        }
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    },
    methods: {
      usernameBlur() {
        console.log('it has been blurred')
        this.showPrefix = false;
        this.$v.username.$touch;
      },
      async register() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          // const data = await axios({
          //   method: 'post',
          //   url: 'https://milinks.herokuapp.com/users/register',
          //   data: {
          //     username: this.username.trim().toLowerCase(),
          //     name: this.name.trim(),
          //     email: this.email.trim().toLowerCase(),
          //     password: this.password
          //   }
          // });
          const data = await this.$axios.$post('/users/register', {
            username: this.username.trim().toLowerCase(),
            name: this.name.trim(),
            email: this.email.trim().toLowerCase(),
            password: this.password
          });
          console.log(data);
          if (data.loggedIn) {
            this.$store.commit('setUser', data.user);
            await this.$router.push({path: `/profile`});
          } else {
            console.log(data.errors);
          }
          // await axios.get('https://milinks.herokuapp.com/users/logout');
        }

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
        if (errors.length) return errors;
        !this.$v.username.isUnique && errors.push('Username is taken.');
        return errors;
      },
      nameErrors() {
        const errors = [];
        if (!this.$v.name.$dirty) return errors;
        !this.$v.name.maxLength &&
        errors.push("Name can't be longer than 30 characters");
        !this.$v.name.required && errors.push('Name is required');
        return errors;
      },
      emailErrors() {
        const errors = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.email && errors.push('Must be valid e-mail');
        !this.$v.email.required && errors.push('E-mail is required');
        if (errors.length) return errors;
        !this.$v.email.isUnique && errors.push('Email is already taken.');
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
      confirmPasswordErrors() {
        const errors = [];
        if (!this.$v.confirmPassword.$dirty) return errors;
        !this.$v.confirmPassword.sameAsPassword &&
        errors.push('Password confirmation must be identical.');
        !this.$v.confirmPassword.required &&
        errors.push('Password Confirmation is required.');
        return errors;
      }
    }
  }
</script>

<style scoped>

</style>
