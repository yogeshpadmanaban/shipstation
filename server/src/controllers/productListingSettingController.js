const mongoose = require('mongoose');
const ProductListingSetting = require('../models/productListingSetting');

exports.getAll = (req, res) => {
    ProductListingSetting.find({})
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
    ProductListingSetting.findOne({}).sort({'_id':-1}).exec()
    .then(doc => {
        let id = doc ? doc._id + 1 : 1;
        let productListingSetting = new ProductListingSetting({
            _id: id,
            productId: req.body.productId,
            userAccountId: req.body.userAccountId,
            price: req.body.price,
            productTagsList: req.body.productTagsList,
            productHtml: req.body.productHtml
        });

        productListingSetting.save((err, data) => {
            if(err) {
                res.json({ 
                    'code': 400,
                    'success' : false,
                    'msg': 'error in creating product listing setting'
                });
            };
            res.json({ 
                'code': 201,
                'success' : true,
                'msg': 'product listing setting created successfully'
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
    ProductListingSetting.findById(id)
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
    ProductListingSetting.findByIdAndUpdate(id,updateObj)
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
    ProductListingSetting.findByIdAndRemove(id)
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
    ProductListingSetting.find({userAccountId : userAccountId})
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