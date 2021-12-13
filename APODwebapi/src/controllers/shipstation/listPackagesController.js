const mongoose = require('mongoose');
var request = require('request');
const ListPackages = require('../../models/shipstation/listPackages');

// exports.getAll = (req, res) => {
//     // let auth = ("0858419d18ef4cec8b891099523d1d15" + ":" + "00ff87e6280e47f78a10dd7b273cbc44").toString("base64");
//     // console.log("auth", auth);
//     var options = {
//         'method': 'GET',
//         'url': 'https://ssapi.shipstation.com/carriers',
//         'headers': {
//             'Host': 'ssapi.shipstation.com',
//             'Authorization': 'Basic MDg1ODQxOWQxOGVmNGNlYzhiODkxMDk5NTIzZDFkMTU6MDBmZjg3ZTYyODBlNDdmNzhhMTBkZDdiMjczY2JjNDQ='
//         }
//     };
//     request(options, function (error, response) {
//         if (response && response.body) {

//             let data = JSON.parse(response.body);

//             if(data && data.length > 0) {
//                 for(let i = 0; i < data.length; i++) {
//                     let singleData = data[i];
//                     ListPackages.findOne({}).sort({'_id':-1}).exec()
//                     .then(doc => {
//                         let id = doc ? doc._id + 1 : 1;
//                         let listPackages = new ListPackages({
//                             _id: id,
//                             carrierCode: singleData.carrierCode,
//                             code: singleData.code,
//                             name: singleData.name,
//                             domestic: singleData.domestic,
//                             international: singleData.international,
//                             dateCreated: Date.now(),
//                         });
//                         listPackages.save((err, data) => {
//                             if(err) {
//                                 res.json({ 
//                                     'code': 400,
//                                     'success' : false,
//                                     'msg': 'error in creating list Carrieris'
//                                 });
//                             }
//                             else{
//                                 res.json({ 
//                                     'code': 201,
//                                     'success' : true,
//                                     'msg': 'List Carriers created successfully'
//                                 });
//                             }
//                         })
//                     }).catch(err => {
//                         res.json({ 
//                             'code': 500,
//                             'success' : false,
//                             'msg': err
//                         });
//                     })
//                 }
//             } else {
//                 // Here return
//                 ListPackages.find({}).exec().then(doc => {
//                     res.json({
//                         'code' : 200,
//                         'success': true,
//                         'output': doc
//                     });
//                 })
//                 .catch(err => {
//                     res.json({
//                         'code' : 500,
//                         'success': false,
//                         'error': err
//                     });
//                 })
//             }
//         } else if (error) {
//             res.json({
//                 'code': 500,
//                 'success': false,
//                 'error': error
//             });
//         }

//     });

//     // ListPackages.find({}).exec().then(doc => {
//     //     res.json({
//     //         'code' : 200,
//     //         'success': true,
//     //         'output': doc
//     //     });
//     // })
//     // .catch(err => {
//     //     res.json({
//     //         'code' : 500,
//     //         'success': false,
//     //         'error': err
//     //     });
//     // })


// }


exports.createNew = (req, res) => {
    // let auth = ("0858419d18ef4cec8b891099523d1d15" + ":" + "00ff87e6280e47f78a10dd7b273cbc44").toString("base64");
    // console.log("auth", auth);
    var options = {
        'method': 'GET',
        'url': 'https://ssapi.shipstation.com/carriers/listpackages?carrierCode=stamps_com',
        'headers': {
            'Host': 'ssapi.shipstation.com',
            'Authorization': 'Basic MDg1ODQxOWQxOGVmNGNlYzhiODkxMDk5NTIzZDFkMTU6MDBmZjg3ZTYyODBlNDdmNzhhMTBkZDdiMjczY2JjNDQ='
        }
    };
    
    request(options, function (error, response) {
        if (response && response.body) {
            let data = JSON.parse(response.body);
            if (data && data.length > 0) {
                ListPackages.insertMany(data, function (err, result) {
                    if (result) {
                        res.json({
                            'code': 200,
                            'success': true,
                            'output': result
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
        } else if (error) {
            res.json({
                'code': 500,
                'success': false,
                'error': error
            });
        }
    })
}