import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

export const pushNotification = functions.firestore.document('calls/{callId}')
  .onCreate((snap, context) => {
    console.log('New call ! Notify them all!')

    const newCall = snap.data()

    const payload = {
      data: {
        title: 'New call !' + newCall!.title,
        desc: 'Yeah!'
      }
    }

    return admin.messaging().sendToTopic('notification', payload)
  })

export const addTopicFollower = functions.firestore.document('notifications/{token}')
  .onCreate((snap, context) => {
    console.log(context)
    console.log('New token, add it !')

     const newFollower = snap.data()

    return admin.messaging().subscribeToTopic([newFollower!.token], 'notification')
  })