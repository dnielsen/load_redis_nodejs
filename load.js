var redis = require('redis');
var client = redis.createClient(); //creates a new client. Defaults to 127.0.0.1 and 6379
// var client = redis.createClient("127.0.0.1", 6379); // specify your own ip address and port


// import build in 'path' module , helper module in path manipulation and concatention
var path = require('path');


// Load FileSystem built in Module to can read from hard disk
var fs = require('fs');

// path.join it like  DIRECTORY_SEPERATOR in PHP Langauge
var fileName = path.join(__dirname,"questions.csv");


var csv = require('csv-parser')
let arrayOfRows = [];

// Read From Hard Disk File and PIPE output to CSV lib to can convert CSV data into JAVASCRIPT Object
fs.createReadStream(fileName)
  .pipe(csv())
  // this event with name 'data' will be fired for each row in CSV
  .on('data', function (row) {
    arrayOfRows.push(row);
    // this event will be fired when complete read and convert csv file into javascript data.
  }).on('end',function(){
    // Convert arrayOfRows into JSON formate using JSON.stringify Method
    // Store json data into Redis in Key with name 'csv_data'
    if(arrayOfRows.length){
      client.set("csv_data",JSON.stringify(arrayOfRows), redis.print);
    }


    /* Test Reading data from Redis and Convert JSON into Javascript array */
      client.get('csv_data',(err,data)=>{
        // Read Data from Redis as JSON string and convert it into Javascript Array using JSON.parse
        let arrayOfRows = JSON.parse(data);
        console.log(arrayOfRows);
      });
  })
