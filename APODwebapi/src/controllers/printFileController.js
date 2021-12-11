const mongoose = require('mongoose');
const PrintFile = require('../models/printFile'); 

exports.getAll = (req, res) => {
    PrintFile.find({})
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
    PrintFile.findOne({}).sort({'_id':-1}).exec()
    .then(doc => {
        let id = doc ? doc._id + 1 : 1;
        let printFile = new PrintFile({
            _id: id,
            name: req.body.name,
            unit: req.body.unit,
            quantity: req.body.quantity
        });

        printFile.save((err, data) => {
            if(err) {
                res.json({ 
                    'code': 400,
                    'success' : false,
                    'msg': 'error in creating printfile'
                });
            };
            res.json({ 
                'code': 201,
                'success' : true,
                'msg': 'printfile created successfully'
            });
        })
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
    PrintFile.findById(id)
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error: err});
    })
}

exports.updateById = (req, res) => {
    const id = req.params.id;
    let updateObj = req.body.updateObj
    PrintFile.findByIdAndUpdate(id,updateObj)
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
    PrintFile.findByIdAndRemove(id)
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}

exports.getAllByDesignSubmissionId = (req, res) => {
    const designSubmissionId = req.params.id;
    PrintFile.find({designSubmissionId : designSubmissionId})
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}

exports.getAllByUserAccountId = (req, res) => {
    const userAccountId = req.params.id;
    PrintFile.find({userAccountId : userAccountId})
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}

exports.getAllByProductId = (req, res) => {
    const productId = req.params.id;
    PrintFile.find({productId : productId})
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}

