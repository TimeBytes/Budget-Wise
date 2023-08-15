const {Schema} = require('mongoose');

const expenseSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        required: true
    },
    isRecurring: {
        type: Boolean,
        required: true,
        default: false
    },
    type: {
        type: String,
        required: true,
        default: 'expense'
    }
});

const incomeSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        required: true
    },
    isRecurring: {
        type: Boolean,
        required: true,
        default: false
    },
    type: {
        type: String,
        required: true,
        default: 'expense'
    }
});

module.exports = {expenseSchema, incomeSchema};