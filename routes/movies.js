var express = require("express");
var router = express.Router();
const apiKey = process.env.MDB_API_KEY;
const fetch = require("node-fetch");

router.get("/genre/:type", (req, res) => {
  fetch(
    `https://api.themoviedb.org/3/genre/${req.params.type}/list?api_key=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      res.json({ result: data.genres });
    });
});

router.get("/selection/:type/:genre/:dates/", (req, res) => {
  fetch(
    `https://api.themoviedb.org/3/discover/${req.params.type}?api_key=${apiKey}&${req.params.dates}&with_genres=${req.params.genre}&sort_by=popularity.desc`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        const randomePage = Math.floor(Math.random() * (data.total_pages/3) +1 );
        fetch(
          `https://api.themoviedb.org/3/discover/${req.params.type}?api_key=${apiKey}&${req.params.dates}&with_genres=${req.params.genre}&sort_by=popularity.desc&page=${randomePage}`
        )
          .then((res) => res.json())
          .then((data) => {
            if(!data){
              res.json({result : "no result"})
            }
            if(data.length === 1){
                res.json({result : data.results})
            }
            else{
                console.log(data.results)
                const randomNumb = Math.floor(Math.random() * (data.results.length))
                console.log(randomNumb)
                res.json({result : data.results[randomNumb]})
            }

          });
      } else {
        res.json({ result: "error" });
      }
    });
});

router.get("/id/:type/:id", (req, res) => {
    fetch(`https://api.themoviedb.org/3/${req.params.type}/${req.params.id}/watch/providers?api_key=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
        if(data.results){
          console.log(data.results["US"])
            if(data.results["US"]){
                
                res.json({result : data.results["US"].flatrate})}
            else {
            }}
            else{
                res.json({error : "No Provider found"})
                
        }    
    })
})

router.get("/keyword/:word", (req, res) => {
  fetch(
    `https://api.themoviedb.org/3/search/keyword?api_key=${apiKey}&query=${req.params.word}`
  )
    .then((res) => res.json())
    .then((data) => {
      res.json({ result: data });
    });
});

router.get("/randommovie", (req, res) => {
        fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&sort_by=popularity.desc&page=${Math.floor(Math.random() * (500))}`
        )
          .then((res) => res.json())
          .then((data) => {
            if(!data){
              res.json({result : "no result"})
            }
            else{
                console.log(data)
                const randomNumb = Math.floor(Math.random() * (data.results.length))
                console.log(randomNumb)
                res.json({result : data.results[randomNumb]})
            }

          });
});

router.get("/randomtv", (req, res) => {
  fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&sort_by=popularity.desc&page=${Math.floor(Math.random() * (500))}`
  )
    .then((res) => res.json())
    .then((data) => {
      if(!data){
        res.json({result : "no result"})
      }
      else{
          console.log(data)
          const randomNumb = Math.floor(Math.random() * (data.results.length))
          console.log(randomNumb)
          res.json({result : data.results[randomNumb]})
      }

    });
});
// Get Movie Provider : https://api.themoviedb.org/3/movie/{MOVIE_ID}/watch/providers?api_key=
//img path : https://image.tmdb.org/t/p/original/{PATH}
// img path with width / INFO ->  https://www.themoviedb.org/talk/5aeaaf56c3a3682ddf0010de?language=fr-FR
// between date : &primary_release_date.gte=2020-10-01&primary_release_date.lte=2020-10-15

module.exports = router;
