<template>
  <v-container fluid>
    <v-card :key="index" class="my-4" rounded v-for="(link, index) in links">
      <v-card-title>
        {{link.title}}
      </v-card-title>
      <v-card-text>
        {{link.url}}
      </v-card-text>
      <v-card-actions>
        <v-layout class="justify-end">
          <v-btn @click="editLink(link, index)" class="mx-1" icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-dialog
            :max-width="400"
            v-model="deleteConfirmationDialog"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs"
                     v-on="on" class="mx-1" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">Confirmation</v-card-title>

              <v-card-text
              >Are you sure that you would like to delete this link?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn @click="deleteConfirmationDialog = false" color="red darken-1" text
                >No
                </v-btn>

                <v-btn @click="deleteLink(link)" color="green darken-1" text
                >Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>


        </v-layout>
      </v-card-actions>
    </v-card>

    <v-btn @click="addLink" block color="mainGreen" rounded :disabled="links.length >= 5">
      <v-icon left>mdi-plus</v-icon>
      Add Link
    </v-btn>

    <v-dialog max-width="550" v-model="dialog">
      <v-card>
        <v-card-text>
          <v-row class="justify-center">
            <v-card-title><span class="headline">{{selectedItem ? 'Update ': 'Add '}}Link</span></v-card-title>
          </v-row>
          <v-divider></v-divider>
          <v-text-field :rules="[required]" class="my-2" counter label="Enter Link Name" maxlength="30"
                        placeholder="Google"
                        v-model="linkName">
          </v-text-field>
          <v-text-field
            :rules="[required, urlRule]"
            class="my-2"
            label="Enter URL" placeholder="https://google.com" v-model="linkURL">
          </v-text-field>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog" color="blue darken-1" rounded text>Close</v-btn>
          <v-btn @click="save" color="blue darken-1" rounded text>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  </v-container>
</template>

<script>
  export default {
    name: "Links",
    props: {
      links: {type: Array, required: true}
    },
    data: () => ({
      dialog: false,
      selectedItem: null,
      linkName: '',
      linkURL: '',
      urlRule: value => {
        const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        return regexp.test(value) || 'Invalid URL';
      },
      required: value => !!value || 'Required.',
      showSnackbar: false,
      snackBarText: 'Test',
      snackBarColor: undefined,
      deleteConfirmationDialog: false
    }),
    methods: {
      async save() {
        if (this.selectedItem) {
          //Update
          if (!(this.selectedItem.title === this.linkName && this.selectedItem.url === this.linkURL)) {
            const data = await this.$axios.$patch('/users/updateLink', {
              index: this.selectedItem.index,
              link: {title: this.linkName, url: this.linkURL}
            });
            if (data.success) {
              const user = JSON.parse(JSON.stringify(this.$store.state.authenticatedUser));
              user.profile.links = data.links;
              this.$store.commit('setUser', user);
              this.showSnackbar = true;
              this.snackBarText = 'Link Successfully Updated';
              this.snackBarColor = 'success';
            } else {
              this.showSnackbar = true;
              this.snackBarText = 'Error Updating Link';
              this.snackBarColor = 'error';
            }
          }
        } else {
          //Add
          const data = await this.$axios.$post('/users/addLink', {link: {title: this.linkName, url: this.linkURL}});
          if (data.success) {
            const user = JSON.parse(JSON.stringify(this.$store.state.authenticatedUser));
            user.profile.links = data.links;
            this.$store.commit('setUser', user);
            this.showSnackbar = true;
            this.snackBarText = 'Successfully Added Link';
            this.snackBarColor = 'success';
          } else {
            this.showSnackbar = true;
            this.snackBarText = 'Error Adding Link';
            this.snackBarColor = 'error';
          }
        }
        this.closeDialog();
      },
      async deleteLink(item) {
        const data = await this.$axios.$delete('/users/deleteLink', {
          data: {item}
        })
        if (data.success) {
          const user = JSON.parse(JSON.stringify(this.$store.state.authenticatedUser));
          user.profile.links = data.links;
          this.$store.commit('setUser', user);
          this.showSnackbar = true;
          this.snackBarText = 'Successfully Deleted Link';
          this.snackBarColor = 'success';
        } else {
          this.showSnackbar = true;
          this.snackBarText = 'Error Deleting Link';
          this.snackBarColor = 'error';
        }
      },
      editLink(item, index) {
        this.selectedItem = item;
        this.selectedItem.index = index;
        this.dialog = true;
        this.linkName = item.title;
        this.linkURL = item.url;
      },
      addLink() {
        this.selectedItem = null;
        this.dialog = true;
        this.linkName = '';
        this.linkURL = '';
      },
      closeDialog() {
        this.dialog = false;
        this.selectedItem = null;
      }
    }
  }
</script>

<style scoped>

</style>
