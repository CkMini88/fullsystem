const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

// Telegram bot setup
const botToken = '6580940984:AAE-77qxB6sTfVhdnnKeyfz8ZXBOGScENh8'; 
const bot = new TelegramBot(botToken, { polling: true });

// Express app setup
const app = express();
const port = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.json());

// Define inline keyboard markup
const keyboardMarkup = {
    inline_keyboard: [
        [
            { text: 'کوردی سۆرانی', url: 'https://t.me/Sarkawt_Nure_So_bot' },
            { text: 'کوردی بادینی', url: 'https://t.me/Sarkawt_Badeni_bot' },
        ],
        [
            { text: 'عربی', url: 'https://t.me/Sarkawt_Nure_Arabic_bot' },
            { text: 'English', url: 'https://t.me/Sarkawt_Nure_English_bot' },
        ]
    ]
};

// Command handler
bot.onText(/\/start/, (msg) => {
    const name = msg.from.first_name + ' ' + msg.from.last_name;
    const welcomeMessage = `بەخێر بێن بۆ پرۆژەی ژیانت بەڕێز(${name})\n\n© 2024 Kosar Tarkhany. All Rights Reserved.\n\nزمانێ پەسەند هەلبژیرە\n\nتكايە زمانی پەسەندت هەڵبژێرە\n\nPlease select your preferred language\n\nالرجاء اختيار اللغة المفضلة لديك`;

    bot.sendMessage(msg.chat.id, welcomeMessage, {
        reply_markup: JSON.stringify(keyboardMarkup)
    });
});

// Handle POST requests from Telegram
app.post(`/bot${botToken}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Start Express server
app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});
