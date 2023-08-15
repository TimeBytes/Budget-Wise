const {Schema, model} = require('mongoose');

const budgetSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    }
});


module.exports = budgetSchema;
