const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const DoubtSchema = new mongoose.Schema({
    lesson: {
        _id: {
            ref: 'lessons',
            type: Schema.Types.ObjectId
        },
        title: {
            type: String
        }
    },
    title: {
        type: String,
        required: [true, 'title.is.empty'],
    },
    description: {
        type: String,
        required: [true, 'description.is.empty'],
    },
    author: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'student',
            require: [true, 'student.id.is.required']
        },
        name: String,
        photo: String
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

DoubtSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Doubt', DoubtSchema);