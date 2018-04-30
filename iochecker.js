module.exports = {
  parseList: function(res, command=''){
    if (!res.rows.length){
      return null;
    }
    var msgList = [];
    for (let row of res.rows) {
      var message = [];
      var str = command ? command + ' ' : '';
      str += `${row.date.trim()} - ${row.message.trim()}`
      message.push(str);
      msgList.push(message);
    }
    return msgList;
  },
  parseCommand: function(text){
    var res = {
      date: null,
      message: null
    };
    text = text.split(' ');
    var command = text.shift();
    if (command == "/remind") {
      res.date = text.shift();
      res.message = text.join(' ');
    } else if (command == "/remove") {
      res.date = text.shift();
      text.shift();
      res.message = text.join(' ');
    }
    return res;
  },
  date: function(date="today"){
    if (date.match(/\d+([\/-]-\d+)?/)) {
      return date.replace('-','/');
    } else {
      return today();
    }
  }
}

function today(){
  var d = new Date();
  return `${d.getDate()}/${d.getMonth()+1}`;
}
