const {Schema} = require('mongoose');

const financeSchema = new Schema({
    name: {
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
        type: string,
        required: true,
        default: 'expense'
    }
});

const Finance = model('Finance', financeSchema);

module.exports = Finance;