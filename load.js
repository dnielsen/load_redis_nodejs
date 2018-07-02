var redis = require('redis');
var client = redis.createClient(); //creates a new client. Defaults to 127.0.0.1 and 6379
// var client = redis.createClient("127.0.0.1", 6379); // specify your own ip address and port

console.log('connected to redis');


var fs = require('fs');
var parse = require('csv-parse');
var fileName = "questions.csv"; 

var text = fs.readFileSync(fileName, "utf8");

console.log('connected to fs');


    text.split(/\r?\n/).forEach(function (line) {
        // ...
        client.hmset('key1', 'f1', 'value1', 'f2', 'value2', 'f3', 'value3');
        // ...
    });


console.log('data import complete');