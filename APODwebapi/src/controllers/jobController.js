const mongoose = require('mongoose');
const Job = require('../models/job'); 

exports.getAll = (req, res) => {
    Job.find({})
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
    Job.findOne({}).sort({'_id':-1}).exec()
    .then(doc => {
        let id = doc ? doc._id + 1 : 1;
        let job = new Job({
            _id: id,
            shipStationOrderId: req.body.shipStationOrderId,
            designSubmissionId: req.body.designSubmissionId,
            productId: req.body.productId,
            printFileId: req.body.printFileId,
            status: req.body.status,
            workStationId: req.body.workStationId,
            quantity: req.body.quantity,
            dateCreated: Date.now(),
        });

        job.save((err, data) => {
            if(err) {
                res.json({ 
                    'code': 400,
                    'success' : false,
                    'msg': 'error in creating job'
                });
            };
            res.json({ 
                'code': 201,
                'success' : true,
                'msg': 'job created successfully'
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
    Job.findById(id)
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
    Job.findByIdAndUpdate(id,updateObj)
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
    Job.findByIdAndRemove(id)
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}

exports.getAllByStatus = (req, res) => {
    const status = req.params.status;
    Job.find({status : status})
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}

exports.getAllByShipStationOrderId = (req, res) => {
    const shipStationOrderId = req.params.id;
    Job.find({shipStationOrderId : shipStationOrderId})
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}

exports.getAllByWorkStation = (req, res) => {
    const workStationId = req.params.workStationId;
    Job.find({workStationId : workStationId})
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}

