const express = require('express');
const bodyParser = require('body-parser');

const { ObjectId } = require('mongodb');

const morgan = require('morgan');
const mongoose = require('./config/db');

const { Ticket } = require('./models/ticket');

const app = express();
const port = 3000;
//Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));

//custom logger middleware
// app.use((req,res,next) => {
//     console.log(`${req.method} - ${req.url} - ${req.ip} - ${new Date()}`);
// });

//Route Handler
// app.Method(Path,Handler)

app.get('/',(req,res) => {
    res.send({
        msg : 'Welcome to ticket master'
    });
});

app.get('/tickets',(req,res) => {
    Ticket.find()
    .then((tickets) => {
        res.send(tickets);
    })
    .catch((err) => {
        res.send(err);
    }) 
});

app.post('/tickets',(req,res) => {
    let body = req.body;
    let ticket = new Ticket(body);
    ticket.save().then((ticket) => {
        res.send(ticket);
    }).catch((err) => {
        res.send(err);
    })
});

app.get('/tickets/:id',(req,res) => {
    let id =req.params.id;

    if(!ObjectId.isValid(id)){
        res.send({
            notice : 'invalid object id'
        });
    }

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

app.put('/tickets/:id',(req,res) => {
    let id = req.params.id;
    let body = req.body;

    if(!ObjectId.isValid(id)){
        res.send({
            notice : 'invalid object id'
        });
    }

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

app.delete('/tickets/:id',(req,res) => {
    let id = req.params.id;

    if(!ObjectId.isValid(id)){
        res.send({
            notice : 'invalid object id'
        });
    }
    
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


app.listen(port,() => {
    console.log('listening port',port);
})