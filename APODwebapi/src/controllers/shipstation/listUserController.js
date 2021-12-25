const mongoose = require('mongoose');
var request = require('request');
var authKey = require('./Authkey.js');
const ListUsers = require('../../models/shipstation/listUser');

exports.getAll = (req, res) => {
    console.log("List Users", authKey);
    var options = {
        'method': 'GET',
        'url': `https://ssapi.shipstation.com/users?showInactive=false`,
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
                dbData = await ListUsers.find({});
                if (!dbData || dbData.length == 0) {
                    ListUsers.insertMany(shipData, function (err, result) {
                        if (result) {
                            ListUsers.find({}).exec()
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
                            let userId = shipdata.userId;
                            await ListUsers.find({ userId: userId }).exec()
                                .then(doc => {
                                    if (doc && doc.length == 0) {
                                        ListUsers.insertMany(shipdata);
                                    }
                                })
                        }
                    });
                    if (count == shipData.length) {
                        ListUsers.find({}).exec()
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