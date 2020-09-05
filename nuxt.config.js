import colors from 'vuetify/es5/util/colors'
import axios from 'axios';

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    // title: process.env.npm_package_name || '',
    title: 'MiLinks',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"}
    ],
    script: [
      {src: 'https://code.iconify.design/1/1.0.7/iconify.min.js'}
    ]
  },
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~/plugins/localStorage.js', ssr: false },
    {src: '~/plugins/vuedraggable.js'}
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['@nuxtjs/google-analytics', {id: process.env.GOOGLE_ANALYTICS_ID}]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'https://milinks.herokuapp.com',
    credentials: true,
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    breakpoint: {},
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          mainGreen: '#12973d',
          mainPurple: '#8200ff'
        },
        light: {
          mainGreen: '#7affa5',
          mainPurple: '#B388FF'
        }
      }
    }
  },
  generate: {
    routes() {
      return axios.get('https://milinks.herokuapp.com/users/userList').then(res => {
        return res.data.users.map(user => {
          return {
            route: '/' + user.username,
            payload: user
          }
        })

        // const routes = [];
        // res.data.users.forEach(user => {
        //   routes.push({
        //     route: '/' + user.username,
        //     payload: user
        //   });
        //   routes.push({
        //     route: '/' + user.username + '/profile',
        //     payload: user
        //   });
        // });
        // return routes;
      })
    },
    fallback: true
  },

  // router: {
  //   middleware: 'default'
  // },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {}
}
