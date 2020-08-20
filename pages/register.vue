<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6" sm="7">
        <h1 class="text-center">Create an Account</h1>
        <v-form method="post" @submit.prevent="register">

          <v-card raised rounded>
            <v-card-text>
              <v-container>
                <v-row align="center" justify="center">
                  <v-col cols="12">
                    <v-text-field label="Name" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Username"
                      hint="username may only contain letters numbers and underscores"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Email" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Password" type="password" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Confirm Password" type="password" required></v-text-field>
                  </v-col>
                  <v-btn
                    block
                    rounded
                    type="submit"
                    color="mainGreen"
                  >Create an Account
                  </v-btn>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "register",
    data: () => ({}),
    methods: {
      register() {

      }
    }
  }
</script>

<style scoped>

</style>
