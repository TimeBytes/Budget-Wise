const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        firstName: String
        lastName: String
        finance: [Finance]
        budget: [Budget]
        categories: [Category]
    }

    type Budget {
        _id: ID
        name: String
        amount: Float
        category: String
    }

    type Finance {
        _id: ID
        name: String
        category: ID
        amount: Float
        date: String
        isRecurring: Boolean
        type: String
    }

    type Category {
        _id: ID
        name: String
        isIncome: Boolean
        isExpense: Boolean
        isBudget: Boolean
    }

    type Query {
        user: [User]
        transaction: [Finance]
        income: [Finance]
        expense: [Finance]
        budget: [Budget]
        categories: [Category]


    }
`;

module.exports = typeDefs;

