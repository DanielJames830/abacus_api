const entityService = require('../services/entityService');

async function createEntity(req, res) {
    try {
        const result = await entityService.createEntity(req.body);
        res.status(200).send('Entity created successfully: ' + result.id);
    } catch (error) {
        console.error('Error creating entity:', error);
        res.status(500).send('Error creating entity');
    }
}

async function getEntityById(req, res) {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).send('Missing entity ID');
        }

        const entity = await entityService.getEntityById(id);
        if (!entity) {
            return res.status(404).send('Entity not found');
        }

        res.status(200).json(entity);
    } catch (error) {
        console.error('Error retrieving entity:', error);
        res.status(500).send('Error retrieving entity');
    }
}

async function updateEntity(req, res) {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).send('Missing entity ID');
        }

        await entityService.updateEntity(id, req.body);
        res.status(200).send('Entity updated successfully');
    } catch (error) {
        console.error('Error updating entity:', error);
        res.status(500).send('Error updating entity');
    }
}

module.exports = { createEntity, updateEntity, getEntityById };

