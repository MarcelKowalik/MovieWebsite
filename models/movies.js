let mongoose = require('mongoose');

/*
Movie schema
 */
let MovieSchema = new mongoose.Schema({
        title: {type: String, default: ""},
        genre: {type: String, default: ""},
        year: {type: Number, default: 0},
        duration: {type: Number, default: "0"},
        rating: {type: Number, default: 0},
        upvotes: {type: Number, default: 0},
        review: [{
            username: {type: String, default: "Anonymous"},
            rated: {type: Number, default: "0"},
            comment: {type: String, default: ""},
        }]
    },
    { collection: 'moviesdb' });


module.exports = mongoose.model('Movie', MovieSchema);
