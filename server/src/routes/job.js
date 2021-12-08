const express = require("express");
const router = express.Router();

const jobController = require('../controllers/jobController')

router.get('/', jobController.getAll);

router.post('/', jobController.createNew);

router.get('/:id', jobController.getById);

router.post('/:id', jobController.updateById);

router.delete('/:id', jobController.deleteById);

router.get('/status/:id', jobController.getAllByStatus);

router.get('/shipStationOrder/:id', jobController.getAllByShipStationOrderId);

router.get('/workStation/:id', jobController.getAllByWorkStation);

module.exports = router;