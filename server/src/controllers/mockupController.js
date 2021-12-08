const mongoose = require('mongoose');
const Mockup = require('../models/mockup'); 
const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');
const uploadFile = require('../awss3');

exports.getAll = (req, res) => {
    Mockup.find({})
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
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
        if (error) {
            return res.status(500).send(error);
        };
        try {
            const path = files.file[0].path;
            const buffer = fs.readFileSync(path);
            const type = await fileType.fromBuffer(buffer);
            const fileName = `mockupFolder/${Date.now().toString()}`;
            const data = await uploadFile(buffer, fileName, type);
            Mockup.findOne({}).sort({'_id':-1}).exec()
            .then(doc => {
                let id = doc ? doc._id + 1 : 1;
                let mockup = new Mockup({
                    _id: id,
                    designSubmissionId: fields.designSubmissionId[0],
                    productId: fields.productId[0],
                    userId: fields.userId[0],
                    filePath: data.Location,
                    imageDescription: fields.imageDescription[0],
                    dateCreated: Date.now(),
                });
            
                mockup.save((err, data) => {
                    if(err) {
                        res.json({ 
                            'code': 400,
                            'success' : false,
                            'msg': 'error in creating mockup'
                        });
                    }
                    else{
                        res.json({ 
                            'code': 201,
                            'success' : true,
                            'msg': 'mockup created successfully'
                        });
                    } 
                })
            }).catch(err => {
                res.json({ 
                    'code': 500,
                    'success' : false,
                    'msg': err
                });
            })
        } catch (err) {
            return res.status(500).send(err);
        }
    });
}

exports.getById = (req, res) => {
    const id = req.params.id;
    Mockup.findById(id)
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
    Mockup.findByIdAndUpdate(id,updateObj)
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
    Mockup.findByIdAndRemove(id)
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
    Mockup.find({designSubmissionId : designSubmissionId})
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
    Mockup.find({userAccountId : userAccountId})
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}

exports.getAllByImageDesc = (req, res) => {
    const imageDescription = req.params.keyword;
    Mockup.find({imageDescription : imageDescription})
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
    Mockup.find({productId : productId})
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}
