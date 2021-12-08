const express = require("express");
const router = express.Router();

const templateController = require('../controllers/templateController')

router.get('/', templateController.getAll);

router.post('/', templateController.createNew);

router.get('/:id', templateController.getById);

router.post('/:id', templateController.updateById);

router.delete('/:id', templateController.deleteById);

module.exports = router;