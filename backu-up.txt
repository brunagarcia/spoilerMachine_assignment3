//require packages needed.
const http = require('https');
const request = require('request');
const readlineSync = require('readline-sync');
const cheerio = require('cheerio');

//get movie name from user:
const movieInput = readlineSync.question('Enter a movie name? ');
//Spoiler time wait
const spoilerTimer = Number(readlineSync.question('Enter wait time to your spoiler? '));

function spoilerFunc (movieName) {

  if (!movieName) {
    console.log(`That movie does not exist! No spoilers!`)
  } else {
    //spoiler warning
    console.log(`***** The ${movieName} spoiler is going to appear in ${spoilerTimer} seconds...*****`)

    //Google scraping \/
    //declare url to be displayed
    const url = `https://www.google.ca/search?q=${movieName}`

    request(url, function (error, response, body){
      if (!error) {
        //creating array to keep heading after parse
        const headingsArr = []
        //getting heading with cheerio
        var $ = cheerio.load(body)
        //Get heading and passing in a variable --> heading are children of #ires container.
        console.log(`Read some news about ${movieName}:`)
        $('h3').each(function (i, elem){
          headingsArr[i] = $(this).text();
          console.log(headingsArr[i]);
        });
      }

    }) //Closing request

    //MovieDB API 
    const urlData = `https://api.themoviedb.org/3/search/movie?api_key=c19a709f11ab1e26daed75327d045fc4&query=${movieName}`;

    //get the spoiler from movie db
    request(urlData, ((err, response, data) => {
        if (!err) {
          moviesData = JSON.parse(data);
          spoilerTitle = String(moviesData.results[0].title);
          spoilerContent = String(moviesData.results[0].overview);

          setTimeout(() => {
            console.log(`*** The ${spoilerTitle} spoiler is:`);
            console.log(`${spoilerContent}`);
          }, spoilerTimer * 1000);
        }
      })
    )//Close MovieDB Request

  }
}//Closing function

//Use movieInput as parameter for function.
spoilerFunc(movieInput);