let Actor = require('../models/actors');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

var mongodbUri ='mongodb://marcel.kowalik:bwj6nnvv@ds213688.mlab.com:13688/movieswebsite';
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

    Actor.find(function(err, actors) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(actors,null,5));
    });
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Actor.find({ "_id" : req.params.id },function(err, actor) {
        if (err)
            res.json({ message: 'Actor NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(actor,null,5));
    });
}

router.addActor = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var actor = new Actor();

    actor.nationality = req.body.nationality;
    actor.name = req.body.name;
    actor.dob = req.body.dob;

    actor.save(function(err) {
        if (err)
            res.json({ message: 'Actor NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Actor Successfully Added!', data: actor });
    });
}

router.deleteActor = (req, res) => {

    Actor.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Actor NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Actor Successfully Deleted!'});
    });
}


module.exports = router;
