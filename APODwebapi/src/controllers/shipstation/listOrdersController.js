const mongoose = require('mongoose');
var request = require('request');
var authKey = require('./Authkey.js');
const ListOrders = require('../../models/shipstation/listOrders');

exports.getAll = (req, res) => {
    ListOrders.find({}).exec()
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

exports.getOrderItems = (req, res) => {
    let orderId = req.params.orderId;
    console.log("OrderID",orderId);
    ListOrders.find({orderId:orderId}).exec()
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

exports.getOrderByClosedstatus = (req, res) => {
    ListOrders.find({ $or: [ { orderStatus: "shipped" },{ orderStatus: "cancelled" },{ orderStatus: "closed" } ] }).exec() 
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

exports.getOrderByActivestatus = (req, res) => {
    
    ListOrders.find({ orderStatus: { $nin: [ "shipped","cancelled","closed"] } }).exec() 
    // ListOrders.find({ $or: [ { orderStatus: "shipped" },{ orderStatus: "cancelled" },{ orderStatus: "closed" } ] }).exec() 
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
    console.log("List Orders");
    var options = {
        'method': 'GET',
        'url': 'https://ssapi.shipstation.com/orders',
        'headers': {
            'Host': 'ssapi.shipstation.com',
            'Authorization': authKey
        }
    };

    request(options, async function (error, response) {
        let dbData, shipData, count = 0;
        if (response && response.body) {
            let shippingData = JSON.parse(response.body);
            shipData = shippingData.orders;
            console.log("shipData", shipData);
            if (shipData && shipData.length > 0) {
                dbData = await ListOrders.find({});
                if (!dbData || dbData.length == 0) {
                    ListOrders.insertMany(shipData, function (err, result) {
                        if (result) {
                            res.json({
                                'code': 200,
                                'success': true,
                                'output': 'ListOrders created successfully'
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
                            let orderId = shipdata.orderId;
                            await ListOrders.find({ orderId: orderId }).exec()
                                .then(doc => {
                                    if (doc && doc.length == 0) {
                                        ListOrders.insertMany(shipdata);
                                    }
                                })
                        }
                    });
                    if (count == shipData.length) {
                        res.json({
                            'code': 201,
                            'success': true,
                            'msg': 'ListOrders created successfully'
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