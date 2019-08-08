const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

// Sends a notifications to all users when a new message is posted.
exports.sendNotifications = functions.firestore.document('calls/{callId}').onCreate(
  async (snapshot) => {
    // Notification details.
    const text = snapshot.data().text;
    const payload = {
      notification: {
        title: snapshot.data().title,
        body: 'Call ' + snapshot.data().person,
        click_action: `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com`,
      }
    };

    // Get the list of device tokens.
    const allTokens = await admin.firestore().collection('users').get();
    const tokens = [];
    allTokens.forEach((user) => {
      tokens.push(user.tokens);
    });

    if (tokens.length > 0) {
      // Send notifications to all tokens.
      const response = await admin.messaging().sendToDevice(tokens, payload);
      await cleanupTokens(response, tokens);
      console.log('Notifications have been sent and tokens cleaned up.');
    }
  });
