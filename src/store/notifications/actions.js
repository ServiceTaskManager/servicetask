export function create ({ commit, state }, message) {
  console.log('Try notification')
  let notification = new Notification(message)
  state.notifications.push(notification)
}
