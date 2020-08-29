export default function ({ store, redirect }) {
  // If the user is not authenticated
  // console.log(window.localStorage.getItem('vuex'));
  if (store.state.isAuthenticated) {
    return redirect('/')
  }
}
