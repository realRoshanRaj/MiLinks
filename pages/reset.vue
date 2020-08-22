<template>
  <div>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Forgot Username or Password</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2">Name of step 2</v-stepper-step>

        <v-divider/>

        <v-stepper-step step="3">Confirmation</v-stepper-step>

      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          ></v-card>

          <v-btn
            color="primary"
            @click="step = 2"
          >
            Continue
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          ></v-card>

          <v-btn
            color="primary"
            @click="step = 3"
          >
            Submit
          </v-btn>

          <v-btn text @click="step=1">Back</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          >

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
  </div>
</template>

<script>
  export default {
    name: "reset",
    fetch({store}) {
      store.commit('updateTitle', 'reset');
      store.commit('showNavBar', true);
      store.commit('hideEndNavBtn', true);
    },
    data () {
      return {
        step: 1,
      }
    },
  }
</script>

<style scoped>

</style>
