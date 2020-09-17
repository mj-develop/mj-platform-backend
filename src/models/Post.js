const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const PostSchema = new Schema({
    title: {
        type: String,
        require: [true, 'title.is,required']
    },
    message: {
        type: String,
        require: [true, 'title.is.required']
    },
    files: [{
        String
    }],
    author: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'teachers',
            require: [true, 'teacher.id.is.required']
        },
        name: String,
        photo: String
    },
    classroom_id: [{
        type: Schema.Types.ObjectId,
        ref: 'classrooms',
        require: [true, 'classroom.id.is.required']
    }],
    category: {
        type: String,
        enum: ['warning', 'activity'],
        require: [true, 'category.id.is.required']
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

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);