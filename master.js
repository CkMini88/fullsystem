const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const token = '6580940984:AAE-77qxB6sTfVhdnnKeyfz8ZXBOGScENh8';

const app = express();

const PORT = process.env.PORT || 3000;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userFullName = msg.from.first_name + ' ' + msg.from.last_name;
  const message = `سڵاو ${userFullName} بەخێربێت بۆ پرۆژەی ژیانت\n\n   © 2024 Kosar Tarkhany. All Rights Reserved`;

  bot.sendMessage(chatId, message, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: ' کوردی سۆرانی', url: 'https://t.me/Sarkawt_Nure_So_bot' }
        ],
        [
          { text: 'کوردی بادینی', url: 'https://t.me/Sarkawt_Badeni_bot' }
        ],
        [
          { text: 'عربی', url: 'https://t.me/Sarkawt_Nure_Arabic_bot' }
        ],
        [
          { text: 'Enlgish', url: 'https://t.me/Sarkawt_Nure_English_bot' }
        ]
      ]
    }
  });
});

app.get('/', (req, res) => {
  res.status(200).send('Server is up and running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
