const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    course: {
        type: String,
    },
    serie: {
        type: String
    },
    education_type: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

ClassSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Class', ClassSchema);