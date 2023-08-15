const {Schema, model} = require('mongoose');
const categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    isIncome: {
        type: Boolean,
        required: true,
        default: false
    },
    isExpense: {
        type: Boolean,
        required: true,
        default: false
    },
    isBudget: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = categorySchema;