const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const LessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title.is.empty'],
    },
    url: {
        type: String,
        required: [true, 'url.is.empty'],
    },
    thumbnail_url: {
        type: String
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

LessonSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Lesson', LessonSchema);