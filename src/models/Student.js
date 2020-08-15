const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const utils = require('../util/utils');

const StudentSchema = new mongoose.Schema({
    account: {
        type: String,
        required: false
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
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

StudentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Student', StudentSchema);