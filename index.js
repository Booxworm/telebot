const Telebot = require("node-telegram-bot-api");
const api_key = process.env.API_KEY;
const bot = new Telebot(api_key, { polling: true });

const { Client } = require("pg");
const client = new Client();
client.connect();

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome");
});

bot.onText(/\/query/, (msg) => {
  client.query("SELECT # FROM mytable", (err, res) => {
    if(err) throw err;
    bot.sendMessage(msg.chat.id, res.rows[0]);
    client.end();
  });
});
