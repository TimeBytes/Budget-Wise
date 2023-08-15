const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
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
        financeAmount: Float
        category: String
    }

    type Finance {
        _id: ID
        name: String
        category: ID
        financeAmount: Float
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
        transaction: [Finance]
        income: [Finance]
        expense: [Finance]
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
    }
`;

module.exports = typeDefs;