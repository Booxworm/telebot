const Telebot = require("node-telegram-bot-api");

const api_key = process.env.API_KEY;

const bot = new Telebot(api_key, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome");
});
