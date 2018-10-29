let mongoose = require('mongoose');

/*
Users Schema
 */
let UsersSchema = mongoose.Schema(
    {
        name: {type: String, default: ''},
        password: {type: String, default: ''},
    },
    {
        collection: 'usersdb'
    }
);

module.exports = mongoose.model('User', UsersSchema);