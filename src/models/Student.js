const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const utils = require('../util/utils');

const StudentSchema = new Schema({
    user: {
        _id: { 
            type: Schema.Types.ObjectId, 
            ref: 'users'
        },
        username: {
            type: String
        },
    },
    name: {
        type: String,
        required: [true, 'name.is.empty']
    },
    phone: {
        type: String,
        required: [true, 'name.is.empty']
    },
    social_name: {
        type: String,
        required: [true, 'social.name.is.empty']
    },
    email: {
        type: String,
        unique: [true, 'email.in.use'],
        required: [true, 'name.is.empty'],
        lowercase: true,
        validate: [utils.validateEmail, 'email.is.not.valid']
    },
    register: {
        type: String,
        required: [true, 'register.is.empty'],
    },
    birth: {
        type: Date,
        required: [true, 'birth.is.empty'],
    },
    gender: {
        type: String,
        enum: ['m', 'f'],
        required: [true, 'gender.is.empty'],
    },
    marital: {
        type: String,
        required: [true, 'marital.is.empty'],
    },
    address: {
        number: Number,
        neighborhood: String,
        state: String,
        city: String,
        complement: String,
        cep: String,
        street: String
    },
    courses: [{
        _id: { 
            type: Schema.Types.ObjectId, 
            ref: 'courses'
        },
        name: String,
        registration_date: Date,
        expiration_date: String,
        plan: {
            _id: { 
                type: Schema.Types.ObjectId, 
                ref: 'plans'
            },
            name: {
                type: String
            },
        },
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

StudentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Student', StudentSchema);