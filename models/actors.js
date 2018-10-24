let mongoose = require('mongoose');

let ActorSchema = new mongoose.Schema({
        id: Number,
        name: String,
        dob: Number
    },
    { collection: 'actorsdb' });

module.exports = mongoose.model('Actors', ActorSchema);

const actors = [
    {id: 1000000, name: 'Adam Sandler', dob: 1968},
    {id: 1000001, name: '', dob: 2007},
    {id: 1000002, name: '', dob: 2015}
];

module.exports = actors;

