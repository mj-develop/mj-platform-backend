const Course = require('../models/Course');
const Student = require('../models/Student');

module.exports = {
    validateEmail(email) {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
    },

    async validateCourseId(course_id) {
        const course = await Course.findById(course_id);
        return course;
    },

    async validateStudentId(student_id) {
        const student = await Student.findById(student_id);
        return student;
    },

    errors(err) {
        const fields = Object.keys(err.errors).map((field_name) => {
            return field_name; 
        });
    
        const errors = fields.map((key) => {
            if (key == "birth") 
                return "birth.malformatted"
    
            if (key == "gender")
                return "gender.can.be.m.or.f"

            if (key == "course._id")
                return "course.id.malformatted"  

            if (key.substr(0, 8) == 'students' && key.substr(-2) == 'id')
                return "students.id.malformatteds"
            
            return err.errors[key] ? err.errors[key].properties.message : field_name; 
        });
        
        return errors;
    }
}
