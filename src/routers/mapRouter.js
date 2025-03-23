const express = require('express');
const { createMap, updateMap, getMapById } = require('../controllers/mapController');

const router = express.Router();

router.post('/create', createMap);
router.put('/update', updateMap);
router.get('/get', getMapById);

module.exports = router;