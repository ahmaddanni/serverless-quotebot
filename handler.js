'use strict';

const axios = require('axios');

// Your first function handler
module.exports.webhook = (event, context, callback) => {
  if (event.method === 'GET') {
    // facebook app verification
    if (event.query['hub.verify_token'] === 'STRONGTOKEN' && event.query['hub.challenge']) {
      return callback(null, parseInt(event.query['hub.challenge']));
    } else {
      return callback('Invalid token');
    }
  }

if (event.method === 'POST') {
    event.body.entry.map((entry) => {
      entry.messaging.map((messagingItem) => {
        if (messagingItem.message && messagingItem.message.text) {
          const accessToken = '<PAGE_ACCESS_TOKEN>'; // Replace with your Page Access Token

          const quotes = [
            'Hi, apa kabar',
            'Senang berkenalan dengan anda..:)',
            'Saya adalah Chatbot machine',
            'Saya berasal dari Solo',
            'Saya tidak bisa bahasa jawa',
            'Saya suka traveling'
          ];

          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

          const url = `https://graph.facebook.com/v2.6/me/messages?access_token=${accessToken}`;

          const payload = {
            recipient: {
              id: messagingItem.sender.id
            },
            message: {
              text: randomQuote
            }
          };

          axios.post(url, payload).then((response) => callback(null, response));
        }
      });
    });
  }
};
