const mongoose = require('mongoose');
const MaterialInventory = require('../models/materialInventory'); 

exports.getAll = (req, res) => {
    MaterialInventory.find({})
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
    MaterialInventory.findOne({}).sort({'_id':-1}).exec()
    .then(doc => {
        let id = doc ? doc._id + 1 : 1;
        let materialInventory = new MaterialInventory({
            _id: id,
            name: req.body.name,
            unit: req.body.unit,
            quantity: req.body.quantity
        });

        materialInventory.save((err, data) => {
            if(err) {
                res.json({ 
                    'code': 400,
                    'success' : false,
                    'msg': 'error in creating material inventory'
                });
            };
            res.json({ 
                'code': 201,
                'success' : true,
                'msg': 'material inventory created successfully'
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
    MaterialInventory.findById(id)
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
    MaterialInventory.findByIdAndUpdate(id,updateObj)
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
    MaterialInventory.findByIdAndRemove(id)
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}
