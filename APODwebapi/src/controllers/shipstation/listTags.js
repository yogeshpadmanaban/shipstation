const mongoose = require('mongoose');
var request = require('request');
const ListTags = require('../../models/shipstation/listTags');

exports.getAll = (req, res) => {
    console.log("List Tags");
    var options = {
        'method': 'GET',
        'url': 'https://ssapi.shipstation.com/accounts/listtags',
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
                dbData = await ListTags.find({});
                if (!dbData || dbData.length == 0) {
                    ListTags.insertMany(shipData, function (err, result) {
                        if (result) {
                            ListTags.find({}).exec()
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
                            await ListTags.find({ code: code }).exec()
                                .then(doc => {
                                    if (doc && doc.length == 0) {
                                        ListTags.insertMany(shipdata);
                                    }
                                })
                        }
                    });
                    if (count == shipData.length) {
                        ListTags.find({}).exec()
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
            else {
                res.json({
                    'code': 400,
                    'success': true,
                    'output': []
                });
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