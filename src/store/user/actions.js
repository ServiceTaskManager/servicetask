export function login ({ commit, state }, ctx) {
  ctx.$auth
    .signInWithEmailAndPassword(ctx.user.email, ctx.user.password)
    .then((userCredentials) => {
      state.user = userCredentials.user
      ctx.$router.push('/')
      ctx.$q.notify({
        message: 'Welcome',
        color: 'positive',
        position: 'top'
      })
    })
}

export function logout ({ commit, state }, ctx) {
  ctx.$auth.signOut()
    .then(() => {
      state.user = {}
      ctx.$router.push('/login')
      ctx.$q.notify({
        message: 'Bye',
        color: 'negative',
        position: 'top'
      })
    })
}
