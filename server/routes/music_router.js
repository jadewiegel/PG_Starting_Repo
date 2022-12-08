const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


let musicLibrary = [
    {
        rank: 355, 
        artist: 'Ke$ha', 
        track: 'Tik-Toc', 
        published: '1/1/2009'
    },
    {
        rank: 356, 
        artist: 'Gene Autry', 
        track: 'Rudolph, the Red-Nosed Reindeer', 
        published: '1/1/1949'
    },
    {
        rank: 357, 
        artist: 'Oasis', 
        track: 'Wonderwall', 
        published: '1/1/1996'
    }
];

router.get('/', (req, res) => {
    res.send(musicLibrary);
    // update this to use pool.query - to query your music library database and 
    // select all from the "songs" table and then res.send the result.rows back to the client
    // REMINDER - you can only have 1 res.send, so you need to remove the one above
});

router.post('/', (req, res) => {
    musicLibrary.push(req.body);
    res.sendStatus(200);
});

module.exports = router;