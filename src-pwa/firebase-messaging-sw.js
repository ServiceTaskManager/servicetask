// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/5.11.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.11.1/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: 'BMaz6OQo5a0t8JmVrMKVJNWEeUYxt5bBaNOTFv5BrS5LcjHTf8JeTSUc4cSxmUkUVh33blK7VrTdoDYyU1ijxZ8'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(async payload => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  let title = payload.title
  let options = {
  	body: payload.body,
    vibrate: [300, 100, 300],
    icon: '/statics/app-logo-128x128.png'
  }
  // It was something like this, I am using a different custom format
  return self.registration.showNotification(payload.data.title, payload.data);
});