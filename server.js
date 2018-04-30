const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Setting up server
app.use(bodyParser.json());
app.post(`/bot${process.env.API_KEY}`, (req,res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});

module.exports = app;
