const { Client } = require("pg");
const client = new Client({
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  host: process.env.DBHOST,
  port: 5432,
  database: process.env.DB,
  //connectionString: process.env.DATABASE_URL,
  ssl: true
});
const table = "mytable";

client.connect();

module.exports = {
  list: function(name, callback){
    client.query(`SELECT * FROM ${table} WHERE name='${name}';`, (err, res) => {
      if(err) console.log(err.stack);
      else callback(res);
    });
  },
  insert: function(name, date, message){
    client.query(`INSERT INTO ${table} (name, date, message) VALUES ('${name}', '${date}', '${message}');`, (err, res) => {
      if(err) console.log(err.stack);
    });
  },
  delete: function(name){
    client.query(`DELETE FROM ${table} WHERE name='${name}';`, (err, res) => {
      if(err) console.log(err.stack);
    });
  },
  end: function(){
    client.end();
  }
}
