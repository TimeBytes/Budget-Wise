const { Schema, model } = require("mongoose");

const donationSchema = new Schema({
  amount: {
    type: Number,
    required: true,
    min: 5,
  },
  data: {
    type: String,
  },
});

const Donation = model("Donation", donationSchema);

module.exports = Donation;
