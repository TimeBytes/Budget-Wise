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
