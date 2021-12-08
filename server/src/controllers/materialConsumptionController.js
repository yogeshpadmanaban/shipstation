const mongoose = require('mongoose');
const MaterialConsumption = require('../models/materialConsumption'); 

exports.getAll = (req, res) => {
    MaterialConsumption.find({})
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
    MaterialConsumption.findOne({}).sort({'_id':-1}).exec()
    .then(doc => {
        let id = doc ? doc._id + 1 : 1;
        let materialConsumption = new MaterialConsumption({
            _id: id,
            productId: req.body.productId,
            materialId: req.body.materialId,
            quantityConsumed: req.body.quantityConsumed
        });

        materialConsumption.save((err, data) => {
            if(err) {
                res.json({ 
                    'code': 400,
                    'success' : false,
                    'msg': 'error in creating material consumption'
                });
            };
            res.json({ 
                'code': 201,
                'success' : true,
                'msg': 'material consumption created successfully'
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
    MaterialConsumption.findById(id)
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
    Materialconsumption.findByIdAndUpdate(id,updateObj)
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
    MaterialConsumption.findByIdAndRemove(id)
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
    MaterialConsumption.find({productId : productId})
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}