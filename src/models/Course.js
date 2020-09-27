const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name.is.empty'],
    },
    description: {
        type: String,
        required: [true, 'description.is.empty'],
    },
    teacher: {
        _id: { 
            type: Schema.Types.ObjectId,
            ref: 'teachers',
            required: [true, 'teacher.id.is.empty']
        },
        name: {
            type: String,
            required: [true, 'teacher.name.is.empty']
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }
});

CourseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Course', CourseSchema);