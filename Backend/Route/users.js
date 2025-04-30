const express = require('express');
const {
    getUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../Controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

router.route('/')
    .get(getUsers);

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router; 