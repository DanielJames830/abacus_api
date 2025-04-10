const crypto = require('crypto');
const { db } = require('../config/firebase');
const { validateEntity } = require('../models/entityModel');

async function createEntity(data) {
    // Generate unique ID and add to the entity data
    const uuid = crypto.randomUUID();
    data.id = uuid;

    // Validate data using the model
    const validData = validateEntity(data);

    // Create entity in the DB
    await db.collection('encounters').doc(data.encounterId).collection('entities').doc(uuid).set(validData);

    // Return created entity info (e.g., the id)
    return { id: uuid, ...validData };
}

async function updateEntity(entityId, updateData) {
    const entityRef = db.collection('encounters').doc(updateData.encounterId).collection('entities').doc(entityId);
    const docSnapshot = await entityRef.get();
    if (!docSnapshot.exists) {
        throw new Error('Entity not found');
    }
    await entityRef.update(updateData);
}

async function getEntityById(encounterId, entityId) {
    const entityDoc = await db.collection('encounters').doc(encounterId).collection('entities').doc(entityId).get();
    if (!entityDoc.exists) return null;
    return entityDoc.data();
}

module.exports = { createEntity, updateEntity, getEntityById };