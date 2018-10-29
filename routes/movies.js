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

/*
Finds all Movies in the database
 */
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Movie.find(function(err, movies) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(movies,null,5));
    });
}

/*
Finds a specific Movie by its id.
 */
router.findOne = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Movie.find({ "_id" : req.params.id },function(err, movie) {
        if (err)
            res.json({ message: 'Movie NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(movie,null,5));
    });
}

/*
Function to get the total votes
 */
function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function(obj) { totalVotes += obj.upvotes; });
    return totalVotes;
}

/*
Finds the total votes
 */
router.findTotalVotes = (req, res) => {

    Movie.find(function(err, movies) {
        if (err)
            res.send(err);
        else
            res.json({ totalvotes : getTotalVotes(movies) });
    });
}

/*
Adds a movie.
 */
router.addMovie = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    var movie = new Movie();

    movie.title = req.body.title;
    movie.genre = req.body.genre;
    movie.year = req.body.year;
    movie.duration = req.body.duration;
    movie.rating = req.body.rating;
    movie.upvotes = req.body.upvotes;

    movie.save(function(err) {
        if (err)
            res.json({ message: 'Movie NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Movie Successfully Added!', data: movie });
    });
}
/*
Deletes a movie by id.
 */
router.deleteMovie = (req, res) => {

    Movie.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Movie NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Movie Successfully Deleted!'});
    });
}
/*
Adds a review to Movie (Haven't completed the update of rating after a review is added.)
 */
router.addMovieReview = (req, res) =>{
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    //inputting into the array in movie
    Movie.findByIdAndUpdate(req.params.id,
        {$push:
                {review:
                        {username : req.body.username, rated : req.body.rated, comment : req.body.comment}}
                },
        function(err,Movie) {
            if (err)
                return res.send(JSON.stringify(err));
            else {
                //method to update the rating of a Movie after a review has been added.   //Not yet complete
                Movie.save(function (err) {
                    if (err)
                        return res.send(JSON.stringify(err));
                    else
                        return res.send(JSON.stringify(Movie));
                })
            }
        });
};

router.findMovieByTitle = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Movie.find({"title": req.params.title}, (function (err, movie) {
        if (err)
            res.send(err);
        res.send((JSON.stringify(movie, null, 5)))
    }))
};

router.findMovieByGenre = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Movie.find({"genre": req.params.genre}, (function (err, movie) {
        if (err)
            res.send(err);
        res.send((JSON.stringify(movie, null, 5)))
    }))
};

router.incrementUpvotes = (req, res) => {

    Movie.findById(req.params.id, function(err,movie) {
        if (err)
            res.json({ message: 'Movie NOT Found!', errmsg : err } );
        else {
            movie.upvotes += 1;
            movie.save(function (err) {
                if (err)
                    res.json({ message: 'Movie NOT UpVoted!', errmsg : err } );
                else
                    res.json({ message: 'Movie Successfully Upvoted!', data: movie });
            });
        }
    });
}

router.incrementDownvotes = (req, res) => {

    Movie.findById(req.params.id, function(err,movie) {
        if (err)
            res.json({ message: 'Movie NOT Found!', errmsg : err } );
        else {
            movie.upvotes -= 1;
            movie.save(function (err) {
                if (err)
                    res.json({ message: 'Movie NOT DownVoted!', errmsg : err } );
                else
                    res.json({ message: 'Movie Successfully DownVoted!', data: movie });
            });
        }
    });
}
/*
Deletes a review.
 */
router.deleteReview = (req,res) =>{
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    Movie.findById(req.params.id, function (err, movie) {
        if(err)
            return res.send(JSON.stringify(err));
        else{
            let done = false;
            //Loop to check for correct id
            for(let i =0; i < movie.review.length; i +=1){
                //Accesses to the review array in the movie model
                if(movie.review[i]._id.equals(req.params.reviewId)){
                    //delete review if id is correct
                    movie.review.splice(i, 1);
                    movie.save(function (err) {
                        if(err)
                            return res.send(JSON.stringify(err));
                        else
                            return res.send(JSON.stringify(movie,null,5))
                    });
                    done = true;
                    break;
                }
            }
        }
    });
};

/*
Update Genre of the Movie
 */
router.changeGenre = (req, res) =>{
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    Movie.findByIdAndUpdate(req.params.id, {genre : req.body.updatedGenre}, function (err, movie) {
        if (err)
            return res.send(err);
        else
            return res.send(JSON.stringify(movie,null,5))
    });
};

//Not Complete
/*
function updateRating(array, newRating) {
}
*/

module.exports = router;