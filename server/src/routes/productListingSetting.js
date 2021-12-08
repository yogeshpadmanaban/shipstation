const express = require("express");
const router = express.Router();

const productListingSetting = require('../controllers/productListingSettingController')

router.get('/', productListingSetting.getAll);

router.post('/', productListingSetting.createNew);

router.get('/:id', productListingSetting.getById);

router.post('/:id', productListingSetting.updateById);

router.delete('/:id', productListingSetting.deleteById);

router.get('/useraccount/:id', productListingSetting.getAllByUserAccountId);

module.exports = router;