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
        category: String
        amount: Float
        date: String
        isRecurring: Boolean
    }

    type Expense {
        _id: ID
        name: String
        category: String
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
`;

module.exports = typeDefs;

