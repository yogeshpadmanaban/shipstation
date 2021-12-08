const express = require("express");
const router = express.Router();

const mockupController = require('../controllers/mockupController')

router.get('/', mockupController.getAll);

router.post('/', mockupController.createNew);

router.get('/:id', mockupController.getById);

router.post('/:id', mockupController.updateById);

router.delete('/:id', mockupController.deleteById);

router.get('/designSubmission/:id', mockupController.getAllByDesignSubmissionId);

router.get('/product/:id', mockupController.getAllByProductId);

router.get('/imageDescription/:keyword', mockupController.getAllByImageDesc);

router.get('/useraccount/:id', mockupController.getAllByUserAccountId);

module.exports = router;