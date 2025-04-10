const encounterService = require('../services/encounterService');

async function createEncounter(req, res) {
    try {
        const result = await encounterService.createEncounter(req.body);
        res.status(200).send('Encounter created successfully: ' + result.id);
    } catch (error) {
        console.error('Error creating encounter:', error);
        res.status(500).send('Error creating encounter');
    }
}

async function getEncounterById(req, res) {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).send('Missing encounter ID');
        }

        const encounter = await encounterService.getEncounterById(id);
        if (!encounter) {
            return res.status(404).send('Encounter not found');
        }

        const entities = await encounterService.getEntitiesByEncounterId(id);
        encounter.entities = entities;
        res.status(200).json(encounter);

    } catch (error) {
        console.error('Error retrieving encounter:', error);
        res.status(500).send('Error retrieving encounter');
    }
}

async function updateEncounter(req, res) {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).send('Missing encounter ID');
        }

        await encounterService.updateEncounter(id, req.body);
        res.status(200).send('Encounter updated successfully');
    } catch (error) {
        console.error('Error updating encounter:', error);
        res.status(500).send('Error updating encounter');
    }
}

module.exports = { createEncounter, updateEncounter, getEncounterById };
