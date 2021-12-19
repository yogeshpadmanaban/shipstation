const mongoose = require('mongoose');
var request = require('request');
const ListPackages = require('../../models/shipstation/listPackages');


exports.getAll = (req, res) => {
    console.log("ListPackages", req.body.carrierCode);
    let carrierCode = req.body.carrierCode;
    var options = {
        'method': 'GET',
        'url': `https://ssapi.shipstation.com/carriers/listpackages?carrierCode=`+carrierCode,
        'headers': {
            'Host': 'ssapi.shipstation.com',
            'Authorization': 'Basic MDg1ODQxOWQxOGVmNGNlYzhiODkxMDk5NTIzZDFkMTU6MDBmZjg3ZTYyODBlNDdmNzhhMTBkZDdiMjczY2JjNDQ='
        }
    };

    request(options, async function (error, response) {
        let dbData, shipData, count = 0;

        if (response && response.body) {
            shipData = JSON.parse(response.body);
            if (shipData && shipData.length > 0) {
                dbData = await ListPackages.find({});
                if (!dbData || dbData.length == 0) {
                    ListPackages.insertMany(shipData, function (err, result) {
                        if (result) {
                            ListPackages.find({}).exec()
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
                            await ListPackages.find({ code: code }).exec()
                                .then(doc => {
                                    if (doc && doc.length == 0) {
                                        ListPackages.insertMany(shipdata);
                                    }
                                })
                        }
                    });
                    if (count == shipData.length) {
                        ListPackages.find({}).exec()
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