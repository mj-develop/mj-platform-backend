const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const CommentSchema = new Schema({
    post_id: {
        type: Schema.Types.ObjectId, 
        ref: 'posts'
    },
    doubts_id: {
        type: Schema.Types.ObjectId, 
        ref: 'doubts'
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
            require: [true, 'author.id.is.required']
        },
        type: {
            type: String,
            enum: ['student', 'teacher']
        },
        name: String,
        photo: String
    },
    isRead: {
        type: Boolean,
        default: false
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

CommentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Comment', CommentSchema);