// services/encounterService.js
const crypto = require('crypto');
const { db } = require('../config/firebase');
const { validateEncounter } = require('../models/encounterModel');

async function createEncounter(data) {
    // Generate unique ID and add to the encounter data
    const uuid = crypto.randomUUID();
    data.id = uuid;

    // Validate data using the model
    const validData = validateEncounter(data);

    // Create encounter in the DB
    await db.collection('encounters').doc(uuid).set(validData);

    // Return created encounter info (e.g., the id)
    return { id: uuid, ...validData };
}

async function getEncounterById(id) {
    const encounterDoc = await db.collection('encounters').doc(id).get();
    if (!encounterDoc.exists) return null;
    return encounterDoc.data();
}

async function updateEncounter(id, updateData) {
    const encounterRef = db.collection('encounters').doc(id);
    const docSnapshot = await encounterRef.get();
    if (!docSnapshot.exists) {
       throw new Error('Encounter not found');
    }
    await encounterRef.update(updateData);
}

module.exports = { createEncounter, getEncounterById, updateEncounter };
