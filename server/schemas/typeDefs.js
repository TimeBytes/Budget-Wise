const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        firstName: String
        lastName: String
        Income: [income]
        Expense: [expense]
        budget: [Budget]
        categories: [Category]
        donations: [Donation]
    }

    type Budget {
        _id: ID!
        category: Category
        amount: Float
    }

    type Income {
        _id: ID!
        description: String
        category: Category
        amount: Float
        date: Date
        isRecurring: Boolean
    }
    type Expense {
        _id: ID!
        description: String!
        category: Category
        amount: Float
        date: Date
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
        user: User
        allIncomes: [Income]
        incomesByCategory (categoryID: ID!): [Income]
        allExpenses: [Expense]
        expensesByCategory (categoryID: ID!): [Expense]
        budget: [Budget]
        categories: [Category]
        donations:[Donation]
        checkout(amount: Float): Checkout
        singleDonation(_id: ID!): Donation
    }


    type Mutation {
        users: [User]
        addUser(username: String!, email: String!, password: String!, firstName: String!, lastName: String!): Auth
        addDonation(amount: Float): Donation
        login(email: String!, password: String!): Auth
        addcategory(name: String!, isIncome: Boolean!, isExpense: Boolean!, isBudget: Boolean!): User
        editCategory(category: ID!): User 
        removeCategory(category: ID!): User
        addBudget(name: String!, amount: Float!, category: String!): Budget
        addIncome(name: String!, amount: Float!, category: ID!, date: String!, isRecurring: Boolean!): User
        addExpense(name: String!, amount: Float!, category: ID!, date: String!, isRecurring: Boolean!): User
        editIncome(incomeID: ID!, name: String!, amount: Float!, category: ID!, date: String!, isRecurring: Boolean!): User
        editExpense(expenseID: ID!, name: String!, amount: Float!, category: ID!, date: String!, isRecurring: Boolean!): User
        removeIncome(incomeID: ID!): User
        removeExpense(expenseID: ID!): User
    }
`;

module.exports = typeDefs;