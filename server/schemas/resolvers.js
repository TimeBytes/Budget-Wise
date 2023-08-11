const {User} = require('../models');
const {AuthenticationError} = require('apollo-server-express');


const resolvers = {
    Query: {
        user: async (parents, args) => {
            return await User.find({}).populate('finance').populate({
                path: 'finance',
                populate: 'category'
            }).populate('budget').populate('categories');
        },
        income: async (parents, args) => {
            return await Finance.find({where: args});
        }

    },
    Mutation: {
        addUser: async (parents, args) => {
            const user = await User.create(args);
            return user;
        }
    }
};
