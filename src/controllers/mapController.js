const mapService = require('../services/mapService');

async function createMap(req, res) { 
    try {
        const result = await mapService.createMap(req.body);
        res.status(200).send('Map created successfully: ' + result.id);
    } catch (error) {
        console.error('Error creating map:', error);
        res.status(500).send('Error creating map');
    }
}

async function getMapById(req, res) {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).send('Missing map ID');
        }

        const map = await mapService.getMapById(id);
        if (!map) {
            return res.status(404).send('Map not found');
        }

        res.status(200).json(map);
    } catch (error) {
        console.error('Error retrieving map:', error);
        res.status(500).send('Error retrieving map');
    }
}

async function updateMap(req, res) {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).send('Missing map ID');
        }

        await mapService.updateMap(id, req.body);
        res.status(200).send('Map updated successfully');
    } catch (error) {
        console.error('Error updating map:', error);
        res.status(500).send('Error updating map');
    }
}

module.exports = { createMap, getMapById, updateMap };
