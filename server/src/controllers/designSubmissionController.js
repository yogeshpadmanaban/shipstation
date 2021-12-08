const mongoose = require('mongoose');
const DesignSubmission = require('../models/designSubmission'); 
const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');
const AWS = require('aws-sdk');

exports.getAll = (req, res) => {
    DesignSubmission.find({})
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

let uploadFile = (buffer, name, type) => {
    AWS.config.update({
        accessKeyId: "AKIAVTHGOICUWRHG4D7K",
        secretAccessKey: "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",
    });
    const s3 = new AWS.S3();
    const params = {
      ACL: 'public-read',
      Body: buffer,
      Bucket: "myapoddev",
      ContentType: type.mime,
      Key: `${name}.${type.ext}`,
    };
    return s3.upload(params).promise();
};

exports.createNew = (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
        if (error) {
            return res.status(500).send(error);
        };
        try {
            console.log(fields);
            const path = files.file[0].path;
            const buffer = fs.readFileSync(path);
            const type = await fileType.fromBuffer(buffer);
            const fileName = `bucketFolder/${Date.now().toString()}`;
            const data = await uploadFile(buffer, fileName, type);
            console.log(data);
            DesignSubmission.findOne({}).sort({'_id':-1}).exec()
            .then(doc => {
                let id = doc ? doc._id + 1 : 1;
                let designSubmission = new DesignSubmission({
                    _id: id,
                    userAccountId: fields.userAccountId[0],
                    title: fields.title[0],
                    templateId: fields.templateId[0],
                    productIdArray: fields.productId,
                    designCode: fields.designCode[0],
                    status: "new",
                    tagsList: "",
                    html: "",
                    designFilepath: data.Location,
                    logoFilepath: data.Location,
                    dateCreated: Date.now(),
                });
                designSubmission.save((err, data) => {
                    if(err) {
                        res.json({ 
                            'code': 400,
                            'success' : false,
                            'msg': 'error in creating design submission'
                        });
                    }
                    else{
                        res.json({ 
                            'code': 201,
                            'success' : true,
                            'msg': 'design submission created successfully'
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
    DesignSubmission.findById(id)
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
    DesignSubmission.findByIdAndUpdate(id,updateObj)
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
    DesignSubmission.findByIdAndRemove(id)
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
    DesignSubmission.find({userAccountId : userAccountId})
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

exports.getAllByProductId = (req, res) => {
    const productId = req.params.id;
    DesignSubmission.find({productId : productId})
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
    DesignSubmission.find({templateId : templateId})
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}
