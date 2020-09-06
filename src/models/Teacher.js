const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const utils = require('../util/utils');

const TeacherSchema = new Schema({
    titulation: {
        type: String,
        required: [true, 'titulation.is.empty']
    },
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
    social_name: {
        type: String,
        required: [true, 'social.name.is.empty']
    },
    email: {
        type: String,
        required: [true, 'email.is.empty'],
        validate: [utils.validateEmail, 'email.is.not.valid']
    },
    phone: {
        type: String,
        required: [true, 'phone.is.empty'],
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
    address: [{
        number: Number,
        neighborhood: String,
        state: String,
        city: String,
        country: String,
        naturality: String,
        nationality: String

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

TeacherSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Teacher', TeacherSchema);