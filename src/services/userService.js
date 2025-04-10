const { admin } = require('../config/firebase');
const axios = require('axios');

async function registerUser({ email, password, username }) {
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: username
        });
        console.log('Successfully created new user:', userRecord.uid);
        return { id: userRecord.uid, username, email };
    } catch (err) {
        console.error('Firebase createUser failed:', err);
        throw err;
    }
}


const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

async function signInUser(data) {
    const { email, password } = data;
    try {
        const singInResult = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        );
        const idToken = singInResult.data.idToken;

        const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn: 60 * 60 * 24 * 5 * 1000 });

        return { sessionCookie, idToken };
    } catch (error) {
        console.error('Error signing in user:', error);
        throw new Error('Error signing in user');
    }
}

async function signOutUser(data) {
    const { sessionCookie } = data;

    if (!sessionCookie) {
        throw new Error('Missing session cookie');
    }

    const decoded = await admin
        .auth()
        .verifySessionCookie(sessionCookie, true);

    await admin.auth().revokeRefreshTokens(decoded.uid);

    return decoded.uid;
}

async function deleteUser(data) {
    const { sessionCookie } = data;

    if (!sessionCookie) {
        throw new Error('Missing session cookie');
    }

    const decoded = await admin
        .auth()
        .verifySessionCookie(sessionCookie, true);

    try {
        await admin.auth().deleteUser(decoded.uid);
        console.log('Successfully deleted user:', decoded.uid);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

module.exports = { registerUser, signInUser, signOutUser, deleteUser };