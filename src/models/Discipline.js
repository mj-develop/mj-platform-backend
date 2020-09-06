const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const DisciplineSchema = new mongoose.Schema({
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
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }
});

DisciplineSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Discipline', DisciplineSchema);