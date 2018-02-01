//require packages needed.
const request = require('request');
const readlineSync = require('readline-sync');
const cheerio = require('cheerio');

//get movie name from user:
const movieInput = readlineSync.question('Enter a movie name? ');
//Spoiler time wait
const spoilerTimer = Number(readlineSync.question('Enter wait time to your spoiler? '));
//create varible to keep spoiler:
const spoilerContent = `Darth Vader is Anakin Skywalker, Luke's dad`;


function spoilerFunc(movieName) {
  if (!movieName) {
    console.log(`That movie does not exist! No spoilers!`)
  } else {
    console.log(`The ${movieName} spoiler is going to appear in ${spoilerTimer} seconds...`)
    //process through API

    //declare url to be displayed
    var url = `https://www.google.ca/search?q=${movieName}`

    request(url, function (error, response, body) {
      if (!error) {
        //creating array to keep heading after parse
        var headingsArr = []
        //getting heading with cheerio
        var $ = cheerio.load(body),
          //Get heading and passing in a variable --> heading are children of #ires container.
          searchHeadings = $("#ires").children();
        searchHeadings.each(function (index) {
          let filtered = Array($("#ires").children().find(".r").text());
          if (filtered !== "") {
            // headingsArr.push(filtered);

            console.log(filtered[0]);
            //forEach loop to print the array to console.
            // headingsArr.forEach(function (h1) {
            //   console.log(h1);
            // })
          } else {
            console.log(err)
          }
          //display spoiler to user
          setTimeout(() => {
            console.log(spoilerContent)
          }, spoilerTimer * 1000);
        })
      }
    })
  }
}
//Use movieInput as parameter for function.
spoilerFunc(movieInput);

// search line for searching on google https://www.google.ca/search?q=movie
//.eq(index) line 33