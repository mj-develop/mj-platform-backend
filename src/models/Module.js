const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const ModuleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name.is.empty'],
    },
    description: {
        type: String,
        required: [true, 'description.is.empty'],
    },
    lesson: [{
        _id: { 
            type: Schema.Types.ObjectId,
            ref: 'lessons'
        },
        title: {
            type: String
        },
        thumbnail_url: {
            type: String
        }
    }],
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

ModuleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Module', ModuleSchema);