const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    firstName: String
    lastName: String
    incomes: [Income]
    expenses: [Expense]
    budgets: [Budget]
    categories: [Category]
    donations: [Donation]
    description: String
    amount: Float
    date: String
    isRecurring: Boolean
  }

  type Budget {
    _id: ID!
    amount: Float
    name: String
    category: Category!
  }

  type Income {
    _id: ID!
    description: String
    category: Category
    amount: Float
    date: String
    isRecurring: Boolean
    name: String
  }
  type Expense {
    _id: ID!
    description: String
    category: Category
    amount: Float
    date: String
    isRecurring: Boolean
    name: String
  }

  type SuccessMsg {
    message: String
  }
  type Category {
    _id: ID!
    name: String!
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

    allIncomes: [Income!]!
    incomeByCategory(categoryID: ID!): [Income!]!

    allExpenses: [Expense]
    expenseByCategory(categoryID: ID!): [Expense]

    allBudgets: [Budget!]!
    budgetByCategory(categoryID: ID!): [Budget!]!

    allCategories: [Category!]!
    categoryByType(type: String!): [Category!]

    donations: [Donation]
    checkout(amount: Float): Checkout
    singleDonation(_id: ID!): Donation
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      firstName: String!
      lastName: String!
    ): Auth
    login(email: String!, password: String!): Auth

    addIncome(
      name: String!
      amount: Float!
      category: ID!
      date: String!
      isRecurring: Boolean!
    ): User
    editIncome(incomeID: ID!, incomeData: incomeInput!): User
    removeIncome(incomeID: ID!): User

    addExpense(
      name: String!
      amount: Float!
      category: ID!
      date: String!
      isRecurring: Boolean
    ): User
    editExpense(expenseID: ID!, expenseData: expenseInput!): User
    removeExpense(expenseID: ID!): User

    addCategory(
      name: String!
      isIncome: Boolean!
      isExpense: Boolean!
      isBudget: Boolean!
    ): Category
    editCategory(id: ID!, categoryData: categoryInput!): User
    removeCategory(category: ID!): User

    addBudget(amount: Float!, category: ID!, name: String): User
    editBudget(id: ID!, budgetData: budgetInput!): User
    removeBudget(budgetID: ID!): User

    addDonation(amount: Float): Donation
  }

  input incomeInput {
    description: String
    amount: Float
    category: ID
    date: String
    isRecurring: Boolean
  }

  input expenseInput {
    description: String
    amount: Float
    category: ID
    date: String
    isRecurring: Boolean
  }

  input categoryInput {
    name: String!
    isIncome: Boolean
    isExpense: Boolean
    isBudget: Boolean
  }

  input budgetInput {
    amount: Float!
    category: ID!
  }
`;

module.exports = typeDefs;
