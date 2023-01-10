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


module.exports = router;