const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        firstName: String
        lastName: String
        balance: [Balance]
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

    type Balance {
        _id: ID
        name: String
        amount: Float
        income: [Income]
        expense: [Expense]
    }

    type Income {
        _id: ID
        name: String
        category: ID
        amount: Float
        date: String
        isRecurring: Boolean
    }

    type Expense {
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
        User: [User]
        Donation: [Donation]
        checkout(amount: Float!): Checkout

    }
`;

module.exports = typeDefs;

