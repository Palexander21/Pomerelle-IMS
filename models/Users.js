const mongoose = require('mongoose');
let bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
        trim: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    startDate: {
        type: String,
        trim: true,
    },
    position: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        // minlength: 8,
        // maxlength: 20,
        trim: true,
    },
}, {autoCreate: true});

UserSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});
module.exports = mongoose.model('Users', UserSchema);
