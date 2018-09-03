const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : {
        type : String,
        minlength : 6,
        trim : true,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate : {
            validator : function(value) {
                return validator.isEmail(value)
            },
            message : 'Invalid email format'
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
        maxlength : 128
    },
    mobile : {
        type :String,
        required : true,
        validate : {
            validator : function(value) {
                    return validator.isNumeric(value) && validator.isLength(10);
                },
                message : 'Should be 10 digits'
        }
    },
    tokens : [{
        access : {
            type :String,
            required : true
        },
        token : {
            type : String,
            required : true
        }
    }]
})

const User = mongoose.model('User',UserSchema);

module.exports = {
    User
}