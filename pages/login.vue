<template>
  <b-container class="bv-example-row bv-example-row-flex-cols">
    <!--    <h1>Login nnn Page</h1>-->
    <b-row align-v="center">
      <b-col>
        <div
          class="fixed-top d-flex align-items-center justify-content-center"
          style="bottom: 0; overflow-y: auto"
        >
          <b-form @submit="submit" class="rounded p-5 border">
            <b-form-group id="input-group-1" label="Your Name:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="loginInfo.name"
                required
                placeholder="Enter name"
              ></b-form-input>
            </b-form-group>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: "login",
    data: () => ({
      loginInfo: {
        name: '',
        email: '',
        password: '',
        confirmedPassword: ''
      }
    }),
    methods: {
      submit() {
        alert(JSON.stringify(this.loginInfo));
      }
    },
    transition: {
      name: 'test',
      mode: 'out-in'
    }
  }
</script>

<style scoped>

</style>
