const express = require('express');
const { addTestData } = require('../controllers/testController');

const router = express.Router();

router.post('/addTestData', addTestData);

module.exports = router;