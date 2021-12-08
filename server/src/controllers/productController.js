const mongoose = require('mongoose');
const Product = require('../models/product'); 

exports.getAll = (req, res) => {
    Product.find({})
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
    Product.findOne({}).sort({'_id':-1}).exec()
    .then(doc => {
        let id = doc ? doc._id + 1 : 1;
        let product = new Product({
            _id: id,
            productFamily: req.body.productFamily,
            productName: req.body.productName,
            sizeList: req.body.sizeList,
            mockupList: req.body.mockupList,
            productCode: req.body.productCode,
            variantCode: req.body.variantCode,
            variantName: req.body.variantName,
            variantValue: req.body.variantValue,
            displayName: req.body.displayName,
            templateId: req.body.templateId,
            defaultPrice: req.body.defaultPrice,
            weight: req.body.weight,
            cost: req.body.cost
        });

        product.save((err, data) => {
            if(err) {
                res.json({ 
                    'code': 400,
                    'success' : false,
                    'msg': 'error in creating product'
                });
            };
            res.json({ 
                'code': 201,
                'success' : true,
                'msg': 'product created successfully'
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
    Product.findById(id)
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
    Product.findByIdAndUpdate(id,updateObj)
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
    Product.findByIdAndRemove(id)
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}


exports.getAllByTemplateId = (req, res) => {
    const templateId = req.params.id;
    Product.find({templateId : templateId})
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}