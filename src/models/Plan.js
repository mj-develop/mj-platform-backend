const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const PlanSchema = new Schema({
    education_type: {
        type: String,
        required: [true, 'education.type.is.empty'],
    },
    access_time: {
        duration: {
            type: Number,
            required: [true, 'access.time.duration.is.empty']
        },
        type: {
            type: String,
            enum: ['month', 'year'],
            required: [true, 'access.time.type.is.empty']
        }
    },
    period: {
        type: String,
        required: [true, 'period.is.empty'],
    },
    quant_recorded_lessons: {
        type: Number
    },
    tests_tips_periodicity: {
        type: String,
        enum: ['day', 'week','month']
    },
    quant_commented_exercises_video: {
        type: Number
    },
    enable_download_slides: {
        type: Boolean
    },
    quant_simulated: {
        type: Number
    },
    live_periodicity: {
        type: String,
        enum: ['day', 'week','month']
    },
    price: {
        type: Number,
        required: [true, 'price.is.empty']
    },
    quant_installments: {
        type: Number,
        required: [true, 'quant.installments.is.empty']
    },
    cash_value: {
        type: Number,
        required: [true, 'cash.value.is.empty']
    },
    courses: [{
        _id: { 
            type: Schema.Types.ObjectId, 
            ref: 'courses'       
        },
        name: {
            type: String
        },
    }],
    students: [{
        _id: { 
            type: Schema.Types.ObjectId, 
            ref: 'students'
        },
        name: {
            type: String
        },
    }],
    quant_theoretical_classes:{
        type: Number
    },
    quant_pleadings: {
        type: Number
    },
    quant_wording_corretion: {
        quant: {
            type: Number
        },
        type: {
            type: String,
            enum: ['week', 'month']
        }
    },
    feedback_time_wording_corretion: {
        quant: {
            type: Number
        },
        type: {
            type: String,
            enum: ['hours', 'days']
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }
});

PlanSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Plan', PlanSchema);