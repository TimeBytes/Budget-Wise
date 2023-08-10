const {User} = require('../models');
const {AuthenticationError} = require('apollo-server-express');


const resolvers = {
    Query: {
        users: async (parents, args, context) => {
            if(context.user) {
                const users = await User.findOne({_id: context.user._id});
                return users;
            }
            return User.find();
        }
    },
    Mutation: {
        addUser: async (parents, args) => {
            const user = await User.create(args);
            return user;
        }
    }
};
