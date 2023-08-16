const {Schema, model} = require('mongoose');
const categorySchema = require('./Category');

const budgetSchema = new Schema({
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
});


module.exports = budgetSchema;
