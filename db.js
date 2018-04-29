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

module.exports = {
  query: function(query, values, callback){
    client.connect();
    return client.query(query, values, callback);
  },
  end: function(){
    client.end();
  }
}
