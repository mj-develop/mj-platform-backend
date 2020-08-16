const mongoose = require('mongoose');
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
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

CourseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Course', CourseSchema);