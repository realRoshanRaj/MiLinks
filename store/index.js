export const state = () => ({
  theme: 'light'
})

export const mutations = {
  setTheme(state, payload) {
      state.theme = payload;
  },
  toggleTheme(state) {
    if (state.theme === 'light') {
      state.theme = 'dark'
    } else if (state.theme === 'dark') {
      state.theme = 'light'
    }
  },
}
