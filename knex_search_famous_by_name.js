const settings = require("./settings"); // settings.json

const moment = require("moment");
const pg = require("knex")({
  client: 'pg',
    connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

let name = process.argv[2];
// let query = 'SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name = $1::TEXT OR last_name = $1';
console.log("Searching...");
pg.select().from('famous_people').asCallback((err, rows) => {
  if(err) console.error(err);
  console.log(rows);
});

pg.destroy(()=> {
  console.log("closing connection");
});



// client.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }
//   client.query(query, [name], (err, result) => {
//     if (err) {
//       return console.error("error running query", err);
//     }
//     console.log(`Found ${result.rows.length} person(s) by the name '${name}'`);
//     result.rows.forEach((row) => {
//       console.log(`${row.first_name} ${row.last_name}, born '${moment(row.birthdate).format('YYYY-MM-DD')}'`);
//     });
//     client.end();
//   });
// });