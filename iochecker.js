module.exports = {
  date: function(date="today"){
    if (date.match(/(today)/gi)) {
      return today();
    } else if (date.match(/\d+([\/-]-\d+)?/)) {
      return date.replace("-","/");
    } else {
      return null;
    }
  }
}

function today(){
  var d = new Date();
  return `${d.getDate()}/${d.getMonth()+1}`;
}

const io = require("./iochecker");
console.log(io.date('123-546'));
console.log(io.date('12/56'));
