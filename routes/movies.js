let mongoose = require('mongoose');
let Movie = require('../models/movies');
let express = require('express');
let router = express.Router();

var mongodbUri ='mongodb://marcel.kowalik:bwj6nnvv@ds213688.mlab.com:13688/Moviewebsite';
mongoose.connect(mongodbUri);

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ] on mlab.com');
});

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Movie.find(function(err, movies) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(movies,null,5));
    });
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Movie.find({ "_id" : req.params.id },function(err, movie) {
        if (err)
            res.json({ message: 'Movie NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(movie,null,5));
    });
}

function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function(obj) { totalVotes += obj.upvotes; });
    return totalVotes;
}

router.findTotalVotes = (req, res) => {

    Movie.find(function(err, movies) {
        if (err)
            res.send(err);
        else
            res.json({ totalvotes : getTotalVotes(movies) });
    });
}

router.addMovie = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var movie = new Movie();

    movie.title = req.body.title;
    movie.year = req.body.year;
    movie.upvotes = req.body.upvotes;

    movie.save(function(err) {
        if (err)
            res.json({ message: 'Movie NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Movie Successfully Added!', data: movie });
    });
}

router.deleteMovie = (req, res) => {

    Movie.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Movie NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Movie Successfully Deleted!'});
    });
}

module.exports = router;