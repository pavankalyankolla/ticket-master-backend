const express = require('express');
const _ = require('lodash');
const { User } = require('../models/user');
const { authenticateUser } = require('../middleware/authentication');
const router = express.Router();


router.get('/',(req,res) => {
    User.find().then((user) => {
        res.send(user);
    }) .catch((err) => {
        res.send(err);
    })
});

//signup route
router.post('/',(req,res) => {
    let body = _.pick(req.body,['username','email','password','mobile']);
    let user = new User(body);

    user.save().then((user) => {
        return user.generateToken()
    }) .then((token) => {
        res.header('x-auth',token).send(user);
    }) .catch((err) => {
        res.status(400).send(err);
    })
});

//login route
router.post('/login',(req,res) => {
    let body = _.pick(req.body,['email','password']);
    User.findByEmailAndPassword(body.email,body.password)
    .then((user) => {
        return user.generateToken();
    }) .then((token) => {
        res.header('x-auth',token).send()
    })
    .catch((err) => {
        res.send(err);
    });
});


//logout
router.delete('/logout',authenticateUser,(req,res) => {
    req.locals.user.deleteToken(req.locals.token).then(() => {
        res.send();
    }) .catch((err) => {
        res.send(err);
    });
});

//user profile
 //between functions if you want to pass along data,you can attach it to the req object
router.get('/profile',authenticateUser,(req,res) => {
    res.send(req.locals.user);
})


module.exports = {
    usersRouter : router
}