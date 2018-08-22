const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    department: {
        type :String,
        required :true
    },
    priority:{
        type : String,
        required : true
    },
    message:{
        type: String,
        required :true
    },
    status : {
        type :String,
        default : 'open'
    },
    createdAt : {
        type : Date,
        default : Date.now
    }

});

//don't defined static or instance methods an arrow functions

ticketSchema.statics.openTickets = function(){
    return this.find({status : 'open'});
}

ticketSchema.statics.completedTickets = function(){
    return this.find({status : 'completed'})
}

const Ticket = mongoose.model('Tickets',ticketSchema);

module.exports = {
    Ticket
}   