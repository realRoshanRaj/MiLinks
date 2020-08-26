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
}
