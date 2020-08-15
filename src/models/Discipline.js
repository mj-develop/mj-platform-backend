const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const DisciplineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

DisciplineSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Discipline', DisciplineSchema);