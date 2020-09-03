<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div align="start" v-if="user">
          <v-card class="my-6" outlined>
            <v-row>
              <v-avatar class="mx-auto mt-n15 elevation-5" size="150">
                <img
                  :src="user.profile.avatar"
                  alt="Profile Picture"
                >
              </v-avatar>
            </v-row>
            <v-card-text class="mb-0 pb-0">
              <v-row justify="center">
                <div class="text-capitalize font-weight-medium text-h4">
                  {{user.name}}
                </div>
              </v-row>
            </v-card-text>
            <v-card-text class="mt-0 pt-0">
              <v-row justify="center">
                <p class="text-center dfont-weight-light text-subtitle-1">
                  {{user.profile.bio}}
                </p>
              </v-row>
            </v-card-text>
          </v-card>

          <!--Socials-->
          <v-row justify="center" class="mb-3">
            <v-btn :key="index"
                   class="mx-2"
                   icon
                   outlined
                   :href="item.url"
                   v-for="(item, index) in profile.socials">
              <v-icon class="iconify" :data-icon="findIcon(item.platform)"></v-icon>
<!--              <span class="iconify" data-icon="fa:home"></span>-->
<!--              <iconify-icon :data-icon="findIcon(item.platform)" style="font-size: 20px;"></iconify-icon>-->
            </v-btn>
          </v-row>

          <!--Links-->
          <v-row justify="center">
            <v-col
              :key="index"
              cols="12"
              md="6"
              v-for="(item, index) in profile.links"
            >
              <v-hover>
                <template v-slot="{ hover }">
                  <v-card
                    :elevation="hover ? 6 : 3"
                    :href="item.url"
                    class="pa-2 align-center d-flex"
                    height="75"
                  >
                    <v-card-text class="pa-0 mx-auto">
                      <v-row align="center" justify="center" no-gutters>
                        <v-img :src="item.img"
                               aspect-ratio="1"
                               class="ml-n5 rounded"
                               max-height="60"
                               max-width="60"
                               v-if="item.img">
                        </v-img>
                        <div class="text-body-1">
                          {{item.title}}
                        </div>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </template>
              </v-hover>
            </v-col>
          </v-row>

        </div>
        <div v-else>
          This user doesn't exist
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  const platformToIcon = {
    instagram: 'mdi-instagram',
    facebook: 'mdi-facebook',
    discord: 'mdi-discord',
    email: 'mdi-email',
    tiktok: 'fa-brands:tiktok',
    twitter: 'mdi-twitter',
    youtube: 'mdi-youtube',
    snapchat: 'simple-icons:snapchat',
    spotify: 'simple-icons:spotify',
    twitch: 'mdi-twitch',
    soundcloud: 'mdi-soundcloud',
  }

  export default {
    name: "user",
    // called every time before loading the component
    async asyncData({params, store, payload, $axios}) {
      store.commit('updateTitle', 'user');
      store.commit('showNavBar', false);
      store.commit('hideEndNavBtn', false);
      if (payload) {
        console.log('from payload');
        return {user: payload};
      } else {
        const {user} = await $axios.$get(`/users/getUser/${params.user}`);
        console.log('gather from axios');
        return {user};
      }
    },
    data: () => ({
      showAvatarOverlay: false,
      changeAvatarDialog: false,
      profile: {
        bio: 'Tech Enthusiast \n| YouTube & TikTok Video Creator | Business Inquiries: tonytechbytes@gmail.com',
        //title 30 character limit, description 70 character limit
        links: [
          //http://logo.clearbit.com/youtube.org
          {title: 'Youtube', url: 'https://youtube.com/tonytechbytes'},
          {title: 'Tiktok', url: 'https://tiktok.com/@tonytechbytes'},
          {title: 'Twitter', url: 'https://twitter.com/tonytechbytes'},
          {title: 'Twitch', url: 'https://twitch.tv/tonytechbytes'},
          {title: 'Discord', url: 'https://discord.gg/bfhNcWF'},
          {title: 'Amazon Amlactin', url: 'https://amzn.to/2XoIrOG'},
          {title: 'Amazon Shop', url: 'http://www.amazon.com/shop/doctorly'},
          {title: 'Youtube Skin Care Basics', url: 'https://youtu.be/rcIDAuIiSaI'}
        ],
        socials: [
          {platform: 'Instagram', url: 'https://instagram.com/tonytechbytes'},
          {platform: 'Youtube', url: 'https://youtube.com/tonytechbytes'},
          {platform: 'Twitter', url: 'https://twitter.com/tonytechbytes'},
          {platform: 'Email', url: 'mailto:tonytechbytes@gmail.com'},
          {platform: 'Tiktok', url: 'https://tiktok.com/@tonytechbytes'},
        ]
      }
    }),
    methods: {
      findIcon(platform) {
        return platformToIcon[platform.toLowerCase().trim()];
      }
    }
  }
</script>

<style scoped>

</style>
