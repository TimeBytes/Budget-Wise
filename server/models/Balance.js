const {Schema} = require('mongoose');

const ieSchema = require('./IncomeExpense');

const balanceSchema = new Schema({
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
    income: [ieSchema.incomeSchema],
    expense: [ieSchema.expenseSchema]
});

const Balance = model('Balance', balanceSchema);

module.exports = Balance;