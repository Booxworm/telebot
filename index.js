const Telebot = require("node-telegram-bot-api");
const db = require("./db");
const api_key = process.env.API_KEY;
const bot = new Telebot(api_key, { polling: true });
const table = "mytable";

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome");
});

bot.onText(/\/list/, (msg) => {
  db.query(`SELECT * FROM ${table}`, (err, res) => {
    if(err) console.log(err.stack);
    else {
      var msgList = [];
      for (let row of res.rows) {
        var message = `${row.date} - ${row.message}`;
        msgList.push(message);
      }
      db.end();
      bot.sendMessage(msg.chat.id, msgList.join("\n"));
    }
  });
});

/*
bot.onText(/\/remind/, (msg) => {
  var text = msg.text.split(" ");
  text.shift();
  var name = msg.from.id;
  var date = text.shift();
  var reminder = text.join(" ");
  db.query(`INSERT INTO ${table} (name, date, message) VALUES (${name}, ${date}, ${reminder})`, (err, res) => {
    if (err) console.log(err.stack);
  });
  db.end();
  bot.sendMessage(msg.chat.id, "Reminder added!");
});
*/
