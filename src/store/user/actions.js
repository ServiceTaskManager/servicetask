import axios from 'axios'

export function login ({ commit, state }, ctx) {
  axios.post('Users/login?include=User', ctx.login)
    .then((response) => {
      state.user = response.data
      axios.defaults.headers.common['Authorization'] = response.data.id
      ctx.$router.push('/calls')
      ctx.$q.notify({
        message: 'Welcome',
        color: 'positive'
      })
    })
}

export function logout ({ commit, state }, ctx) {
  axios.post('Users/logout')
    .then((response) => {
      state.user = {}
      axios.defaults.headers.common['Authorization'] = ''
      ctx.$router.push('/')
      ctx.$q.notify({
        message: 'Bye!',
        color: 'negative'
      })
    })
}
