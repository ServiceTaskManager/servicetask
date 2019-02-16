import axios from 'axios'

export function loginUser ({ commit, state }, { login, router }) {
  return new Promise((resolve, reject) => {
    axios.post('Users/login', login)
      .then((response) => {
        commit('setLogin', response.data)
        axios.defaults.headers.common['Authorization'] = response.data.id
        router.push('/calls')
        /* this.$q.notify({
          message: 'Welcome',
          color: 'positive'
        }) */
      })

    resolve()
  })
}
