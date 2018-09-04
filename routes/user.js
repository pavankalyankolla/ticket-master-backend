const express = require('express');
const _ = require('lodash');
const { User } = require('../models/user');
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
        res.send(400).send(err);
    })
});

module.exports = {
    usersRouter : router
}