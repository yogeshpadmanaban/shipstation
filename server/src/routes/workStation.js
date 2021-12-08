const express = require("express");
const router = express.Router();

const workStationController = require('../controllers/workStationController')

router.get('/', workStationController.getAll);

router.post('/', workStationController.createNew);

router.get('/:id', workStationController.getById);

router.post('/:id', workStationController.updateById);

router.delete('/:id', workStationController.deleteById);

module.exports = router;