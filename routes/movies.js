let movies = require('../models/movies');
let express = require('express');
let router = express.Router();

router.findAll = (req, res) => {
    // Return a JSON representation of our list

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(movies,null,5));
    res.json(movies);
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var movie = getByValue(movies,req.params.id);

    if (movie != null)
        res.send(JSON.stringify(movie,null,5));
    else
        res.send('Donation NOT Found!!');

}

function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}


router.addMovie = (req, res) => {
    //Add a new donation to our list
    var id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id
    var currentSize = movies.length;

    movies.push({"id" : id, "title" : req.body.title, "year" : req.body.year, "upvotes" : 0});

    if((currentSize + 1) == movies.length)
        res.json({ message: 'Movie Added Successfully!'});
    else
        res.json({ message: 'Movie NOT Added!'});
}

module.exports = router;