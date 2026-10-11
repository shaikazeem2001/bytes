const express = require('express');
const authrouter = express.Router();
const controller = require('../controllers/user.controller');
const verifyToken = require('../middleware/auth.middleware');

// Public routes
authrouter.post('/register', controller.register);
authrouter.post('/login', controller.login);
authrouter.post('/refresh', controller.refreshTokenHandler);
authrouter.post('/logout', controller.logout);

// Protected routes (require valid Access Token)
authrouter.get('/getusers', verifyToken, controller.getusers);
authrouter.put('/updateuser/:id', verifyToken, controller.updateusers);
authrouter.delete('/deleteuser/:id', verifyToken, controller.deleteuser);

module.exports = authrouter;