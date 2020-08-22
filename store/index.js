export const state = () => ({
  title: '',
  showNavBar: true,
  hideEndNavBtn: true,
  isAuthenticated: false
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
  }
};
