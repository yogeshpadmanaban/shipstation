const express = require("express");
const router = express.Router();

const printFileController = require('../controllers/printFileController')

router.get('/', printFileController.getAll);

router.post('/', printFileController.createNew);

router.get('/:id', printFileController.getById);

router.post('/:id', printFileController.updateById);

router.delete('/:id', printFileController.deleteById);

router.get('/designSubmission/:id', printFileController.getAllByDesignSubmissionId);

router.get('/product/:id', printFileController.getAllByProductId);

router.get('/userAccount/:id', printFileController.getAllByUserAccountId);

module.exports = router;