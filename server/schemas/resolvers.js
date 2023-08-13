const { User, Donation } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
require("dotenv").config();

const stripeSecretKey = process.env.STRIPE_SK;
const stripe = require("stripe")(stripeSecretKey);

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
      const amount = args.amount;
      // console.log(shelterId, amount);
      const url = new URL(context.headers.referer).origin;
      // create a new donation
      const donation = new Donation({ amount: args.amount });

      // save the donation
      await donation.save();
      // create stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        // success url will be the url of the client
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
        // line_items is the donation not items in cart
        line_items: [
          {
            price_data: {
              currency: "cad",
              product_data: {
                description: "Complete youre donation via Stripe Checkout",
              },
              unit_amount: parseInt(amount * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
      });
      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parents, args) => {
      const user = await User.create(args);
      return user;
    },
    Donation: async (parents, args) => {
      const donation = new Donation(args);
    },

  },
};

module.exports = resolvers;
