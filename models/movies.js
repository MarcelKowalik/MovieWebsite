let mongoose = require('mongoose');

let ActorSchema = new mongoose.Schema({
        id: Number,
        name: String,
        dob: Number
    },
    { collection: 'moviesdb' });

module.exports = mongoose.model('Movies', ActorSchema);

const movies = [
    {title: 'Shrek', year: 2018, upvotes: 1},
    {title: 'Mission Impossible', year: 2007, upvotes: 2},
    { title: 'IT', year: 2015, upvotes: 1}
];

module.exports = movies;