export default function ({ store, redirect }) {
    // If the user is not authenticated
    if (store.state.user.length == 0) {
      return redirect('/login')
    }
  }