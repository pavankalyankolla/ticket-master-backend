const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    code : {
        type : String
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

ticketSchema.statics.findByPriority = function(priority){
    return this.find({priority : priority})
}

//creating ticket code
ticketSchema.pre('save',function(next){
    if(!this.code){
        this.code = 'DCT - ' + Math.ceil(Math.random() * 1000);
    }
    next();
})



const Ticket = mongoose.model('Tickets',ticketSchema);

module.exports = {
    Ticket
}   