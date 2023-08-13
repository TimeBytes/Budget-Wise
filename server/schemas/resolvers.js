const { User, Donation } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

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
      }
        
    },
    Mutation: {
        addUser: async (parents, args) => {
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
        }
    }
};


module.exports = resolvers;
