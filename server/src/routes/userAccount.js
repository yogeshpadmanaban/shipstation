const express = require("express");
const router = express.Router();

const userAccountController = require('../controllers/userAccountController')

router.get('/', userAccountController.getAll);

router.post('/', userAccountController.createNew);

router.get('/:id', userAccountController.getById);

router.post('/:id', userAccountController.updateById);

router.delete('/:id', userAccountController.deleteById);

router.post('/pwreset/:id', userAccountController.resetPassword);

router.get('/:value/:password', userAccountController.authenticateUser);

module.exports = router;