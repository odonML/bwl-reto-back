const mongoose = require('mongoose');
const authSchema = require('./auth.model');

authSchema.static={
    create: function (data,cb){
        const user = new this(data);
        user.save(cb);
    },
    login: function (query, cb){
        this.find(query, cb);
    },
    getUsers: function (query, cb){
        this.find(query, cb);
    },
    putUser: function (query, cb){
        this.findByIdAndUpdate(query, cb, c);
    }
}

const authModel = mongoose.model('Users', authSchema);
module.exports = authModel;