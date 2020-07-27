const express = require('express');
const routes = express.Router();
const authMiddleware = require('./middleware/auth');
const AuthController = require('./controllers/authController');
const StudentController = require('./controllers/studentController');
const CourseController = require('./controllers/courseController');

routes.post("/register", AuthController.register);
routes.post("/login", AuthController.login);
routes.get("/profile", authMiddleware, AuthController.profile);
routes.post("/forgot_password", AuthController.forgot_password);
routes.post("/reset_password", AuthController.reset_password);

routes.get("/students", StudentController.index);
routes.get("/students/:id", StudentController.show);
routes.post("/students", StudentController.create);
routes.put("/students/:id", StudentController.update);
routes.delete("/students/:id", StudentController.destroy);

routes.get("/courses", CourseController.index);
routes.get("/courses/:id", CourseController.show);
routes.post("/courses", CourseController.create);
routes.put("/courses/:id", CourseController.update);
routes.delete("/courses/:id", CourseController.destroy);

module.exports = routes;