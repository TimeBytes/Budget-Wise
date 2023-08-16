import { gql } from '@apollo/client';

export const QUERY_CHECKOUT = gql`
  query getCheckout($amount: Float) {
    checkout(amount: $amount) {
      session
    }
  }
`;

export const QUERY_USER = gql`
  query user {
    user {
      _id
      firstName
      lastName
      email
      username
      income {
        _id
        description
        category {
          _id
          name
        }
        amount
        date
        isRecurring
      }
      expense {
        _id
        description
        category {
          _id
          name
        }
        amount
        date
        isRecurring
      }
      budget {
        _id
        category {
          _id
          name
        }
        amount
      }
      categories {
        _id
        name
        isIncome
        isExpense
        isBudget
      }
      donations {
        _id
        amount
        date
      }
    }
  }
`;

export const QUERY_ALL_INCOME = gql`
  query allIncome {
    allIncome {
      _id
      description
      category {
        _id
        name
        isIncome
        isExpense
        isBudget
      }
      amount
      date
      isRecurring
    }
  }
`;  

export const QUERY_INCOME_BY_CATEGORY = gql`
  query incomeByCategory($category: ID!) {
    incomeByCategory(category: $category) {
      _id
      description
      category {
        _id
        name
        isIncome
        isExpense
        isBudget
      }
      amount
      date
      isRecurring
    }
  }
`;

export const QUERY_ALL_EXPENSE = gql`
  query allExpense {
    allExpense {
      _id
      description
      category {
        _id
        name
        isIncome
        isExpense
        isBudget
      }
      amount
      date
      isRecurring
    }
  }
`;

export const QUERY_EXPENSE_BY_CATEGORY = gql`
  query expenseByCategory($category: ID!) {
    expenseByCategory(category: $category) {
      _id
      description
      category {
        _id
        name
        isIncome
        isExpense
        isBudget
      }
      amount
      date
      isRecurring
    }
  }
`;

export const QUERY_ALL_BUDGET = gql`
  query allBudget {
    allBudget {
      _id
      category {
        _id
        name
        isIncome
        isExpense
        isBudget
      }
      amount
    }
  }
`;

export const QUERY_BUDGET_BY_CATEGORY = gql`
  query budgetByCategory($category: ID!) {
    budgetByCategory(category: $category) {
      _id
      category {
        _id
        name
        isIncome
        isExpense
        isBudget
      }
      amount
    }
  }
`;

export const QUERY_ALL_CATEGORIES = gql`
  query allCategories {
    allCategories {
      _id
      name
      isIncome
      isExpense
      isBudget
    }
  }
`;

export const QUERY_CATEGORY_BY_TYPE = gql`
  query categoryByType($type: String!) {
    categoryByType(type: $type) {
      _id
      name
      isIncome
      isExpense
      isBudget
    }
  }
`;
