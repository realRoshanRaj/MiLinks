<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-button @click="logout">Hello</v-button>
      <v-col cols="12">
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1">Forgot Username or Password</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="step > 2" step="2">Enter Email</v-stepper-step>

            <v-divider/>

            <v-stepper-step step="3">Confirmation</v-stepper-step>

          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card
                class="mb-12"
                color="transparent"
                flat
                height="100px"
              >
                <v-card-text>
                  <v-select v-model="selection" :items="comboboxItems"
                            label="Did you forgot your username or password?">
                  </v-select>
                </v-card-text>

              </v-card>

              <v-btn
                color="primary"
                :disabled="selection === ''"
                @click="step = 2"
              >
                Continue
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card
                class="mb-12"
                color="transparent"
                flat
              >
                <v-card-title>
                  <span v-if="selection === 'Password'">
                    Reset Password
                  </span>
                  <span v-else>
                    Forgot Username
                  </span>
                </v-card-title>
                <v-card-text>
                  <v-text-field v-model="email" :error-messages="emailErrors" solo label="Your email address"
                                @blur="$v.email.$touch"
                                @input="$v.email.$touch">

                  </v-text-field>
                </v-card-text>
              </v-card>

              <v-btn
                color="primary"
                @click="step = 3"
                :disabled="$v.$invalid"
              >
                 <span v-if="selection === 'Password'">
                    Reset my Password
                  </span>
                <span v-else>
                    Submit
                  </span>
              </v-btn>

              <v-btn text @click="step=1">Back</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                class="mb-12"
                color="transparent"
                height="150px"
              >
                Please check your email
              </v-card>

              <!--<v-btn
                color="primary"
                @click="step = 2"
              >
                Back
              </v-btn>-->
            </v-stepper-content>
          </v-stepper-items>

        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {validationMixin} from 'vuelidate';
  import {email, required} from 'vuelidate/lib/validators';

  export default {
    name: "reset",
    mixins: [validationMixin],
    fetch({store}) {
      store.commit('updateTitle', 'reset');
      store.commit('showNavBar', true);
      store.commit('hideEndNavBtn', true);
    },
    computed: {
      emailErrors() {
        const errors = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.email && errors.push('Must be valid e-mail');
        !this.$v.email.required && errors.push('E-mail is required');
        return errors;
      }
    },
    data() {
      return {
        step: 1,
        selection: '',
        comboboxItems: ['Username', 'Password'],
        email: ''
      }
    },
    validations: {
      email: {
        required,
        email
      },
    },
    methods: {
      async logout() {
        await this.$axios.$get('/users/signout');
      }
    }
  }
</script>

<style scoped>

</style>
