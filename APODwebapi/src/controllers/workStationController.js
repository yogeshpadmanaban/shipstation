const mongoose = require('mongoose');
const WorkStation = require('../models/workStation'); 

exports.getAll = (req, res) => {
    WorkStation.find({})
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
    WorkStation.findOne({}).sort({'_id':-1}).exec()
    .then(doc => {
        let id = doc ? doc._id + 1 : 1;
        let workStation = new WorkStation({
            _id: id,
            name: req.body.name,
            html: req.body.html
        });

        workStation.save((err, data) => {
            if(err) {
                res.json({ 
                    'code': 400,
                    'success' : false,
                    'msg': 'error in creating workStation'
                });
            };
            res.json({ 
                'code': 201,
                'success' : true,
                'msg': 'workStation created successfully'
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
    WorkStation.findById(id)
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
    WorkStation.findByIdAndUpdate(id,updateObj)
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
    WorkStation.findByIdAndRemove(id)
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error : err});
    })
}
