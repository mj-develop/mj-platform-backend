const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const CommentSchema = new Schema({
    post_id: {
        type: Schema.Types.ObjectId, 
        ref: 'posts',
        required: [true, 'post.id.is.empty'],
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