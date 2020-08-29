export default function ({ store }) {
  // If the user is not authenticated
  return store.dispatch("checkAuth");
}
