const { User } = require('../models/user');
//authentication middleware
let authenticateUser = (req,res,next) => {
    let token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        //between functions if you want to pass along data,you can attach it to the req object
        // req.user = user;
        // req.token = token

        // to make these data available,not only in the next function,but to make it available even in the views we use
        req.locals = {
            user,
            token
        }
        next();
    }).catch((err) => {
        res.status(401).send(err);
    })
}

module.exports = {
    authenticateUser
}