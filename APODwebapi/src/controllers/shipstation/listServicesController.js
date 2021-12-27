const mongoose = require('mongoose');
var request = require('request');
var authKey = require('./Authkey.js');
const ListServices = require('../../models/shipstation/listServices');

exports.getAll = (req, res) => {
    // console.log("ListServices", req.params.carrierCode, authKey);
    let carrierCode = req.params.carrierCode;
    var options = {
        'method': 'GET',
        'url': `https://ssapi.shipstation.com/carriers/listservices?carrierCode=`+carrierCode,
        'headers': {
            'Host': 'ssapi.shipstation.com',
            'Authorization': authKey
        }
    };

    request(options, async function (error, response) {
        let dbData, shipData, count = 0;

        if (response && response.body) {
            shipData = JSON.parse(response.body);
            if (shipData && shipData.length > 0) {
                dbData = await ListServices.find({});
                if (!dbData || dbData.length == 0) {
                    ListServices.insertMany(shipData, function (err, result) {
                        if (result) {
                            ListServices.find({carrierCode: carrierCode}).exec()
                            .then(doc => {
                                res.json({
                                    'code': 200,
                                    'success': true,
                                    'output': doc
                                });
                            })
                            .catch(err => {
                                res.json({
                                    'code': 500,
                                    'success': false,
                                    'error': err
                                });
                            })
                        } else if (err) {
                            res.json({
                                'code': 500,
                                'success': false,
                                'error': err
                            });
                        }
                    });
                }

                else if (dbData && dbData.length > 0) {
                    await shipData.forEach(async (shipdata, index) => {
                        count = count + 1;
                        if (shipdata) {
                            let code = shipdata.code;
                            await ListServices.find({ code: code }).exec()
                                .then(doc => {
                                    if (doc && doc.length == 0) {
                                        ListServices.insertMany(shipdata);
                                    }
                                })
                        }
                    });
                    if (count == shipData.length) {
                        setTimeout(() => {
                            ListServices.find({carrierCode: carrierCode }).exec()
                            .then(doc => {
                                res.json({
                                    'code': 200,
                                    'success': true,
                                    'output': doc
                                });
                            })
                            .catch(err => {
                                res.json({
                                    'code': 500,
                                    'success': false,
                                    'error': err
                                });
                            })
                        }, 2000);
                       
                    }
                }
            }
        } else if (error) {
            res.json({
                'code': 500,
                'success': false,
                'error': error
            });
        }
    })
}