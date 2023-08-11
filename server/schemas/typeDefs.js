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
        donations: [Donation]
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
    }

    type Category {
        _id: ID
        name: String
        isIncome: Boolean
        isExpense: Boolean
        isBudget: Boolean
    }

    type Donation {
        _id: ID
        amount: Float
        data: String
    }

    type Checkout{
        session: ID
    }

    type Auth {
        token: ID
        user: User
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

