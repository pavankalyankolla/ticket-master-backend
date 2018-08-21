const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { ObjectId } = require('mongodb');

const morgan = require('morgan');
const mongoose = require('./config/db');

const { Ticket } = require('./models/ticket');

const { ticketRouter } = require('./routes/ticket');
const { employeeRouter } = require('./routes/employee');
 
const app = express();
const port = 3000;
//Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/tickets',ticketRouter);
app.use('/employees',employeeRouter);

app.param('id',(req,res,next) => {
 let id = req.params.id;
    if(!ObjectId.isValid(id)){
            res.send({
                notice : 'Object id is invalid'
            })
        }
        next();
})

// app.use('/tickets/id',(req,res,next) => {
//     let id = req.params.id;
//        if(!ObjectId.isValid(id)){
//                res.send({
//                    notice : 'Object id is invalid'
//                })
//            }
//            next();
//    })

//custom logger middleware
// app.use((req,res,next) => {
//     console.log(`${req.method} - ${req.url} - ${req.ip} - ${new Date()}`);
// });

//Route Handler
// app.Method(Path,Handler)




app.listen(port,() => {
    console.log('listening port',port);
})