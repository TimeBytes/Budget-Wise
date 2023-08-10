const {Schema} = require('mongoose');

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

const Budget = model('Budget', budgetSchema);

module.exports = Budget;
