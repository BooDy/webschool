#!/usr/bin/nodejs

var request = require("request")
var readline = require('readline-sync');
var fs = require('fs');
var glob = require("glob")

var name = readline.question("What is your name: ");
var url = "https://swapi.co/api/people/?search="+name;

files = glob.sync("data/*"+name+"*", {'nocase': 1});
var cont = 'y';
if (files.length > 0) {
    for (i =0; i < files.length; i++) {
        character_name = files[i].split("/")[1];
        console.log(character_name);
    }
    cont = readline.question("You already have the above files, do you want to search the web again? [y|n]: ");
}

if (cont != 'y') {
    for (var i = 0; i < files.length; i++) {
        character = fs.readFileSync(files[i], 'utf8');
        console.log(character);
    }
    process.exit();
}

request({
    url: url,
    json: true
}, function (error, response, body) {
    if (body.results.length > 0) {
        for (var i = 0; i < body.results.length; i++) {
                console.log('Found: '+body.results[i]['name']);
                fs.appendFile('data/'+body.results[i]['name'], JSON.stringify(body.results[i], null, 2), function (err) {
                    if (err) {
                        console.log('An error occured while attempting to write file');
                        console.log(err);
                    }
                });
        }
    }
    else {
        console.log("No results were found");
    }
})
