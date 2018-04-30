const Telebot = require("node-telegram-bot-api");
const db = require("./db");
const io = require("./iochecker");
const api_key = process.env.API_KEY;
const bot = new Telebot(api_key, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome");
});

bot.onText(/\/list/, (msg) => {
  db.list(msg.from.id, (res) => {
    if (!res.rows.length) {
      bot.sendMessage(msg.chat.id, "You have no saved reminders!");
    } else {
      var msgList = [];
      var message;
      for (let row of res.rows) {
        message = `${row.date.trim()} - ${row.message.trim()}`;
        msgList.push(message);
      }
      bot.sendMessage(msg.chat.id, msgList.join("\n"));
    }
  });
});

bot.onText(/\/remind/, (msg) => {
  var text = msg.text.split(" ");
  text.shift();
  var date = text.shift();
  var message = text.join(" ");
  if (!message) {
    bot.sendMessage(msg.chat.id, "Please type in a reminder!");
  } else if (!date) {
    bot.sendMessage(msg.chat.id, "Please type in a date!");
  } else {
    db.insert(msg.from.id, date, message);
    bot.sendMessage(msg.chat.id, "Reminder added!");
  }
});

bot.onText(/\/remove/, (msg) => {
  db.delete(msg.from.id);
  bot.sendMessage(msg.chat.id, "Reminders removed!");
});

bot.on("message", (msg) => {
  var res = io.date(msg.text);
  if(!res) res = "No result";
  bot.sendMessage(msg.chat.id, res);
});
