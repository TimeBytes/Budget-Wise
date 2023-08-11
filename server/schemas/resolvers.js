const { User, Donation } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const stripe = require("stripe")(process.env.STRIPE_SK);

const resolvers = {
  Query: {
    user: async (parents, args) => {
      return await User.find({})
        .populate("finance")
        .populate({
          path: "finance",
          populate: "category",
        })
        .populate("budget")
        .populate("categories");
    },
    income: async (parents, args) => {
      return await Finance.find({ where: args });
    },
    transaction: async (parents, args) => {
      return await Finance.find({ where: args });
    },

  checkout: async (parent, args, context) => {
    try {
      // Extract the origin URL from the referer header.
      const url = new URL(context.headers.referer).origin;

      // Create a new Donation object with the specified amount.
      const donation = new Donation({ amount: args.amount });

      // Create an array of line items for the checkout session.
      const line_items = [{ price: args.amount, quantity: 1 }];

      // Create a checkout session using the Stripe API.
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Payment method types supported in the session
        line_items, // Array of line items for the session
        mode: "payment", // Payment mode
        success_url: `${url}/success`, // URL to redirect to after successful payment
        cancel_url: `${url}/cancel`, // URL to redirect to if the payment is canceled
      });

      // Return the session ID to the client.
      return {
        sessionId: session.id,
        amount: args.amount,
      };
    } catch (error) {
      throw new Error("Failed to create checkout session: " + error.message);
    }
  },
},
  Mutation: {
    addUser: async (parents, args) => {
      const user = await User.create(args);
      return user;
    },
    addDonation: async (parents, args) => {
      const donation = new Donation(args);
    },
  },
};

module.exports = resolvers; 
