const Telebot = require("node-telegram-bot-api");
const db = require("./db");
const api_key = process.env.API_KEY;
const bot = new Telebot(api_key, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome");
});

bot.onText(/\/list/, (msg) => {
  db.query("SELECT * FROM mytable", (err, res) => {
    if(err) console.log(err.stack);
    else {
      var reminder = res.rows[0];
      var message = reminder.date + " - " + reminder.message;
      bot.sendMessage(msg.chat.id, message);
      db.end();
    }
  });
});
