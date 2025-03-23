const crypto = require('crypto');
const { db } = require('../config/firebase');
const { validateMap } = require('../models/mapModel');

async function createMap(data) {
    // Generate unique ID and add to the map data
    const uuid = crypto.randomUUID();
    data.id = uuid;

    // Validate data using the model
    const validData = validateMap(data);

    // Create map in the DB
    await db.collection('maps').doc(uuid).set(validData);

    // Return created map info (e.g., the id)
    return { id: uuid, ...validData };
}

async function getMapById(id) {
    const mapDoc = await db.collection('maps').doc(id).get();
    if (!mapDoc.exists) return null;
    return mapDoc.data();
}

async function updateMap(id, updateData) {
    const mapRef = db.collection('maps').doc(id);
    const docSnapshot = await mapRef.get();
    if (!docSnapshot.exists) {
        throw new Error('Map not found');
    }
    await mapRef.update(updateData);
}

module.exports = { createMap, getMapById, updateMap };