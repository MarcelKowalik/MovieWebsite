let mongoose = require('mongoose');

let ActorSchema = new mongoose.Schema({
        nationality: String,
        name: String,
        dob: String
    },
    { collection: 'actorsdb' });

module.exports = mongoose.model('Actor', ActorSchema);
//module.exports = actors;


