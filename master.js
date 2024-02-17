
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000; 

app.use(bodyParser.json());

const botToken = process.env.TELEGRAM_BOT_TOKEN || '6957010297:AAH-OdzHyHuRLF_z75Rzs2bSzN1k4FfsuiQ'; 
const bot = new TelegramBot(botToken, { polling: true });

const adminChatId = -1002125523786;

let voiceOptionClicked = false; 

const askQuestions = (chatId, questions) => {
  let index = 0;

  const askQuestion = () => {
    if (index < questions.length) {
      bot.sendMessage(chatId, questions[index], { reply_markup: { force_reply: false } })
        .then(() => {
          bot.once('message', (reply) => {
            const username = reply.from.username ? `@${reply.from.username}` : '';
            const forwardedMessage = `Bot: Sarkawt Badeni Bot\n\nئەندام: ${username}\n\nپرسیار: ${questions[index]}\n\nوەڵام: ${reply.text}`;
            bot.sendMessage(adminChatId, forwardedMessage)
              .then(() => {
                index++;
                askQuestion();
              });
          });
        });
    } else {
      const translatedText = 'زور سوپاس به ريز بو جاب دانه وى هه مى پرسياره كا . جابدانا ته ناردى بو كاك سەرکەوت . تو لى ڤى ريكى كليك كردنى لى ناڤى په يوه نديى راسته و خو لى گه ل به ريزان (@sarkawtdxn) ب كه ڤينه كار' 
         bot.sendMessage(chatId, translatedText);
    }
  };

  askQuestion();
};

  const buttons = [
    [
      { text: 'ناسینا پروژە', callback_data: 'project_notification' },
      { text: ' من ڤیت دەست پی بکەم ب کار', callback_data: 'button_2' },
    ],
    [
      { text: 'بینینا کەسانا سەرکەفتی', url: 'https://t.me/+w0OVDtcL3HUwMWEy' },
      { text: 'سوشیاڵ میدیاکانمان', callback_data: 'button_4' },
    ],
  ];

  bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;

    switch (callbackQuery.data) {
case 'project_notification':
  const options = [
    { text: 'ناسینا پروژە ب دەنگ', callback_data: 'voice_option' },
    { text: 'ناسینا پروژە ب نوسین', callback_data: 'text_option' },
];


  bot.sendMessage(chatId, 'هەلبژاردنێکی هەلبژیرە', {
      reply_markup: {
          inline_keyboard: [options],
      },
  });
  break;


        bot.sendMessage(chatId, 'هەڵبژاردنێکی هەلبژیرە', {
          reply_markup: {
            inline_keyboard: [options],
          },
        });
        break;

      case 'text_option':
        
      const textOptionValue = `
      سلاڤ رێزدار  ئەڤ دەمێتە باش ئەم ل کۆمپانیا DXN لگەلتەینە بۆ شلوڤەکرنا پرۆژێخو  
    کۆمپانیا DXN کۆمپانیایەکا نیودەولەتیە ژ لایێ دکتۆر لیم سویجین هاتیە دامەزراندن لسالا  1993 زیاتر ل 180 ولاتان ئۆفیس و لقا سەرەکی یێت هەین و  ل کوردستانێش ل هەر چوار پارێزگەهان  مە ئۆفیسا سەرەکی یاهەی  ئەڤ کۆمپانیایە کار دکەت ل بوارێ فرۆشا راستەوخۆ 
    ئەڤ کۆمپانیایە کۆمەلەک بەرهەمێت سروشتی یێت هەی کو پێداویستیێت رۆژانەیێن خەلکینە هەمی کوالێتی  بەرزوو سەد ل سەد سروشتین 
    بەرهەمێت مەش ل چوار کۆمەلە یان پێکتێن
    کۆمەلا یێکێ . بەرهەمێت پاراستنا کەسی وەک سابون شامپۆ مەحجون وە کۆمەلێک بەرهەمێت دی 
    کۆمەلا دووێ . تەواوکەرێت خۆراکینە ئەڤ کۆمەلەیە شول لسەر تەندروستیا ناڤداڤەیا مرۆڤ دکەن ژ نەخۆشیێت مەزن و بچیک پارێزن 
    کۆمەلا سێیێ . ڤەخارن وەک قاوەو شەربەت  
    کۆمەل اچوارێ . جوانکاریێت پێستی وەکی کرێمێت سەروچاڤا و پاقژکرن
    شولکرنا جەنابێتە  دێیا چەوابیت ل کۆمپانیایێ و چەوا قازانج دکەی 
    ئەندامێت کۆمپانیایێ سێ سەرچاڤێت قازانجی یێت هەین .
    یێکەم بەرهەمەکی تو دکری بۆ نمونە ب 10000هەزارا تو دشێی ب 15000 هەزارا یان زیاتر ب فرۆشیەڤە
    قازانجێ دووێ ئەڤ بەرهەمێ تو دکری خالوو پۆینتێت لسەر هەر بەرهەمەکی خالێت تایبەت بخو یێل لسەر  و لسەر  ڤان خالا مانگانە دێ داهات وەر گری ل شەریکێ
    قازانجێ سێیێ . تۆ کەسێت  وەکی خۆ دکەیە ئەندام لسەر ناڤێ خۆ ئەویش هەر وەکیتە  فرۆش دکەن و خالا کومکەن قازانجێ خۆ وەر دگرن و ل رێکا ڤان کەسانەڤە  قازانجوو خال دێ بوتەژی هێن  بێ ئەوەی ل خال و قازانجێت وان کێم ببن  بەلکی و کۆمپانیا دێ دەتەتە ل قازانجێ خۆ 
    تێبینی . ئەگەرێ زەرەر کرنێ %0  و هیچ برە پارەیەکی نادەی بۆ ئەندام بونێ و دشێی ب رێکا  ئۆنلاینێ بەرهەما بفرۆشی تنێ لسەرتە ئەوە وەسل بکەی هەمی تشت شەریکە دێ بجهئینیت 
    تو چار خالا دێ بدەست ڤەئینی دگەل کۆمپانیایێ  
    1- تەندروستی 
    2-ئازادیا کاتی و جهی 
    3- داهاتەکێ بەرز 
    4- گەشتا نێودەولەتی 
    ئەگەر تە بڤێت ژیانا خۆ و خانەواداخو بگۆری وببیە خودان پرۆژێ خۆ و بێیە ژینگەیەکا ئەرێنی و سەرکەفتی  ئەم دشێین هاریکاریا تە بکەین هەتا تو دگەهیە باشترین ئاست 
    بۆ وەرگرتنا زانیاریا و بون ب ئەندام بون وەرە قۆناغا دیڤدا .
    `;
    
        bot.sendMessage(chatId, textOptionValue);
        break;

      case 'voice_option':
        if (!voiceOptionClicked) {
          voiceOptionClicked = false;

          const audioFilePath = 'sarkawtvoice.mp3';

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
            'ناڤی تە چیە؟',
            'تەمەنی تە چەندە؟',
            'ل کیڤە دژی؟',
            'ئەری تە بڕوانامە هەیە؟',
           'ئەرێ وەختێت خۆیت بەتال ب چ دبەیە سەر؟',
          ];
          askQuestions(chatId, questions);
        } else {
       
          const buttonText = 'کلیک ڤێرە کە';
          const buttonCallback = 'send_images';
          
          bot.sendMessage(chatId, 'تكايه ببوره به ريز تو ناڤى ته ل ڤهى كارهينى نيه ل به ر ڤا هوكارا جابا ته ناگه ت ب كاك سەرکەوت بو دروست كرنى ناڤى ب كارهينه را كليك ڤێرە بكه. و پاش دروست کردنا ناڤی ب کار هینەری کلیکی ل دوگمەی (من ڤیت دەست بی کەم ب کار کردنی) ڤە کە', {
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
          'not0.jpg',
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
            bot.sendMessage(chatId, 'لی ریگا ڤی وینە یەی ناڤی ب کار هینەری دروست کە');
          }
        };

        sendImage(0);
        break;

        case 'button_3':
          bot.sendMessage(chatId, 'هەلبژاردنە کی  هەلبژیرە', {
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

        bot.sendMessage(chatId, ' هەلبژاردنە کی هەلبژیرە', {
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
  

    const greetingMessage = `سلاڤ بەریز ${fullName} خیر بی بو پروژا ژیانا تە هیڤیت  کەم کلیکی  لی دووکمی (نسینا پروژە) بکەی  بو دەست پی کردنی.`;


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