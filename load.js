/* make sure to remove node_modules from your repo  - that way users just need to run `npm install` */
var redis = require('redis');

/* K: generally, it's good practice to use something to import the configuration - such as `yargs`
 * that allows you to pass in a JSON file. See:
 * https://github.com/stockholmux/node-redis-rest-crud-express-boilerplate/blob/9b2998a0433a4d4418d388a04f901ccfbe21954b/index.js#L2
 * https://github.com/stockholmux/node-redis-rest-crud-express-boilerplate/blob/9b2998a0433a4d4418d388a04f901ccfbe21954b/index.js#L15
 */
var client = redis.createClient(); //creates a new client. Defaults to 127.0.0.1 and 6379
// var client = redis.createClient("127.0.0.1", 6379); // specify your own ip address and port


// import build in 'path' module , helper module in path manipulation and concatention
var path = require('path');


// Load FileSystem built in Module to can read from hard disk
var fs = require('fs');
/* I wouldn't hard code in the csv - rather use `yargs` to bring it in from the command line  */
// path.join it like  DIRECTORY_SEPERATOR in PHP Langauge
var fileName = path.join(__dirname,"questions.csv");


var csv = require('csv-parser')
let arrayOfRows = [];

/* K: reading from a stream is great, but maybe a bit overkill for something like this (see: synchronous API on http://csv.adaltas.com/parse/examples/) */
// Read From Hard Disk File and PIPE output to CSV lib to can convert CSV data into JAVASCRIPT Object
fs.createReadStream(fileName)
  .pipe(csv())
  // this event with name 'data' will be fired for each row in CSV
  .on('data', function (row) {
    arrayOfRows.push(row);
    // this event will be fired when complete read and convert csv file into javascript data.
  }).on('end',function(){

    if(arrayOfRows.length){
      // Save each row as HashMap with Title as key
      /* K: This has no concurrency or flow control - so it's probably why this hangs instead of ends cleanly */
      arrayOfRows.forEach(row=>{
        client.hset(row.Title, "Votes",row[Object.keys(row)[0]] , redis.print);
        client.hset(row.Title, "Answers",row.Answers , redis.print);
        client.hset(row.Title, "Views",row.Views , redis.print);
        client.hset(row.Title, "Title",row.Title , redis.print);
        client.hset(row.Title, "Description",row.Description , redis.print);
        client.hset(row.Title, "Tag",row.Tag , redis.print);
        client.hset(row.Title, "Date",row.Date , redis.print);
        client.hset(row.Title, "User",row.User , redis.print);
      })
    }
  })
