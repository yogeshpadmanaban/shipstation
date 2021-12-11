const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const UserAccount = require('../models/userAccount'); 

const saltRounds = 10;

exports.getAll = (req, res) => {
    UserAccount.find({})
    .exec()
    .then(doc => {
        res.json({
            'code' : 200,
            'success': true,
            'output': doc
        });
    })
    .catch(err => {
        res.json({
            'code' : 500,
            'success': false,
            'error': err
        });
    })
}

exports.createNew = (req, res) => {
    UserAccount.findOne({}).sort({'_id':-1}).exec()
    .then(doc => {
        let id = doc ? doc._id + 1 : 1;
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            let userAccount = new UserAccount({
                _id: id,
                userName: req.body.userName,
                passwordHash: hash,
                emailAddress: req.body.emailAddress,
                roles: req.body.roles,
                dateCreated: Date.now()
            });
        
            userAccount.save((err, data) => {
                if(err) {
                    res.json({ 
                        'code': 400,
                        'success' : false,
                        'msg': err
                    });
                }
                else{
                    res.json({ 
                        'code': 201,
                        'success' : true,
                        'msg': 'user created successfully'
                    });
                } 
            })
        });
    }).catch(err => {
        res.json({ 
            'code': 500,
            'success' : false,
            'msg': err
        });
    })
}

exports.getById = (req, res) => {
    const id = req.params.id;
    UserAccount.findById(id)
    .exec()
    .then(doc => {
        res.json({
            'code' : 200,
            'success': true,
            'output': doc
        });
    })
    .catch(err => {
        res.json({
            'code' : 500,
            'success': false,
            'error': err
        });
    })
}

exports.updateById = (req, res) => {
    const id = req.params.id;
    let updateObj = req.body.updateObj
    UserAccount.findByIdAndUpdate(id,updateObj)
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}

exports.deleteById = (req, res) => {
    const id = req.params.id;
    UserAccount.findByIdAndRemove(id)
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}

exports.resetPassword = (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const id = req.params.id;
        UserAccount.findByIdAndUpdate(id,{passwordHash : hash})
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({error : err});
        })
    })
}

exports.authenticateUser = (req, res) => {
    UserAccount.find({
        $or: [
          { 'userName': req.params.value },
          { 'emailAddress': req.params.value }
        ]
    }).exec()
    .then(doc => {
        let hash = doc[0].passwordHash;
        bcrypt.compare(req.params.password, hash, function(err, result) {
            if(result){
                res.json({code:200, success: true, obj: doc[0]})
            }else{
                res.json({code:404, success: false, msg: "user not authenticated"});
            } 
        });
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}