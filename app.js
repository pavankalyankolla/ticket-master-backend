const express = require('express');
const bodyParser = require('body-parser');
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
    Ticket.findById(id).then((ticket) => {
        res.send(ticket);
    }) .catch((err) => {
        res.send(err);
    })
}); 


app.listen(port,() => {
    console.log('listening port',port);
})