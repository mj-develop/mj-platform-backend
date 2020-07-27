const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

CourseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Course', CourseSchema);