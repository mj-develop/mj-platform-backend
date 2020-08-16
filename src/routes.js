const express = require('express');
const routes = express.Router();
const authMiddleware = require('./middleware/auth');
const AuthController = require('./controllers/authController');
const StudentController = require('./controllers/studentController');
const CourseController = require('./controllers/courseController');
const ClassController = require('./controllers/classController');
const DisciplineController = require('./controllers/disciplineController');
const TeacherController = require('./controllers/teacherController');

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

routes.get("/teachers", TeacherController.index);
routes.get("/teachers/:id", TeacherController.show);
routes.post("/teachers", TeacherController.create);
routes.put("/teachers/:id", TeacherController.update);
routes.delete("/teachers/:id", TeacherController.destroy);

routes.get("/courses", CourseController.index);
routes.get("/courses/:id", CourseController.show);
routes.post("/courses", CourseController.create);
routes.put("/courses/:id", CourseController.update);
routes.delete("/courses/:id", CourseController.destroy);

routes.get("/classes", ClassController.index);
routes.get("/classes/:id", ClassController.show);
routes.post("/classes", ClassController.create);
routes.put("/classes/:id", ClassController.update);
routes.delete("/classes/:id", ClassController.destroy);

routes.get("/disciplines", DisciplineController.index);
routes.get("/disciplines/:id", DisciplineController.show);
routes.post("/disciplines", DisciplineController.create);
routes.put("/disciplines/:id", DisciplineController.update);
routes.delete("/disciplines/:id", DisciplineController.destroy);

module.exports = routes;