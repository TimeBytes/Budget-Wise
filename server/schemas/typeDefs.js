const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        firstName: String
        lastName: String
        transaction: [Transaction]
        budget: [Budget]
        categories: [Category]
        donations: [Donation]
    }

    type Budget {
        _id: ID
        name: String
        transactionAmount: Float
        category: String
    }

    type Transaction {
        _id: ID
        name: String
        category: ID
        transactionAmount: Float
        date: String
        isRecurring: Boolean
    }

    type SuccessMsg{
        message: String
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


    type Checkout {
        session: ID
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        users: [User]
        user: User
        transaction: [Transaction]
        income: [Transaction]
        expense: [Transaction]
        budget: [Budget]
        categories: [Category]
        donations:[Donation]
        checkout(amount: Float): Checkout
        singleDonation(_id: ID!): Donation
    }


    type Mutation {
        addUser(username: String!, email: String!, password: String!, firstName: String!, lastName: String!): Auth
        addDonation(amount: Float): Donation
        login(email: String!, password: String!): Auth
        addcategory(name: String!, isIncome: Boolean!, isExpense: Boolean!, isBudget: Boolean!): SuccessMsg
        saveCategory(category: ID!): User
        removeCategory(category: ID!): User
        addBudget(name: String!, transactionAmount: Float!, category: String!): Budget
        addTransaction(name: String!, transactionAmount: Float!, category: ID!, date: String!, isRecurring: Boolean!): User
    }
`;

module.exports = typeDefs;