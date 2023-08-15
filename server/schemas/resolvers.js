const { User, Donation } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

require("dotenv").config();

// const stripeSecretKey = process.env.STRIPE_SK;
const stripe = require("stripe")("sk_test_51NdeCcJJYT86npXC8Avw8l7TZLOZAcw07zfHSpQlECD9FMsyrv7d7u2b4kIHKzXpM0jz95vv8NBw1cXXKO41AHhZ009UuOCiP7");

const { signToken } = require("../utils/auth");

const defaultCategories = [
    {
        name: "",
        isExpnese: false,
        isIncome: false,
        isBudget: false,

    },
    
];

const resolvers = {
    Query: {
        users: async () => { 
            return User.find({});
        },
        user: async (parent, { _id }, context) => {
            if (_id) {
                return User.findById(_id);
            }
            if (context.user) {
                return User.findById(context.user._id);
            }
            throw new AuthenticationError("User not found");
        },
        donations: async () => {
            return Donation.find({});
        },
        singleDonation: async (parent, { _id }, context) => {
            if (_id) {
                return Donation.findById(_id);
            } else {
                throw new AuthenticationError("Donation not found");
            }
          },


    checkout: async (parent, args, context) => {
      const amount = args.amount;
      const url = new URL(context.headers.referer).origin;
      // const url = "http://localhost:3000";
      // create a new donation
      const line_items = [];
      
      line_items.push({
        price_data: {
          currency: "cad",
          product_data: {
            name: "Donation",
            description: "Complete your donation via Stripe Checkout",
          },
          unit_amount: (amount * 100)
        },
        quantity: 1,
      });
      // create stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        // success url will be the url of the client
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
        // line_items is the donation not items in cart
        line_items,

          // {
            // price_data: {
            //   currency: "cad",
            //   product_data: {
            //     description: "Complete your donation via Stripe Checkout",
            //   },
            //   unit_amount: (amount * 100),
            // },
          
            // quantity: 1,
          // },

        
        mode: "payment"
      });
      return { session: session.id };
    },
  },

    Mutation: {
        addUser: async (parents, args) => {
            args.categories = defaultCategories;
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parents, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("Not Registered");
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError("Incorrect Password");
            }
            const token = signToken(user);
            return { token, user };
        },
        addcategory: async (parents, { category }, context) => {
            if (context.user) {
                const updateUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { categories: category } },
                    { new: true }
                );
                return updateUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        saveCategory: async (parents, { category }, context) => {
            if (context.user) {
                const updateUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedCategories: category } },
                    { new: true }
                );
                return updateUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        removeCategory: async (parents, { category }, context) => {
            if (context.user) {
                const updateUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedCategories: category } },
                    { new: true }
                );
                return updateUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
          addDonation: async (parents, args, context) => {
      const amount = args.amount;
      const donation = new Donation({ amount });
      await donation.save();
      return donation;
    },
    }
};



module.exports = resolvers;
