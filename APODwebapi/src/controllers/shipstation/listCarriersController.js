const mongoose = require('mongoose');
var request = require('request');
const ListCarriers = require('../../models/shipstation/listCarriers');

exports.getAll = (req, res) => {
    ListCarriers.find({}).exec()
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

// CRON
exports.createNew = (req, res) => {
    // let auth = ("0858419d18ef4cec8b891099523d1d15" + ":" + "00ff87e6280e47f78a10dd7b273cbc44").toString("base64");
    // console.log("auth", auth);
    var options = {
        'method': 'GET',
        'url': 'https://ssapi.shipstation.com/carriers',
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
                dbData = await ListCarriers.find({});
                if (!dbData || dbData.length == 0) {
                    ListCarriers.insertMany(shipData, function (err, result) {
                        if (result) {
                            res.json({
                                'code': 200,
                                'success': true,
                                'output': 'ListCarriers created successfully'
                            });
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
                            await ListCarriers.find({ code: code }).exec()
                                .then(doc => {
                                    if (doc && doc.length == 0) {
                                        ListCarriers.insertMany(shipdata);
                                    }
                                })
                        }
                    });
                    if (count == shipData.length) {
                        res.json({
                            'code': 201,
                            'success': true,
                            'msg': 'ListCarriers created successfully'
                        });
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