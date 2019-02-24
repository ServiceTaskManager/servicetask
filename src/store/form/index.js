export default {
  state: {},
  namespaced: true,
  actions: {
    pushValue ({ state }, datas) {
      state[datas.store] = {}
      state[datas.store][datas.key] = datas.value
    }
  }
}
