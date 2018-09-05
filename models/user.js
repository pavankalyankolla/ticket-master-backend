const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : {
        type : String,
        trim : true,
        required : true,
        unique : true
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
                    return validator.isNumeric(value) && validator.isLength(value,{min : 10, max : 10});
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
});

UserSchema.statics.findByToken = function(token){
    let User = this;
    let tokenData;
    try {
        tokenData = jwt.verify(token,'supersecret');
    } catch(e) {
        // return new Promise((resolve,reject) => {
        //     reject(e);
        // })
        return Promise.reject(e);
    }
    return User.findOne({
        '_id' : tokenData._id,
        'tokens.token' : token
    })
}

UserSchema.methods.toJSON = function(){
    return _.pick(this,['_id','username','mobile','email']); //used for all requests
}

UserSchema.methods.generateToken = function(){
    let tokenData = {
        _id : this._id
    };
    let generatedTokenInfo = {
        access : 'auth',
        token : jwt.sign(tokenData,'supersecret')
    }
    this.tokens.push(generatedTokenInfo);
    return this.save().then((user) => {
        return generatedTokenInfo.token;
    });
}

const User = mongoose.model('User',UserSchema);

module.exports = {
    User
}