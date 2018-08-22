const express = require('express');
const { Ticket } = require('../models/ticket');
const router = express.Router();
const _ = require('lodash');


// router.get('/',(req,res) => {
//     res.send({
//         msg : 'Welcome to ticket master'
//     });
// });

router.get('/',(req,res) => {
    Ticket.find()
    .then((tickets) => {
        res.send(tickets);
    })
    .catch((err) => {
        res.send(err);
    }) 
});

router.get('/status/open',(req,res) => {
    Ticket.openTickets() .then((tickets) => {
        res.send(tickets);
    })
});

router.get('/status/completed',(req,res) => {
    Ticket.completedTickets() .then((tickets) => {
        res.send(tickets);
    })
})

router.post('/',(req,res) => {
    // let body = req.body;
    // strong parameter check
     
    let body = _.pick(req.body,['name','department','message','priority']);

    let ticket = new Ticket(body);
    ticket.save().then((ticket) => {
        res.send(ticket);
    }).catch((err) => {
        res.send(err);
    })
});

router.get('/:id',(req,res) => {
    let id = req.params.id;

    Ticket.findById(id).then((ticket) => {
       if(ticket){
        res.send(ticket);
       } else {
           res.send({
               notice : 'Ticket not found'
           })
       }
       
    }) .catch((err) => {
        res.send(err);
    })
}); 

router.put('/:id',(req,res) => {
    let id = req.params.id;

    let body = _.pick(req.body,['name','department','message','priority','status']);
    Ticket.findByIdAndUpdate(id,{ $set: body },{ new : true})
    .then((ticket) => {
        if(ticket) {
            res.send({
                ticket,
                notice : 'Successfully updated the record'
            });
        }   else{
            res.send({
                notice : 'Ticket not found'
            })
        }
       
    })
    .catch((err) => {
        res.send(err);
    })
});

router.delete('/:id',(req,res) => {
    let id = req.params.id;

    Ticket.findByIdAndRemove(id) 
    .then((ticket) => {
      if(ticket){
        res.send({
            ticket,
            notice:'sucessfully deleted'
        })
      } 
      else{
          res.send({
              notice : 'Ticket not found'
          });
      }
    })
    .catch((err) => {
        res.send(err);  
    })
})

module.exports = {
   ticketRouter : router
}