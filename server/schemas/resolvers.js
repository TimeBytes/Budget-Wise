const { User, Donation } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const stripe = require("stripe")( process.env.STRIPE_SK
);

const resolvers = {
  Query: {
    users: async (parents, args, context) => {
      if (context.user) {
        const users = await User.findOne({ _id: context.user._id });
        return users;
      }
      return User.find();
    },
    checkout: async (parents, args, context) => {
        const url = new URL(context.headers.referer).origin;
        const donation = await Donation.create({
            amount: args.amount,
        });
        const line_items = [];
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
            {
                price_data: {
                currency: "cad",
                product_data: {
                    name: "Donation",
                },
                unit_amount: args.amount * 100,
                },
                quantity: 1,
            },
            ],
            mode: "payment",
            success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${url}/`,
        });
        return { session: session.id };
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
