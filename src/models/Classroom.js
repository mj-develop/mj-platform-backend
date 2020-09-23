const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const ClassroomSchema = new Schema({
    teacher: {
        _id: { 
            type: Schema.Types.ObjectId,
            ref: 'teachers',
            required: [true, 'teacher.id.is.empty']
        },
        name: {
            type: String,
            required: [true, 'teacher.name.is.empty']
        }
    },
    call_url: {
        type: String
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

ClassroomSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Classroom', ClassroomSchema);