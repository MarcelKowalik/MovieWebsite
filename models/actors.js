let mongoose = require('mongoose');

/*
Actors schema (Not Complete)
 */
let ActorSchema = new mongoose.Schema({
        name: {type: String, default: ""},
        dob: {type: String, default: ""},
        nationality: {type: String, default: ""},

    },
    { collection: 'actorsdb' });

module.exports = mongoose.model('Actor', ActorSchema);



