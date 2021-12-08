const express = require("express");
const router = express.Router();

const productController = require('../controllers/productController')

router.get('/', productController.getAll);

router.post('/', productController.createNew);

router.get('/:id', productController.getById);

router.post('/:id', productController.updateById);

router.delete('/:id', productController.deleteById);

router.get('/template/:id', productController.getAllByTemplateId);

module.exports = router;