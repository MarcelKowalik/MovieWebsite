let mongoose = require('mongoose');

let MovieSchema = new mongoose.Schema({
        title: String,
        year: Number,
        upvotes: {type: Number, default: 0}
    },
    { collection: 'moviesdb' });

module.exports = mongoose.model('Movie', MovieSchema);
//module.exports = movies;