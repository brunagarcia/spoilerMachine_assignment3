//require packages needed.
const http = require('https');
const request = require('request');
const readlineSync = require('readline-sync');
const cheerio = require('cheerio');

//get movie name from user:
const movieInput = readlineSync.question('Enter a movie name? ');
//Spoiler time wait
const spoilerTimer = Number(readlineSync.question('Enter wait time in seconds to get your spoiler? '));

if (movieInput === "" || spoilerTimer === 0) {
  //error in case movie and/or spoiler time are null -- Diving deeper
  console.log(`The movie and/or the time to spoil is null! No spoilers for that!`);
  return;
} else if (spoilerTimer < 0) {
  console.log(`The spoiler time is invalid, try again! `);
  return;
}

//Google scraping \/
const url = `https://www.google.ca/search?q=${movieInput}`

function scrapper() {
  request(url, function (error, response, body) {
    if (!error) {

      const headingsArr = []

      var $ = cheerio.load(body)

      console.log(`=> While you wait, read some news about ${movieInput}:`)

      $('h3').each(function (i, elem) {
        headingsArr[i] = $(this).text();
        console.log(headingsArr[i]);
      });
    }
  })
}

//MovieDB \/
const urlData = `https://api.themoviedb.org/3/search/movie?api_key=c19a709f11ab1e26daed75327d045fc4&query=${movieInput}`;

//get the spoiler from movie db
request(urlData, ((err, response, data) => {
  moviesData = JSON.parse(data);

  if (moviesData.results.length > 0) {
    console.log(`***** The ${movieInput} spoiler is going to appear in ${spoilerTimer} seconds...*****`)
    scrapper();
    spoilerTitle = String(moviesData.results[0].title);
    spoilerContent = String(moviesData.results[0].overview);

    setTimeout(() => {
      console.log(`*** The ${spoilerTitle} spoiler is:`);
      console.log(`${spoilerContent}`);
    }, spoilerTimer * 1000);

  } else {
    console.log(`Movie name not found in our database!!! Try again!`);
    return
  }
}))