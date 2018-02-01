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


function spoilerFunc(movieName){
  if (!movieName){
    console.log(`That movie does not exist! No spoilers!`)
  }else{
    console.log(`The ${movieName} spoiler is going to appear in ${spoilerTime} seconds...`)
    //display spoiler to user
    setTimeout(() => {console.log(spoilerContent)}, spoilerTimer*1000);
  }

  //process through API

  //get spoiler

}
//Use movieInput as parameter for function.
spoilerFunc(movieInput);

// search line for searching on google https://www.google.ca/search?q=movie