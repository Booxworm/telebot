const Telebot = require("node-telegram-bot-api");
const app = require("./server");
const db = require("./db");
const io = require("./iochecker");

// Setting up bot with webhook
const api_key = process.env.API_KEY;
//const bot = new Telebot(api_key, { polling: true });
const bot = new Telebot(api_key, {
  webHook: {
    port: process.env.PORT
  }
});
const url = `${process.env.APP_URL}.herokuapp.com:443/bot${api_key}`;
bot.setWebHook(url);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome!");
});

bot.onText(/\/list/, (msg) => {
  db.list(msg.from.id, (res) => {
    var msgList = io.parseList(res);
    if (!msgList) bot.sendMessage(msg.chat.id, "You have no saved reminders!");
    else bot.sendMessage(msg.chat.id, msgList.join("\n"));
  });
});

bot.onText(/\/remind/, (msg) => {
  var res = io.parseCommand(msg.text);
  if (!res.message) {
    bot.sendMessage(msg.chat.id, "Please type in a reminder!");
  } else {
    db.insert(msg.from.id, io.date(res.date), res.message);
    bot.sendMessage(msg.chat.id, "Reminder added!");
  }
});

bot.onText(/\/remove/, (msg) => {
  // Command does not include any other parameters
  if(msg.text == "/remove"){
    var list;
    db.list(msg.from.id, (res) => {
      var msgList = io.parseList(res, "/remove");
      if (!msgList) bot.sendMessage(msg.chat.id, "You have no saved reminders!");
      else {
        bot.sendMessage(msg.chat.id, "Pick a reminder to remove", {
          "reply_markup": {
            "keyboard": msgList
          }
        });
      }
    });
  }
  // Command includes reminder to remove
  else {
    var res = io.parseCommand(msg.text);
    db.delete(msg.from.id, res.date, res.message);
    bot.sendMessage(msg.chat.id, "Reminder removed!", {
      "reply_markup": {
        "remove_keyboard": true
      }
    });
  }
});

bot.on("message", (msg) => {
  bot.sendMessage(msg.chat.id, msg.text);
});
