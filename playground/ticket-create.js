const mongoose = require('../config/db');
const { Ticket } = require('../models/ticket');

//instance method

// let ticket = {
//     name :'Ramesh',
//     department : 'Technical',
//     priority : 'Medium',
//     message : 'Net is down for 3 days'
// }

// let newTicket = new Ticket(ticket);
// newTicket.save().then((ticket) => {
//     console.log(ticket);
// })

//class method/ static method

Ticket.create({
        name :'Ramesh',
        department : 'Technical',
        priority : 'Medium',
        message : 'Net is down for 3 days'
}) .then((ticket) => {
    console.log(ticket);
}) .catch((err) => {
    console.log(err);
})