const express = require("express");
const router = express.Router();

const listOrdersController = require('../../controllers/shipstation/listOrdersController');

router.post('/', listOrdersController.createNew);
router.get('/', listOrdersController.getAll);
router.get('/activestatus', listOrdersController.getOrderByActivestatus);
router.get('/closedstatus', listOrdersController.getOrderByClosedstatus);
router.get('/:orderId', listOrdersController.getOrderItems);


module.exports = router;