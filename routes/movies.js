var express = require('express');
var router = express.Router();
const apiKey = process.env.MDB_API_KEY;
const fetch = require('node-fetch');

router.get('/genre/:type', (req, res) => {
    fetch(`https://api.themoviedb.org/3/genre/${req.params.type}/list?api_key=${apiKey}`)
    .then(res => res.json())
    .then((data) => {
        res.json({result : data.genres})
    } )
})

router.get('/selection/:type/:genre', (req, res) => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${req.params.genre}`)
    .then(res => res.json())
    .then((data) => {
        res.json({result : data})
    })
})

router.get('/keyword/:word', (req, res) => {
    fetch(`https://api.themoviedb.org/3/search/keyword?api_key=${apiKey}&query=${req.params.word}`)
    .then(res => res.json())
    .then((data) => {
        res.json({result : data})
    })
})


// Get Movie Provider : https://api.themoviedb.org/3/movie/{MOVIE_ID}/watch/providers?api_key=
//img path : https://image.tmdb.org/t/p/original/{PATH}
// img path with width / INFO ->  https://www.themoviedb.org/talk/5aeaaf56c3a3682ddf0010de?language=fr-FR



module.exports = router;