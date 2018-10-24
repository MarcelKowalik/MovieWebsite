let actors = require('../models/actors');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose')
let Actor = require('../models/actors');

mongoose.connect('mongodb://localhost:27017/actorsdb');
let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
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


module.exports = router;
/*
let mongoose = require('mongoose');

...

mongoose.connect('mongodb://localhost:27017/actorsdb');

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

*/