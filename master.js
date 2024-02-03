
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000; 

app.use(bodyParser.json());

const botToken = process.env.TELEGRAM_BOT_TOKEN || '6794255583:AAFCpcK8iwZ3SvOQay1i9FIwAcVxSQJk7Og'; 
const bot = new TelegramBot(botToken, { polling: true });

const adminChatId = -1002125523786;

let voiceOptionClicked = false; 

const askQuestions = (chatId, questions) => {
  const askQuestion = (index) => {
    if (index < questions.length) {
      bot.sendMessage(chatId, questions[index], { reply_markup: { force_reply: true } })
        .then((response) => {
          const messageId = response.message_id;
          bot.onReplyToMessage(chatId, messageId, (reply) => {
            bot.forwardMessage(adminChatId, chatId, reply.message_id);
            askQuestion(index + 1);
          });
        });
    } else {
      const translatedText = 'Thank you very much, for answering all the questions. Your answers have been forwarded to Mr.Sarkawt . You can contact Mr.Sarkawt directly via clicking this name (@SarkawtDxn). Thank you.';
      bot.sendMessage(chatId, translatedText);
      }  
  };
  askQuestion(0);
};
  const buttons = [
    [
      { text: 'Project Explanation', callback_data: 'project_notification' },
      { text: 'I Want To Start Working', callback_data: 'button_2' },
    ],
    [
      { text: 'Successful People', url: 'https://t.me/+w0OVDtcL3HUwMWEy' },
      { text: 'Our Social Media', callback_data: 'button_4' },
    ],
  ];

  bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;

    switch (callbackQuery.data) {
case 'project_notification':
  const options = [
    { text: 'Project explanation with voice', callback_data: 'voice_option' },
    { text: 'Project explanation with text', callback_data: 'text_option' },
];


  bot.sendMessage(chatId, 'Choose an option', {
      reply_markup: {
          inline_keyboard: [options],
      },
  });
  break;


        bot.sendMessage(chatId, 'Choose an option', {
          reply_markup: {
            inline_keyboard: [options],
          },
        });
        break;

      case 'text_option':
        
      const textOptionValue = `
      Completing the project below  
    Hello, this is a good time. We are in the DXN company in Latin America to complete our project  
    DXN company is a completely new company established by Dr. Lim Swee Jin in 1993. They have more than 105 offices and are popular in the Kurdistan region where they have offices in all four provinces. This company operates in direct sales.  
    This company has a unique system that requires daily activity. All products are of high quality with a hundred percent.  
    Their sales figures in the first quarter are as follows  
    The first quarter. Personal care products such as soap, shampoo, and deodorant  
    The second quarter. Food products These products help improve general health and are suitable for both adults and children.  
    The third quarter. Drinks such as soft drinks  
    The fourth quarter. Skincare products such as moisturizing creams and deodorants  
    How to make money through this company and how to earn revenue.  
    Company members have three ways to make a profit.  
    The first way is to receive a monthly return of $ 10,000 or more without selling anything.  
    The second way to make a profit is to sell products personally and earn points on each product you sell, and for these points, you can get a cash payment at the end of each month.  
    The third way is to invite others to join the company as members of your own team and get a share of their profits and have the opportunity to make a large income without any financial investments.  
    Note: If the percentage is zero and no cash payment is received for joining, you can sell goods online. All you have to do is sell cash and distribute profits evenly with partners.  
    You can benefit from this company's profits  
    1- Health  
    2- Freedom in time and place  
    3- High returns  
    4- Global opportunities  
    If you want to change your life and that of your family and enjoy a comfortable and peaceful life, we can help you achieve the highest level  
    For more information and to join the company and start making profits today  
    `;

        bot.sendMessage(chatId, textOptionValue);
        break;

      case 'voice_option':
        if (!voiceOptionClicked) {
          voiceOptionClicked = false;

          const audioFilePath = 'englishvoice.mp3';

          try {
            const audioBuffer = fs.readFileSync(audioFilePath);
            bot.sendVoice(chatId, audioBuffer);
            console.log('Voice message sent successfully.');
          } catch (error) {
            console.error('Error sending voice message:', error);
          }
        }
        break;

      case 'button_2':
        if (callbackQuery.from.username) {
          const questions = [
            'What is your name?',
            'How old are you?',
            'Where do you live?',
            'Do you have a certificate?',
            'How do you spend your free time? ',
          ];
          askQuestions(chatId, questions);
        } else {
          const buttonText = 'Click Here';
          const buttonCallback = 'send_images';

          bot.sendMessage(chatId, 'Please create a username via the button below' + buttonText, {
            reply_markup: {
              inline_keyboard: [
                [{ text: buttonText, callback_data: buttonCallback }],
              ],
            },
          });
        }
        break;

      case 'send_images':
        const imagePaths = [
          'not1.jpg',
          'not2.jpg',
          'not3.jpg',
          'not4.jpg',
        ];

        const sendImage = (index) => {
          if (index < imagePaths.length) {
            const imagePath = imagePaths[index];

            bot.sendPhoto(chatId, imagePath)
              .then(() => {
                setTimeout(() => sendImage(index + 1), 500);
              })
              .catch((error) => {
                console.error('Error sending image:', error);
              });
          } else {
            bot.sendMessage(chatId, 'Follow these images to create a username');
          }
        };

        sendImage(0);
        break;

        case 'button_3':
          bot.sendMessage(chatId, 'Choose an option', {
            reply_markup: {
              inline_keyboard: [
                { text: 'Open Link', url: 'https://t.me/+w0OVDtcL3HUwMWEy' },
              ],
            },
          });
          break;
        
      case 'button_4':
        const facebookLink = 'https://t.me/sarkawtdxn';
        const tiktokLink = 'https://www.tiktok.com/@sarkawthalaq?_t=8hbV6bP8p2E&_r=1';
        const instagramLink = 'https://www.facebook.com/profile.php?id=100089276406820&mibextid=2JQ9oc';
        const whatsappLink = 'https://wa.me/9647502354041';

        const socialMediaButtons = [
          [{ text: 'Telegram', url: facebookLink }],
          [{ text: 'TikTok', url: tiktokLink }],
          [{ text: 'Facebook', url: instagramLink }],
          [{ text: 'WhatsApp', url: whatsappLink }],
        ];

        bot.sendMessage(chatId, 'Choose an option', {
          reply_markup: {
            inline_keyboard: socialMediaButtons,
          },
        });
        break;

      default:
        break;
    }
  });

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const fullName = msg.from.first_name + ' ' + msg.from.last_name;
  
    const greetingMessage = "Hello Mr. ${fullName} Welcome to your life project please click the {Project Explanation} button to start.";
  
  const copyrightMessage = `\n\n\n© ${new Date().getFullYear()} Kosar Tarkhany. All Rights Reserved`;

  const combinedMessage = greetingMessage + copyrightMessage;

  bot.sendMessage(chatId, combinedMessage, {
    reply_markup: {
      inline_keyboard: buttons,
    },
  });
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});