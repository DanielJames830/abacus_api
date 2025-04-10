const express = require('express');
const { registerUser, signInUser, signOutUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/signin', signInUser);
router.post('/signout', signOutUser);
router.delete('/delete', deleteUser);

module.exports = router;