const express = require('express');
const { createEntity, updateEntity, getEntityById } = require('../controllers/entityController');

const router = express.Router();

router.post('/create', createEntity);
router.put('/update', updateEntity);
router.get('/get', getEntityById);

module.exports = router;