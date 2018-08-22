const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String
    },
    department : {
        type : String,
        enum : ['Technical','Sales','Hr'],
        required : true
    },
    salary : {
        type : Number
    },
    ageWhileJoining : {
        type : Number,
        min : 18,
        max : 65
    },
    address : {
        street: {
            type : String
        },
        city : {
            type : String
        },
        pinCode : {
            type : Number
        }
    },
    hobbies : [String],//['singing','drawing','reading']
    luckyNumbers : [Number], //[7,13,19]
    mobileNumbers : [{
        numType : {
            type : String
        },
        mobileNumber: {
            type : String
        }
    }] 
});

//static methods
// employeeSchema.statics.findByDepartment = function(dept) {

// }


//instance methods
employeeSchema.methods.shortInfo = function() {
    return {
        _id : this.id,
        name : this.name,
        email : this.email,
        numberCount : this.mobileNumbers.length 
    };
};


const Employee = mongoose.model('employee',employeeSchema);

module.exports = {
    Employee
}