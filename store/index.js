import axios from 'axios'

export const state = () => ({
  title: '',
  showNavBar: true,
  hideEndNavBtn: true,
  isAuthenticated: false,
  authenticatedUser: null
});

export const mutations = {
  updateTitle(state, payload) {
    state.title = payload;
  },
  showNavBar(state, payload) {
    state.showNavBar = payload;
  },
  hideEndNavBtn(state, payload) {
    state.hideEndNavBtn = payload;
  },
  setUser(state, user) {
    state.authenticatedUser = user;
    state.isAuthenticated = user !== null;
  }
};

export const actions= {
//   nuxtServerInit ({ commit, dispatch }, { req, res }) {
//     // console.log('req', req.user);
//     // console.log(res.locals);
// if(process.server)
//     if (req.session && req.session.user) {
//       commit('setUser', req.session.user);
//       console.log(state.authenticatedUser);
//     }
//   },
  async login () {
    // try {
    //   commit('SET_USER', data)
    // } catch (error) {
    //   if (error.response && error.response.status === 401) {
    //     throw new Error('Bad credentials')
    //   }
    //   throw error
    // }
    console.log('entered here')
    const data = await axios.get('https://milinks.herokuapp.com/users/isAuth');
    console.log('login data', data);
  },

}
