const express = require("express");
const router = express.Router();

const designSubmissionController = require('../controllers/designSubmissionController')

router.get('/', designSubmissionController.getAll);

router.post('/', designSubmissionController.createNew);

router.get('/:id', designSubmissionController.getById);

router.post('/:id', designSubmissionController.updateById);

router.delete('/:id', designSubmissionController.deleteById);

router.get('/useraccount/:id', designSubmissionController.getAllByUserAccountId);

router.get('/product/:id ', designSubmissionController.getAllByProductId);

router.get('/template/:id', designSubmissionController.getAllByTemplateId);

module.exports = router;