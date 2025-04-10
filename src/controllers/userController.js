const userService = require('../services/userService');

async function registerUser(req, res) {
    try {
        const result = await userService.registerUser(req.body);
        res.status(200).send('User created successfully: ' + result.id);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
}

async function signInUser(req, res) {
    try {
        const result = await userService.signInUser(req.body);
        res.cookie('__session', result.sessionCookie, {
            maxAge: 60 * 60 * 24 * 5 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: 'Lax',
        });
        res.json({
            idToken: result.idToken,
            sessionCookie: result.sessionCookie,
        });
    } catch (error) {
        console.error('Error signing in user:', error);
        res.status(500).send('Error signing in user');
    }
}

async function signOutUser(req, res) {
    try {
        const result = await userService.signOutUser(req.body);
        res.clearCookie('__session');

        res.status(200).send(result.message);
    } catch (error) {
        console.error('Error signing out user:', error);
        res.status(500).send('Error signing out user');
    }
}

async function deleteUser(req, res) {
    try {
        await userService.deleteUser(req.body);
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
}

module.exports = { registerUser, signInUser, signOutUser, deleteUser };