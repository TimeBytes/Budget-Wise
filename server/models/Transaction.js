const { Schema } = require("mongoose");

const expenseSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: String,
    required: true,
  },
  isRecurring: {
    type: Boolean,
    required: true,
    default: false,
  },
  name: {
    type: String,
  },
});

const incomeSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: String,
    required: true,
  },
  isRecurring: {
    type: Boolean,
    required: true,
    default: false,
  },
  name: {
    type: String,
  },
});

module.exports = { expenseSchema, incomeSchema };
