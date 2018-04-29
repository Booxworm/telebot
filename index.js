const Telebot = require("node-telegram-bot-api");
const config = require("./config");

const bot = new Telebot(config.API_KEY, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome");
});
