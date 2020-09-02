<template>
  <v-container>
    <v-card v-if="$vuetify.breakpoint.smAndUp">
      <v-tabs center-active height="375" slider-size="1" vertical>
        <v-tab :key="index" class="justify-start" v-for="(item, index) in platforms">
          <v-icon :data-icon="item.icon" class="iconify" left></v-icon>
          <div class="ml-2" v-if="$vuetify.breakpoint.mdAndUp">
            {{item.name}}
          </div>
        </v-tab>

        <v-tab-item :key="index" class="justify-center" v-for="(item, index) in platforms">
          <v-card class="my-auto" flat min-height="370">
            <v-card-text class="py-10">
              <v-text-field :label="'Enter the username/id for ' + item.name" :placeholder="item.placeholder"
                            :prefix="showPrefix ? item.prefix : ''"
                            append-icon="mdi-paste"
                            v-model="textField"
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="pt-12 mt-12">
              <v-spacer/>
              <v-btn block rounded color="mainGreen" :disabled="disableSave" @click="save(item)">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
    <v-card v-else>
      <v-card-text>Rotate your screen into landscape to view</v-card-text>
    </v-card>
  </v-container>

</template>

<script>
  import {validationMixin} from "vuelidate";
  import {url} from "vuelidate/lib/validators";

  export default {
    name: "Socials",
    mixins: [validationMixin],
    computed: {
      disableSave() {
        return this.textField.length === 0;
      },
      showPrefix() {
        return (!this.$v.textField.url /*Check if not a url*/ || this.textField.length === 0);
      },
    },
    validations: {
      textField: {url}
    },
    data: () => ({
      platforms: [
        {name: 'Discord', icon: 'mdi-discord', prefix: 'discord.gg/'},
        {name: 'Facebook', icon: 'mdi-facebook', prefix: 'facebook.com/', placeholder: 'facebook username'},
        {name: 'Instagram', icon: 'mdi-instagram', prefix: 'instagram.com/', placeholder: 'instagram username'},
        {name: 'Snapchat', icon: 'simple-icons:snapchat', placeholder: 'snapchat username'},
        {name: 'SoundCloud', icon: 'mdi-soundcloud', prefix: 'soundcloud.com/', placeholder: 'soundcloud username'},
        {name: 'Spotify', icon: 'simple-icons:spotify'},
        {name: 'TikTok', icon: 'fa-brands:tiktok', prefix: 'tiktok.com/@', placeholder: 'tiktok username'},
        {name: 'Twitch', icon: 'mdi-twitch', prefix: 'twitch.tv/', placeholder: 'twitch username'},
        {name: 'Twitter', icon: 'mdi-twitter', prefix: 'twitter.com/', placeholder: 'twitter handle'},
        {name: 'YouTube', icon: 'mdi-youtube', prefix: 'youtube.com/' , placeholder: 'channel ID or custom name'}
      ],
      textField: ''
    }),
    methods: {
      save(item) {
        console.log(item.name);
      }
    }
  }
</script>

<style scoped>
  .v-window__container {
    height: 100%
  }
</style>
