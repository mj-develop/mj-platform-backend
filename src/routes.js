const express = require('express');
const routes = express.Router();
const AuthController = require('./controllers/authController');

routes.post("/register", AuthController.register);

module.exports = routes;