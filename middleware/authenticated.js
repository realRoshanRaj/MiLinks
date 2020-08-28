export default function ({store, redirect}) {
  // If the user is not authenticated
  return store.dispatch("checkAuth").then(() => {
    if (!store.state.isAuthenticated) {
      return redirect('/login')
    }
    return;
  })

}
