const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

// Sends a notifications to all users when a new message is posted.
exports.sendNotifications = functions.firestore.document('notifications/{notificationId}').onCreate(
  async (snapshot) => {
    // Notification details.
    console.log(snapshot.data())
    const payload = {
      notification: {
        title: 'Notification',
        body: 'Yeeeeah',
        click_action: `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com`,
      }
    }

    // Get the list of device tokens.
    const tokens = await admin.firestore().collection('tokens').get()
    const tokenList = ['cW2SuOXiF-k:APA91bEsyfPf-FLeYvkchp6yF42jSLGHe_c_RPPpSlRn0SjYyeOCwnmn1gqBtXw6x_oswX1pFSWvF9BCgPpjRZE9hjcEE29Bcq42QjXjl9F8jOx-P3Y_SUzZnwmHRC-BDlz3D1-5f00y']
    /* users.forEach((user) => {
      tokens.push(user.tokens)
    }) */

    console.log(tokens.data())

    if (tokens.length > 0) {
      // Send notifications to all tokens.
      const response = await admin.messaging().sendToDevice(tokenList, payload)
    }
  })
