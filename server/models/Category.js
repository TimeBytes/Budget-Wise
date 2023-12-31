const {Schema} = require('mongoose');
const categorySchema = new Schema({
    name: {
        type: String,
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