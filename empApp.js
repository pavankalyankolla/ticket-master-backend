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

app.get('/',(req,res) => {
    res.send({
        msg:'Welcome to Employee details'
    })
});

app.get('/employees',(req,res) => {
    Employee.find().then(employee => res.send(employee)).catch(err => res.send(err));
});

app.post('/employees',(req,res) => {
    let body = _.pick(req.body,['name','email','department','salary','ageWhileJoining','address','hobbies','luckyNumbers','mobileNumbers']);
    let employee = new Employee(req.body);
    employee.save().then(employee => res.send(employee)).catch(err => res.send(err));
});

app.get('/employees/list',(req,res) => {
    let params = req.query;
    let orderBy = params.order == "ASC" ? 1 : -1 ;
    Employee.find().sort({params:orderBy}).then((employees) => {
        res.send(employees);
      })
  });
  
app.get('/employees/:id',(req,res) => {
    Employee.findById(req.params.id).then((employee) => {
        if(employee){
            res.send(employee);
        } else{
            res.send({
                notice:'employee not found'
            });
        }
    }).catch(err => res.send(err));
});


// employees/id/mobileNumbers

app.get('/employees/:id/mobile_numbers',(req,res) => {
    let id= req.params.id;
    Employee.findById(id).select(['id','name','mobileNumbers']) .then((employee) => {
        if(employee) {
            res.send(employee);
        }
        res.send({
            notice : 'Employee not found'
        })
    }) .catch((err) => {
        res.send(err);
    });
});

// adding mobile number to employee
app.post('/employees/:id/mobile_numbers',(req,res) => {
    let id = req.params.id;
    let body = req.body;
    Employee.findById(id).then((employee) => {
        if(employee){
            employee.mobileNumbers.push(body);
            return employee.save()
        }
        res.send({
            notice : 'Employee not found'
        });
    }) .then((employee) => {
        let newMobile = employee.mobileNumbers[employee.mobileNumbers.length - 1];
        res.send({
            newMobile,
            notice : 'Successfully added'
        });
    }) .catch((err) => {
        res.send(err);
    })
});

//updating
app.put('/employees/:id/mobile_numbers/:mobile_id',(req,res) => {
    let id = req.params.id;
    let mobileId = req.params.mobile_id;
    let body = _.pick(req.body,['numType','mobileNumber']);
    Employee.findById(id).then((employee) => {
        if(employee) {
            let mobileDetail = employee.mobileNumbers.id(mobileId);
            mobileDetail.numType = body.numType ? body.numType : mobileDetail.numType;
            mobileDetail.mobileNumber = body.mobileNumber ? body.mobileNumber : mobileDetail.mobileNumber;
            return employee.save();
        }
        res.send({
            notice : 'Employee not found'
        })
    })  .then((employee) => {
        res.send({
            mobileNumber : employee.mobileNumbers.id(mobileId),
            notice : 'Suceesfully updated'
        })
    }) .catch((err) => {
        res.send(err);
    })
})

// deleting
app.delete('/employees/:id/mobile_numbers/:mobile_id',(req,res) => {
    let id = req.params.id;
    let mobileId = req.params.mobile_id;
    Employee.findById(id).then((employee) => {
        if(employee) {
            employee.mobileNumbers.remove(mobileId);
            return employee.save()
        }
        res.send({
            notice : 'Employee not found'
        });
    }) .then((employee) => {
        res.send({
            notice : 'successfully removed'
        });
    }) .catch((err) => {
        res.send(err);
    })
})



app.put('/employees/:id',(req,res) => {
    Employee.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true}).then((employee) => {
        if(employee){
            res.send({
                employee,
                notice:'sucessfully updated'
            });
        } else{
            res.send({
                notice:'employee not found'
            });
        }
    }).catch(err => res.send(err));
});

app.delete('/employees/:id',(req,res) => {
    Employee.findByIdAndRemove(req.params.id).then((employee) => {
        if(employee){
            res.send({
                employee,
                notice:'sucessfully deleted'
            });
        } else{
            res.send({
                notice:'employee not found'
            });
        }
    }).catch(err => res.send(err));
});



app.listen(port,() => {
    console.log('listening to port ',port);
})