<template>
  <v-container>
    <v-card rounded v-if="$vuetify.breakpoint.smAndUp">
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
                            :prefix="showPrefix(item.value) ? item.prefix : ''"
                            clearable
                            @click:clear="clearTextField(item)"
                            v-model="item.value"
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="pt-12 mt-12">
              <v-btn :disabled="disableSave(item)" @click="save(item)" :loading="loadSave" block color="mainGreen" rounded>Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
    <v-card rounded v-else>
      <v-card-text>Rotate your screen into landscape to view</v-card-text>
    </v-card>
  </v-container>

</template>

<script>
  export default {
    name: "Socials",
    beforeMount() {
      this.socials.forEach((value) => {
        const foundIndex = this.platforms.findIndex(item => item.name.toLowerCase() === value.platform.toLowerCase());
        if (foundIndex != -1) {
          this.platforms[foundIndex].value = value.url;
        }
      });
    },
    props: {
      socials: {type: Array, required: true}
    },
    data: () => ({
      platforms: [
        {name: 'Discord', icon: 'mdi-discord', prefix: 'discord.gg/', value: ''},
        {name: 'Facebook', icon: 'mdi-facebook', prefix: 'facebook.com/', placeholder: 'facebook username', value: ''},
        {
          name: 'Instagram',
          icon: 'mdi-instagram',
          prefix: 'instagram.com/',
          placeholder: 'instagram username',
          value: ''
        },
        {name: 'Snapchat', icon: 'simple-icons:snapchat', placeholder: 'snapchat username', value: ''},
        {
          name: 'SoundCloud',
          icon: 'mdi-soundcloud',
          prefix: 'soundcloud.com/',
          placeholder: 'soundcloud username',
          value: ''
        },
        {name: 'Spotify', icon: 'simple-icons:spotify', value: ''},
        {name: 'TikTok', icon: 'fa-brands:tiktok', prefix: 'tiktok.com/@', placeholder: 'tiktok username', value: ''},
        {name: 'Twitch', icon: 'mdi-twitch', prefix: 'twitch.tv/', placeholder: 'twitch username', value: ''},
        {name: 'Twitter', icon: 'mdi-twitter', prefix: 'twitter.com/', placeholder: 'twitter handle', value: ''},
        {
          name: 'YouTube',
          icon: 'mdi-youtube',
          prefix: 'youtube.com/',
          placeholder: 'channel ID or custom name',
          value: ''
        }
      ],
      loadSave: false
    }),
    methods: {
      async save(item) {
        let res;
        this.loadSave = true;
        if (this.isUrl(item.value)) {
          // console.log('url check ', item.value);
          res = await this.$axios.$post('/users/updateSocials', {
            url: true,
            platform: item.name,
            value: item.value.trim()
          });
        } else {
          // console.log('username', item.value);
          res = await this.$axios.$post('/users/updateSocials', {
            url: false,
            platform: item.name,
            value: item.value.trim()
          });
        }
        this.loadSave = false;
        if(res.success) {
          const user = this.$store.state.authenticatedUser;
          user.profile.socials = res.socials;
          this.$store.commit('setUser', user);
        } else {
          console.error('An error occured');
        }
      },
      isUrl(str) {
        const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        return (regexp.test(str));
      },
      showPrefix(textField) {
        return (!this.isUrl(textField)/*Check if not a url*/ || textField.length === 0);
      },
      disableSave(item) {
        if(!item.value) item.value = '';
        const index = this.socials.findIndex(x => x.platform.toLowerCase() === item.name.toLowerCase());
        if(index == -1) {return item.value.length === 0};
        return (item.value.toLowerCase() == this.socials[index].url.toLowerCase());
      },
      clearTextField(item) {
        item.value = '';
      }
    }
  }
</script>

<style scoped>
  .v-window__container {
    height: 100%
  }
</style>
