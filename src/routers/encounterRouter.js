const express = require('express');
const { createEncounter, updateEncounter, getEncounterById } = require('../controllers/encounterController');

const router = express.Router();

router.post('/create', createEncounter);
router.put('/update', updateEncounter);
router.get('/get', getEncounterById);

module.exports = router;
