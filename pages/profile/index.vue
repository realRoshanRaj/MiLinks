<template>
  <v-container>
    <section>
      <v-card color="transparent" flat tile>
        <v-card-text>
          <v-row justify="center">
            <v-avatar
              @mouseenter="showAvatarOverlay = true"
              @mouseleave="showAvatarOverlay = false"
              size="250"
            >
              <v-img
                :src="user.profile.avatar"
                alt="Avatar"
                lazy-src="/imageNotFound.jpg"
              ></v-img>
              <v-overlay :value="showAvatarOverlay" absolute>
                <v-btn @click="changeAvatarDialog = true" large>
                  Edit Avatar
                </v-btn>
              </v-overlay>
            </v-avatar>
          </v-row>
        </v-card-text>
        <v-card-title
          class="text-left headline font-weight-bold blue--text text--accent-3"
        >Account
        </v-card-title>
      </v-card>
    </section>
    <v-progress-linear buffer-value="0" color="" stream></v-progress-linear>
    <section>
      <v-row class="ma-1">
        <v-col
          class="mt-4"
          cols="12"
          lg="5"
          md="6"
          v-if="!this.$store.state.profile.oauth"
          xl="5"
        >
          <v-card color="transparent" flat tile>
            <p class="title">Username</p>
          </v-card>
        </v-col>
        <v-col
          class="mt-3"
          cols="12"
          lg="7"
          md="6"
          v-if="!this.$store.state.profile.oauth"
          xl="7"
        >
          <v-card color="transparent" flat tile>
            <v-text-field
              :value="user.username"
              dense
              disabled
              flat
              rounded
              solo
            ></v-text-field>
          </v-card>
        </v-col>
        <!--Display Name-->
        <v-col class="mt-2" cols="12" lg="5" md="6" xl="5">
          <v-card color="transparent" flat tile>
            <p class="title">Name</p>
          </v-card>
        </v-col>
        <v-col cols="12" lg="7" md="6" xl="7">
          <v-card color="transparent" flat tile>
            <v-text-field
              :error-messages="displayNameErrors"
              :readonly="!displayNameEnabled"
              @blur="$v.displayName.$touch()"
              @input="$v.displayName.$touch()"
              dense
              flat
              rounded
              solo
              v-model="displayName"
            >
              <div slot="append">
                <v-tooltip bottom v-if="displayNameEnabled">
                  <template v-slot:activator="{ on }">
                    <v-btn @click="saveDisplayNameBtn" icon v-on="on">
                      <v-icon color="green"
                      >{{ displayNameEnabled ? 'mdi-check-bold' : undefined }}
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Save</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn @click="editResetDisplayName" icon v-on="on">
                      <v-icon :color="displayNameEnabled ? 'red' : undefined"
                      >{{
                        displayNameEnabled ? 'mdi-close-circle' : 'mdi-pencil'
                        }}
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>{{ displayNameEnabled ? 'Exit' : 'Edit' }}</span>
                </v-tooltip>
              </div>
            </v-text-field>
          </v-card>
        </v-col>
        <!-- Email-->
        <v-col class="mt-2" cols="12" lg="5" md="6" xl="5">
          <v-card color="transparent" flat tile>
            <p class="title">Email</p>
          </v-card>
        </v-col>
        <v-col cols="12" lg="7" md="6" xl="7">
          <v-card color="transparent" flat tile>
            <!--TODO: for right now make disabled true and remove edit button-->
            <v-text-field
              :disabled="true"
              :error-messages="emailErrors"
              :readonly="!emailEnabled"
              @blur="$v.email.$touch()"
              @input="$v.email.$touch()"
              dense
              flat
              rounded
              solo
              v-model="email"
            >
             <!-- <div slot="append" v-if="!this.$store.state.profile.oauth">
                <v-tooltip bottom v-if="emailEnabled">
                  <template v-slot:activator="{ on }">
                    <v-btn @click="saveEmailBttn" icon v-on="on">
                      <v-icon color="green"
                      >{{ emailEnabled ? 'mdi-check-bold' : undefined }}
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Save</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn @click="editResetEmail" icon v-on="on">
                      <v-icon :color="emailEnabled ? 'red' : undefined"
                      >{{ emailEnabled ? 'mdi-close-circle' : 'mdi-pencil' }}
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>{{ emailEnabled ? 'Exit' : 'Edit' }}</span>
                </v-tooltip>
              </div>-->
            </v-text-field>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <v-progress-linear buffer-value="0" color="" stream></v-progress-linear>

    <section v-if="!this.$store.state.profile.oauth">
      <v-row class="ma-1">
        <v-col cols="12" lg="5" md="6" xl="5">
          <v-card color="transparent" flat tile>
            <p class="title">Password</p>
            <p class="subtitle-2 red--text">
              Changing your password will require you to login again.
            </p>
          </v-card>
        </v-col>
        <v-col class="text-left" cols="12" lg="7" md="6" xl="7">
          <v-card color="transparent" flat tile>
            <v-form @submit.prevent="changePasswordConfirmation" method="post">
              <div>
                <v-text-field
                  :append-icon="showOldPass ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showOldPass ? 'text' : 'password'"
                  @click:append="showOldPass = !showOldPass"
                  dense
                  label="Current Password"
                  outlined
                  rounded
                  v-model="oldPassword"
                ></v-text-field>
              </div>
              <v-divider></v-divider>
              <div class="pt-4">
                <v-text-field
                  :append-icon="showNewPass ? 'mdi-eye-off' : 'mdi-eye'"
                  :error-messages="newPasswordErrors"
                  :type="showNewPass ? 'text' : 'password'"
                  @blur="$v.newPassword.$touch()"
                  @click:append="showNewPass = !showNewPass"
                  @input="$v.newPassword.$touch()"
                  dense
                  label="New Password"
                  outlined
                  rounded
                  v-model="newPassword"
                ></v-text-field>
                <v-text-field
                  :error-messages="confirmPasswordErrors"
                  @blur="$v.confirmNewPassword.$touch()"
                  @input="$v.confirmNewPassword.$touch()"
                  dense
                  label="Confirm New Password"
                  outlined
                  rounded
                  type="password"
                  v-model="confirmNewPassword"
                ></v-text-field>
              </div>
              <v-btn :disabled="$v.$invalid" type="submit"
              >Change Password
              </v-btn>
              <v-dialog
                :max-width="
                  $vuetify.breakpoint.name === 'xs' ? '100%' : '40%'
                "
                hide-overlay
                origin="center center"
                transition="scale-transition"
                v-model="dialog"
              >
                <v-card>
                  <v-card-title class="headline">Confirmation</v-card-title>

                  <v-card-text
                  >Are you sure that you would like to change your password?
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn @click="dialog = false" color="red darken-1" text
                    >No
                    </v-btn>

                    <v-btn @click="changePassword" color="green darken-1" text
                    >Yes
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <v-progress-linear buffer-value="0" color="" stream></v-progress-linear>
    </section>

    <section>
      <v-row class="ma-1">
        <v-col cols="12" lg="5" md="6" xl="5">
          <v-card color="transparent" flat tile>
            <p class="title red--text">Delete your account</p>
            <p class="subtitle-2">
              <em>Warning:</em> Deleting your account is irreversible.
            </p>
          </v-card>
        </v-col>
        <v-col align-self="center" cols="12" lg="7" md="6" xl="7">
          <v-card color="transparent" flat tile>
            <v-btn
              @click="deleteAccountConfirmation = true"
              color="red"
              outlined
            >Delete this account...
            </v-btn>

            <v-dialog
              :max-width="
                this.$vuetify.breakpoint.name === 'xs' ? '100%' : '33%'
              "
              hide-overlay
              origin="center center"
              transition="scale-transition"
              v-model="deleteAccountConfirmation"
            >
              <v-card>
                <v-card-title class="headline">Confirmation</v-card-title>

                <v-card-text
                >Are you sure that you would like to delete your account? This
                  account will be lost <em>forever.</em></v-card-text
                >

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    @click="deleteAccountConfirmation = false"
                    color="red darken-1"
                    text
                  >No
                  </v-btn>

                  <v-btn @click="deleteAccount" color="green darken-1" text
                  >Yes
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-col>
      </v-row>
    </section>
    <section>
      <v-snackbar
        :color="snackBarColor"
        :timeout="2000"
        right
        top
        v-model="showSnackbar"
      >
        {{ snackBarText }}
        <v-btn @click="showSnackbar = false" text>Close</v-btn>
      </v-snackbar>
      <v-dialog
        :max-width="this.$vuetify.breakpoint.name === 'xs' ? '100%' : '40%'"
        v-model="changeAvatarDialog"
      >
        <v-card>
          <v-card-title>
            Update Avatar
          </v-card-title>
          <v-tabs centered grow v-model="avatarTabIndex">
<!--            <v-tab>File Upload</v-tab>-->
            <v-tab>URL</v-tab>
            <!-- File Upload TAB -->
            <!--<v-tab-item>
              <v-card-text>
                <v-row justify="center">
                  <v-avatar
                    size="150"
                    tile
                    v-if="avatarImgFile && !refreshFilePreview"
                  >
                    <v-img
                      :src="convertFileToURL()"
                      lazy-src="/imageNotFound.jpg"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          align="center"
                          class="fill-height ma-0"
                          justify="center"
                        >
                          <v-progress-circular
                            color="grey lighten-5"
                            indeterminate
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-avatar>
                </v-row>
                <v-file-input
                  :rules="avatarRules"
                  @change="refreshFileImgPreview"
                  accept="image/*"
                  counter
                  label="Avatar"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera"
                  show-size
                  v-model="avatarImgFile"
                ></v-file-input>
              </v-card-text>
            </v-tab-item>-->
            <!-- URL TAB -->
            <v-tab-item>
              <v-card-text>
                <v-row justify="center">
                  <v-avatar size="150" tile v-if="newAvatarURL">
                    <v-img :src="newAvatarURL" lazy-src="/imageNotFound.jpg">
                      <template v-slot:placeholder>
                        <v-row
                          align="center"
                          class="fill-height ma-0"
                          justify="center"
                        >
                          <v-progress-circular
                            color="grey lighten-5"
                            indeterminate
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-avatar>
                </v-row>
                <v-text-field
                  :error-messages="avatarURLErrors"
                  @blur="$v.newAvatarURL.$touch()"
                  @focus="$event.target.select()"
                  @input="$v.newAvatarURL.$touch()"
                  @keyup.enter="updateAvatar"
                  placeholder="https://icon-library.net/images/guest-icon-png/guest-icon-png-18.jpg"
                  v-model="newAvatarURL"
                >
                  <v-tooltip right slot="append-outer">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click="refreshImage"
                        bottom
                        color="primary"
                        fab
                        v-on="on"
                        x-small
                      >
                        <v-icon dark>mdi-refresh</v-icon>
                      </v-btn>
                    </template>
                    <span>Refresh Preview</span>
                  </v-tooltip>
                </v-text-field>
              </v-card-text>
            </v-tab-item>
          </v-tabs>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="changeAvatarDialog = false"
              color="blue darken-1"
              text
            >Close
            </v-btn>
            <v-btn @click="updateAvatar" color="blue darken-1" text>Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </section>
  </v-container>
</template>

<script>
  import {validationMixin} from 'vuelidate';
  import {
    email, maxLength,
    minLength,
    required,
    sameAs,
    url
  } from 'vuelidate/lib/validators';

  export default {
    name: "profile",
    mixins: [validationMixin],
    middleware: ['default', 'authenticated'],
    async asyncData({store, $axios}) {
      store.commit('updateTitle', 'user');
      store.commit('showNavBar', true);
      store.commit('hideEndNavBtn', false);
      // if (store.state.authenticatedUser != null) {
      return {
        user: store.state.authenticatedUser,
        email: store.state.authenticatedUser.email,
        displayName: store.state.authenticatedUser.name
      };
      // }

      // else {
      //   const {user} = await $axios.$get(`/users/getUser/${store.state.authenticatedUser.username}`);
      //   console.log('gather from axios');
      //   return {user};
      // }
    },
    validations: {
      email: {required, email},
      newPassword: {
        required,
        minLength: minLength(6)
      },
      confirmNewPassword: {
        sameAsPassword: sameAs('newPassword'),
        required
      },
      newAvatarURL: {
        url
      },
      displayName: {
        required, maxLength: maxLength(30)
      }
    },
    computed: {
      emailErrors() {
        const errors = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.email && errors.push('Must be valid e-mail.');
        !this.$v.email.required && errors.push('E-mail is required.');
        return errors;
      },
      newPasswordErrors() {
        const errors = [];
        if (!this.$v.newPassword.$dirty) return errors;
        !this.$v.newPassword.minLength &&
        errors.push('Password must be at least 6 characters long.');
        !this.$v.newPassword.required && errors.push('Password is required.');
        return errors;
      },
      confirmPasswordErrors() {
        const errors = [];
        if (!this.$v.confirmNewPassword.$dirty) return errors;
        !this.$v.confirmNewPassword.sameAsPassword &&
        errors.push('Password confirmation must be identical.');
        !this.$v.confirmNewPassword.required &&
        errors.push('Password Confirmation is required.');
        return errors;
      },
      avatarURLErrors() {
        const errors = [];
        if (!this.$v.newAvatarURL.$dirty) return errors;
        !this.$v.newAvatarURL.url &&
        errors.push('Must be valid url that starts with http:// or https://');
        return errors;
      },
      displayNameErrors() {
        const errors = [];
        if (!this.$v.displayName.$dirty) return errors;
        !this.$v.displayName.required && errors.push('Name is required.');
        return errors;
      }
    },
    data: () => ({
      showAvatarOverlay: false,
      changeAvatarDialog: false,
      avatarTabIndex: 0,
      newAvatarURL: '',
      avatarImgFile: null,
      refreshFilePreview: false,
      avatarRules: [
        (value) =>
          !value ||
          value.size < 3000000 ||
          'Avatar size should be less than 3 MB!'
      ],
      emailEnabled: false,
      email: '',
      displayNameEnabled: false,
      displayName: 'Guest',
      showOldPass: false,
      oldPassword: '',
      showNewPass: false,
      newPassword: '',
      confirmNewPassword: '',
      dialog: false,
      showSnackbar: false,
      snackBarText: 'Test',
      snackBarColor: undefined,
      deleteAccountConfirmation: false,
      user: {}
    }),
    methods: {
      editResetDisplayName() {
        if (this.displayNameEnabled) {
          // reset
          this.displayName = this.$store.state.authenticatedUser.name;
          this.displayNameEnabled = false;
        } else {
          // edit
          this.displayNameEnabled = true;
        }
      },
      async saveDisplayNameBtn() {
        if (this.displayNameEnabled) {
          this.$v.displayName.$touch();
          if (!this.$v.displayName.$invalid) {
            if (this.displayName !== this.$store.state.authenticatedUser.name) {
              const data = await this.$axios.$patch(
                '/users/updateName',
                {
                  name: this.displayName.trim()
                }
              );
              if (data.success) {
                this.showSnackbar = true;
                this.snackBarText = 'Name Successfully Updated';
                this.snackBarColor = 'success';
                this.$store.commit('profile/updateDisplayName', this.displayName);
              } else {
                this.showSnackbar = true;
                this.snackBarText = 'Name Update Failed';
                this.snackBarColor = 'error';
              }
            } else {
              this.showSnackbar = true;
              this.snackBarText = 'No Change to Name Detected';
              this.snackBarColor = 'error';
            }
          }
        }
        this.displayNameEnabled = false;
      },
      changePasswordConfirmation() {
        this.dialog = true;
      },
      async changePassword() {
        this.dialog = false;
        // actually change password
        const data = await this.$axios.$patch('/users/changePassword', {
          currentPassword: this.oldPassword,
          newPassword: this.newPassword
        });
        this.showSnackbar = true;
        this.snackBarText = data.message;
        if (data.success) {
          this.snackBarColor = 'success';
          const data = await this.$axios.$get('/users/logout');
          if (data.success) {
            this.$store.commit('setUser', null);
          }
          await this.$router.push('/login');
          // window.location.href = `/api/auth/logout?redirect=login`;
        } else {
          this.snackBarColor = 'error';
        }
      },
      refreshImage() {
        const url = this.newAvatarURL;
        this.newAvatarURL = '';
        this.$nextTick(function() {
          this.newAvatarURL = url;
        });
      },
      async updateAvatar() {
        // const isURL = this.avatarTabIndex === 1;
        const isURL = true;
        this.$nuxt.$loading.start();
        if (isURL) {
          this.$v.newAvatarURL.$touch();
          if (
            !this.$v.newAvatarURL.$invalid &&
            this.newAvatarURL !== this.$store.state.authenticatedUser.profile.avatar
          ) {
            const data = await this.$axios.$patch('/users/updateAvatarURL', {
              avatarURL: this.newAvatarURL
            });
            if (data.success) {
              await this.$store.dispatch('checkAuth');
              this.$router.go();
              this.showSnackbar = true;
              this.snackBarText = 'Avatar Successfully Updated';
              this.snackBarColor = 'success';
              await this.$store.dispatch('checkAuth');
              this.changeAvatarDialog = false;
            } else {
              this.showSnackbar = true;
              this.snackBarText = data.message;
              this.snackBarColor = 'error';
            }
          } else this.changeAvatarDialog = false;
        } else if (this.avatarImgFile) {
          const fd = new FormData();
          fd.append('image', this.avatarImgFile);
          const response = await axios({
            // headers: { 'Content-Type': 'multipart/form-data' },
            method: 'post',
            url: '/api/profile/updateAvatarFile',
            data: fd
          });
          if (response.data.success) {
            this.$store.commit('profile/updateAvatarURL', response.data.url);
            this.$router.go();
            this.showSnackbar = true;
            this.snackBarText = 'Avatar Successfully Updated';
            this.snackBarColor = 'success';
            this.changeAvatarDialog = false;
          } else {
            this.showSnackbar = true;
            this.snackBarText = response.data.message;
            this.snackBarColor = 'error';
          }
        } else this.changeAvatarDialog = false;
        this.$nuxt.$loading.finish();
      },
      async deleteAccount() {
        const data = await this.$axios.$delete('/users/deleteAccount');
        if(data.success) {
          await this.$store.dispatch('checkAuth');
          await this.$router.push('/')
        }
      }
    }
  }
</script>

<style scoped>

</style>
