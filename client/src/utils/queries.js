import { gql } from "@apollo/client";

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
      categories {
        _id
        name
        isIncome
        isExpense
        isBudget
      }
      incomes {
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
      expenses {
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
      budgets {
        _id
        name
        category {
          _id
          name
          isIncome
          isExpense
          isBudget
        }
        amount
      }
      donations {
        _id
        amount
        data
      }
    }
  }
`;

// export const QUERY_ALL_INCOME = gql`
//   query allIncome {
//     allIncome {
//       _id
//       description
//       category {
//         _id
//         name
//         isIncome
//         isExpense
//         isBudget
//       }
//       amount
//       date
//       isRecurring
//     }
//   }
// `;

// export const QUERY_INCOME_BY_CATEGORY = gql`
//   query incomeByCategory($category: ID!) {
//     incomeByCategory(category: $category) {
//       _id
//       description
//       category {
//         _id
//         name
//         isIncome
//         isExpense
//         isBudget
//       }
//       amount
//       date
//       isRecurring
//     }
//   }
// `;

// export const QUERY_ALL_EXPENSE = gql`
//   query allExpense {
//     allExpense {
//       _id
//       description
//       category {
//         _id
//         name
//         isIncome
//         isExpense
//         isBudget
//       }
//       amount
//       date
//       isRecurring
//     }
//   }
// `;

// export const QUERY_EXPENSE_BY_CATEGORY = gql`
//   query expenseByCategory($category: ID!) {
//     expenseByCategory(category: $category) {
//       _id
//       description
//       category {
//         _id
//         name
//         isIncome
//         isExpense
//         isBudget
//       }
//       amount
//       date
//       isRecurring
//     }
//   }
// `;

export const QUERY_ALL_BUDGET = gql`
  query allBudgets {
    allBudgets {
      _id
      amount
      name
      category {
        _id
        name
        isIncome
        isExpense
        isBudget
      }
    }
  }
`;

// export const QUERY_BUDGET_BY_CATEGORY = gql`
//   query budgetByCategory($category: ID!) {
//     budgetByCategory(category: $category) {
//       _id
//       category {
//         _id
//         name
//         isIncome
//         isExpense
//         isBudget
//       }
//       amount
//     }
//   }
// `;

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
