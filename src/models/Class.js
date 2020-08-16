const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const Student = require('../models/Student');

const utils = require('../util/utils');

const ClassSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name.is.empty'],
    },
    course: {
        _id: { 
            type: Schema.Types.ObjectId, 
            ref: 'courses',
            required: [true, 'course.id.is.empty'],
            validate: [utils.validateCourseId, 'course.not.found']
        },
        name: {
            type: String,
            required: [true, 'course.name.is.empty']
        },
    },
    serie: {
        type: String
    },
    education_type: {
        type: String
    },
    students: [{
        _id: { 
            type: Schema.Types.ObjectId, 
            ref: 'students',
            validate: {
                validator: async function(id) {
                    return await Student.findById(id);
                },
                message: 'student.not.found'
            },

        },
        name: String
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

ClassSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Class', ClassSchema);