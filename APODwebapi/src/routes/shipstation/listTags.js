const express = require("express");
const router = express.Router();
const listTagsController = require('../../controllers/shipstation/listTags');

router.get('/', listTagsController.getAll);

module.exports = router;