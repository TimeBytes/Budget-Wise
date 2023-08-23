import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $username: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      username: $username
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_INCOME = gql`
  mutation addIncome(
    $name: String!
    $category: ID!
    $amount: Float!
    $date: String!
    $isRecurring: Boolean!
  ) {
    addIncome(
      name: $name
      category: $category
      amount: $amount
      date: $date
      isRecurring: $isRecurring
    ) {
      _id
      description
      amount
      date
      isRecurring
    }
  }
`;

export const EDIT_INCOME = gql`
mutation editIncome(
  $incomeID: ID!
  $description: String!
  $category: String!
  $amount: Float!
  $date: String!
  $isRecurring: Boolean!
) {
  editIncome(
    incomeID: $incomeID
    incomeData: {
      description: $description
      category: $category
      amount: $amount
      date: $date
      isRecurring: $isRecurring
    }
  ) {
    _id
    incomes {
      _id
      description
      category
      amount
      date
      isRecurring
    }
  }
}
`;

export const REMOVE_INCOME = gql`
  mutation removeIncome($incomeID: ID!) {
    removeIncome(incomeID: $incomeID) {
      _id
      description
      category
      amount
      date
      isRecurring
    }
  }
`;

export const ADD_EXPENSE = gql`
  mutation addExpense(
    $name: String!
    $category: ID!
    $amount: Float!
    $date: String!
    $isRecurring: Boolean!
  ) {
    addExpense(
      name: $name
      category: $category
      amount: $amount
      date: $date
      isRecurring: $isRecurring
    ) {
      _id
      description
      amount
      date
      isRecurring
    }
  }
`;

export const EDIT_EXPENSE = gql`
  mutation editExpense(
    $expenseID: ID!
    $description: String!
    $category: String!
    $amount: Float!
    $date: String!
    $isRecurring: Boolean!
  ) {
    editExpense(
      expenseID: $expenseID
      expenseData: {
        description: $description
        category: $category
        amount: $amount
        date: $date
        isRecurring: $isRecurring
      }
    ) {
      _id
      expenses {
        _id
        description
        category
        amount
        date
        isRecurring
      }
    }
  }
`;

export const REMOVE_EXPENSE = gql`
  mutation removeExpense($expenseID: ID!) {
    removeExpense(expenseID: $expenseID) {
      _id
      description
      category
      amount
      date
      isRecurring
    }
  }
`;

export const ADD_BUDGET = gql`
  mutation addBudget($amount: Float!, $category: ID!) {
    addBudget(amount: $amount, category: $category) {
      _id
      budgets {
        _id
        name
        amount
        category {
          _id
        }
      }
    }
  }
`;

export const EDIT_BUDGET = gql`
  mutation editBudget(
    $budgetID: ID!
    $name: String!
    $amount: Float!
    $category: String!
  ) {
    editBudget(
      budgetID: $budgetID
      budgetData: {
        name: $name
        amount: $amount
        category: $category
      }
    ) {
      _id
      budgets {
        _id
        name
        amount
        category
      }
    }
  }
`;


export const REMOVE_BUDGET = gql`
  mutation removeBudget($budgetID: ID!) {
    removeBudget(budgetID: $budgetID) {
      _id
      name
      amount
      category
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation addCategory(
    $name: String!
    $isIncome: Boolean!
    $isExpense: Boolean!
    $isBudget: Boolean!
  ) {
    addCategory(
      name: $name
      isIncome: $isIncome
      isExpense: $isExpense
      isBudget: $isBudget
    ) {
      name
      isIncome
      isExpense
      isBudget
    }
  }
`;

export const EDIT_CATEGORY = gql`
  mutation editCategory(
    $categoryID: ID!
    $name: String!
    $isIncome: Boolean!
    $isExpense: Boolean!
    $isBudget: Boolean!
  ) {
    editCategory(
      id: $categoryID
      categoryData: {
        name: $name
        isIncome: $isIncome
        isExpense: $isExpense
        isBudget: $isBudget
      }
    ) {
      _id
      categories {
        _id
        name
        isIncome
        isExpense
        isBudget
      }
    }
  }
`;

export const REMOVE_CATEGORY = gql`
  mutation removeCategory($category: ID!) {
    removeCategory(category: $category) {
      _id
      categories {
        _id
        name
        isIncome
        isExpense
        isBudget
      }
    }
  }
`;
