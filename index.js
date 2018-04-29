const Telebot = require("node-telegram-bot-api");
const config = require("./config");

const api_key = config.API_KEY || process.env.API_KEY;

const bot = new Telebot(api_key, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome");
});
