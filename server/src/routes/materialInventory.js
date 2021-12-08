const express = require("express");
const router = express.Router();

const materialInventory = require('../controllers/materialInventoryController')

router.get('/', materialInventory.getAll);

router.post('/', materialInventory.createNew);

router.get('/:id', materialInventory.getById);

router.post('/:id', materialInventory.updateById);

router.delete('/:id', materialInventory.deleteById);

module.exports = router;