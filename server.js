const express = require("express");
const bodyParser = require("body-parser");

// Setting up server
const app = express();
app.use(bodyParser.json());
app.post(`/bot${process.env.API_KEY}`, (req,res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Listening
app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});

module.exports = app;
