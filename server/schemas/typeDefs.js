const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        firstName: String
        lastName: String
        income: [Income]
        expense: [Expense]
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
        date: String
        isRecurring: Boolean
    }
    type Expense {
        _id: ID!
        description: String!
        category: Category
        amount: Float
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
        user(_id: ID!): User
        allIncomes: [Income!]!
        incomeByCategory: [Income!]!
        allExpenses: [Expense!]!
        expenseByCategory: [Expense!]!
        allBudgets: [Budget!]!
        allCategories: [Category!]!
        donations:[Donation]
        checkout(amount: Float): Checkout
        singleDonation(_id: ID!): Donation
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!, firstName: String!, lastName: String!): Auth
        login(email: String!, password: String!): Auth
        
        addIncome(name: String!, amount: Float!, category: ID!, date: String!, isRecurring: Boolean!): User
        editIncome(incomeID: ID!, name: String!, amount: Float!, category: ID!, date: String!, isRecurring: Boolean!): User
        removeIncome(incomeID: ID!): User

        addExpense(name: String!, amount: Float!, category: ID!, date: String!, isRecurring: Boolean!): User
        editExpense(expenseID: ID!, name: String!, amount: Float!, category: ID!, date: String!, isRecurring: Boolean!): User
        removeExpense(expenseID: ID!): User

        addcategory(name: String!, isIncome: Boolean!, isExpense: Boolean!, isBudget: Boolean!): User
        editCategory(id: ID!, categoryData: categoryInput!): User        
        removeCategory(category: ID!): User
        
        addBudget(name: String!, amount: Float!, category: String!): Budget
        editBudget(budgetID: ID!, name: String!, amount: Float!, category: String!): User
        removeBudget(budgetID: ID!): User
        
        addDonation(amount: Float): Donation
    }
    input categoryInput {
        name: String!
        isIncome: Boolean
        isExpense: Boolean
        isBudget: Boolean
    }
`;


module.exports = typeDefs;