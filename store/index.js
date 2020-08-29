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
    state.isAuthenticated = (user !== null);
    // console.log('bool', state.isAuthenticated)
  }
};

export const actions = {
  // async nuxtServerInit({dispatch}) {
  //
  //   await dispatch('checkAuth');
  //
  //   // if (req.session.user) {
  //   //   commit('user', req.session.user)
  //   // }
  // },
  async checkAuth({commit}) {
    try {
      const data = await this.$axios.$post('/users/isAuth');
      console.log('data', data);
      commit('setUser', data.user);
    } catch (error) {
      if(error.response.status === 401) {
        commit('setUser', null);
      }
      console.log('error', error.message);
    }
  }
}

