const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('./config/db');

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


app.listen(port,() => {
    console.log('listening port',port);
})