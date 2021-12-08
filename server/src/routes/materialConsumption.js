const express = require("express");
const router = express.Router();

const materialConsumption = require('../controllers/materialConsumptionController')

router.get('/', materialConsumption.getAll);

router.post('/', materialConsumption.createNew);

router.get('/:id', materialConsumption.getById);

router.post('/:id', materialConsumption.updateById);

router.delete('/:id', materialConsumption.deleteById);

router.get('/product/:id', materialConsumption.getAllByProductId);

module.exports = router;