const express = require('express');
const { Ticket } = require('../models/ticket');
const { authenticateUser } = require('../middleware/authentication');
const router = express.Router();
const _ = require('lodash');


// router.get('/',(req,res) => {
//     res.send({
//         msg : 'Welcome to ticket master'
//     });
// });

router.get('/',authenticateUser,(req,res) => {
    Ticket.find()
    .then((tickets) => {
        res.send(tickets);
    })
    .catch((err) => {
        res.send(err);
    }) 
});

router.get('/status/open',authenticateUser,(req,res) => {
    Ticket.openTickets() .then((tickets) => {
        res.send(tickets);
    });
});

router.get('/status/completed',authenticateUser,(req,res) => {
    Ticket.completedTickets() .then((tickets) => {
        res.send(tickets);
    });
});

router.get('/priority/:value',authenticateUser,(req,res) => {
    let value = req.params.value;
    Ticket.findByPriority(value).then((tickets) => {
        res.send(tickets);
    });
});


router.post('/',authenticateUser,(req,res) => {
    // let body = req.body;
    // strong parameter check
     
    let body = _.pick(req.body,['name','department','message','priority','employee']);

    let ticket = new Ticket(body);
    ticket.save().then((ticket) => {
        res.send(ticket);
    }).catch((err) => {
        res.send(err);
    })
});

router.get('/:id',authenticateUser,(req,res) => {
    let id = req.params.id;

    Ticket.findById(id).populate('employee').then((ticket) => {
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

router.put('/:id',authenticateUser,(req,res) => {
    let id = req.params.id;

    let body = _.pick(req.body,['name','department','message','priority','status','employee']);
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

router.delete('/:id',authenticateUser,(req,res) => {
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