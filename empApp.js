const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const _ = require('lodash');

const { ObjectId} = require('mongodb');

const mongoose = require('./config/db');

const { Employee } = require('./models/employee');

const app = express();
const port = 3000;


//middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
//app.param is also middleware
// app.param('id',(req,res,next) => {
//     if(!ObjectId.isValid(req.params.id)) {
//             res.send({
//                 notice:'Invalid id'
//             });
//         }
//     next();
    
// });

//route handlers

app.listen(port,() => {
    console.log('listening to port ',port);
})