const { User, Donation, Category } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const mongoose = require("mongoose");

require("dotenv").config();

const stripe = require("stripe")(
  "sk_test_51NdeCcJJYT86npXC8Avw8l7TZLOZAcw07zfHSpQlECD9FMsyrv7d7u2b4kIHKzXpM0jz95vv8NBw1cXXKO41AHhZ009UuOCiP7"
);

const { signToken } = require("../utils/auth");

const defaultCategories = [
  {
    name: "Groceries",
    isIncome: false,
    isExpense: true,
    isBudget: false,
  },
  { name: "Salary", isIncome: true, isExpense: false, isBudget: false },
  { name: "Rent", isIncome: false, isExpense: true, isBudget: true },
  { name: "Utilities", isIncome: false, isExpense: true, isBudget: true },
  { name: "Freelance", isIncome: true, isExpense: false, isBudget: false },
  { name: "Investment", isIncome: true, isExpense: false, isBudget: false },
];

const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
    },

    allIncomes: async (parent, args, context) => {
      try {
        const { user } = context;
        const userData = await User.findById(user._id);
        return userData.incomes;
      } catch (error) {
        throw new Error(error);
      }
    },
    incomeByCategory: async (parent, args, context) => {
      try {
        const { user } = context;
        const userData = await User.findById(user._id);
        const allIncomes = userData.incomes;
        const incomesByCategory = allIncomes.filter(
          (income) => income.category == args.categoryID
        );
        return incomesByCategory;
      } catch (error) {
        throw new Error(error);
      }
    },

    allExpenses: async (parent, args, context) => {
      try {
        const { user } = context;
        const userData = await User.findById(user._id);
        return userData.expenses;
      } catch (error) {
        throw new Error(error);
      }
    },
    expenseByCategory: async (parent, args, context) => {
      try {
        const { user } = context;
        const userData = await User.findById(user._id);
        const allExpenses = userData.expenses;
        const expenseByCategory = allExpenses.filter(
          (expense) => expense.category == args.categoryID
        );
        return expenseByCategory;
      } catch (error) {
        throw new Error(error);
      }
    },

    allBudgets: async (parent, args, context) => {
      try {
        const { user } = context;
        const userData = await User.findById(user._id);
        return userData.budgets;
      } catch (error) {
        throw new Error(error);
      }
    },
    budgetByCategory: async (parent, args, context) => {
      try {
        const { user } = context;
        const userData = await User.findById(user._id);
        const allBudgets = userData.budgets;
        const budgetsByCategory = allBudgets.filter(
          (budget) => budget.category == args.categoryID
        );
        return budgetsByCategory;
      } catch (error) {
        throw new Error(error);
      }
    },

    allCategories: async (parent, args, context) => {
      try {
        const { user } = context;
        const userData = await User.findById(user._id);
        return userData.categories;
      } catch (error) {
        throw new Error(error);
      }
    },
    categoryByType: async (parent, args, context) => {
      try {
        const { user } = context;
        const userData = await User.findById(user._id);
        const allCategories = userData.categories;
        switch (args.type) {
          case "Income":
            const incomeCategories = allCategories.filter(
              (category) => category.isIncome == true
            );
            return incomeCategories;
            break;
          case "Expense":
            const expenseCategories = allCategories.filter(
              (category) => category.isExpense == true
            );
            return expenseCategories;
            break;
          case "Budget":
            const budgetCatergories = allCategories.filter(
              (category) => category.isBudget == true
            );
            return budgetCatergories;
            break;
          default:
            throw new Error("Category type not found");
        }

        return;
      } catch (error) {
        throw new Error(error);
      }
    },
    donations: async () => {
      return Donation.find({});
    },
    singleDonation: async (parent, { _id }, context) => {
      if (_id) {
        return Donation.findById(_id);
      } else {
        throw new AuthenticationError("Donation not found");
      }
    },

    checkout: async (parent, args, context) => {
      const amount = args.amount;
      const url = new URL(context.headers.referer).origin;
      // const url = "http://localhost:3000";
      // create a new donation
      const line_items = [];

      line_items.push({
        price_data: {
          currency: "cad",
          product_data: {
            name: "Donation",
            description: "Complete your donation via Stripe Checkout",
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      });
      // create stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        // success url will be the url of the client
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
        // line_items is the donation not items in cart
        line_items,

        mode: "payment",
      });
      return { session: session.id };
    },
  },

  Mutation: {
    addUser: async (parents, args, context) => {
      args.categories = JSON.parse(JSON.stringify(defaultCategories));
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parents, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Not Registered");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect Password");
      }
      const token = signToken(user);
      return { token, user };
    },

    addIncome: async (
      parent,
      { name, amount, category, date, isRecurring },
      context
    ) => {
      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            {
              $push: {
                incomes: {
                  description: name,
                  amount,
                  category,
                  date,
                  isRecurring,
                },
              },
            },
            { new: true }
          );
          return updatedUser;
        } catch (error) {
          throw new Error(error);
        }
      }
    },
    editIncome: async (parent, { incomeID, incomeData }, context) => {
      if (context.user) {
        try {
          const userData = await User.findOne({
            _id: context.user._id,
            "incomes._id": incomeID,
          });
          const existingIncome = userData.incomes.find(
            (income) => income._id == incomeID
          );
          const newIncome = {
            description: incomeData.description || existingIncome.description,
            amount: incomeData.amount || existingIncome.amount,
            category: incomeData.category || existingIncome.category,
            date: incomeData.date || existingIncome.date,
            isRecurring: incomeData.isRecurring || existingIncome.isRecurring,
          };
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id, "incomes._id": incomeID },
            { $set: { "incomes.$": newIncome } },
            { new: true }
          );          
          return updatedUser;
        } catch (error) {
          throw new Error(error);
        }
      } else {
        throw new Error("You need to be logged in!");
      }
    },
    removeIncome: async (parent, { incomeID }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { incomes: { _id: incomeID } } },
            { new: true }
          );
          return updatedUser;
        } catch (error) {
          throw new Error(error);
        }
      }
    },

    addExpense: async (
      parent,
      { name, amount, category, date, isRecurring },
      context
    ) => {
      if (context.user) {
        try {
          const updateUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            {
              $push: {
                expenses: {
                  description: name,
                  amount,
                  category,
                  date,
                  isRecurring,
                },
              },
            },
            { new: true }
          );
          return updateUser;
        } catch (error) {
          throw new Error(error);
        }
      } else {
        throw new Error("You need to be logged in!");
      }
    },
    editExpense: async (parent, { expenseID, expenseData }, context) => {
      if (context.user) {
        try {
          const userData = await User.findOne({
            _id: context.user._id,
            "expenses._id": expenseID,
          });
          const existingExpense = userData.expenses.find(
            (expense) => expense._id == expenseID
          );
          const newExpense = {
            description: expenseData.description || existingExpense.description,
            amount: expenseData.amount || existingExpense.amount,
            category: expenseData.category || existingExpense.category,
            date: expenseData.date || existingExpense.date,
            isRecurring: expenseData.isRecurring || existingExpense.isRecurring,
          };
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id, "expenses._id": expenseID },
            { $set: { "expenses.$": newExpense } },
            { new: true }
          );
          return updatedUser;
        } catch (error) {
          throw new Error(error);
        }
      }
    },    
    removeExpense: async (parent, { expenseID }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { expenses: { _id: expenseID } } },
            { new: true }
          );
          return updatedUser;
        } catch (error) {
          throw new Error(error);
        }
      }
    },

    addCategory: async (
      parents,
      { name, isBudget, isExpense, isIncome },
      context
    ) => {
      if (context.user) {
        try {
          const checkDuplicate = await User.findOne({
            _id: context.user._id,
            "categories.name": name,
          });
          if (checkDuplicate) {
            throw new Error("Category already added");
          }
          const updateUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            {
              $addToSet: {
                categories: { name, isBudget, isExpense, isIncome },
              },
            },
            { new: true }
          );
          const newCategory = { name, isIncome, isExpense, isBudget };
          return newCategory;
        } catch (err) {
          throw new Error("try again");
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    editCategory: async (parent, { id, categoryData }, context) => {
      if (context.user) {
        try {
          const userData = await User.findOne({
            _id: context.user._id,
            "categories._id": id,
          });
          const existingCategory = userData.categories.find(
            (category) => category._id == id
          );
          const newCategory = {
            name: categoryData.name || existingCategory.name,
            isBudget: categoryData.isBudget || existingCategory.isBudget,
            isIncome: categoryData.isIncome || existingCategory.isIncome,
            isExpense: categoryData.isExpense || existingCategory.isExpense,
          };
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id, "categories._id": id },
            { $set: { "categories.$": newCategory } },
            { new: true }
          );
          return updatedUser;
        } catch (err) {
          throw new Error("Error updating category");
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeCategory: async (parent, { category }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { categories: { _id: category } } },
            { new: true }
          );
          return updatedUser;
        } catch (err) {
          throw new Error("Category not removed");
        }
      }
    },

    addBudget: async (parent, { category, amount }, context) => {
      if (context.user) {
        try {
          const checkDuplicate = await User.findOne({
            _id: context.user._id,
            "budgets.category": category,
          });
          if (checkDuplicate) {
            throw new Error("Budget already added");
          }
          const userData = await User.findOne({
            _id: context.user._id,
          });
          const categoriesData = userData.categories;
          const categoryName = categoriesData.filter(
            (singleCategory) => singleCategory._id == category
          );
          const updateUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            {
              $addToSet: {
                budgets: { category, amount, name: categoryName[0].name },
              },
            },
            { new: true }
          );

          return updateUser;
        } catch (err) {
          throw new Error("try again");
        }
      }
    },
    editBudget: async (parent, { id, budgetData }, context) => {
      if (context.user) {
        try {
          const userData = await User.findOne({
            _id: context.user._id,
            "budgets._id": id,
          });
          const existingBudget = userData.budgets.find(
            (budget) => budget._id == id
          );
          const newBudgetData = {
            category: budgetData.category || existingBudget.category,
            amount: budgetData.amount || existingBudget.amount,
            name: budgetData.name || existingBudget.name,
          };
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id, "budgets._id": id },
            { $set: { "budgets.$": newBudgetData } },
            { new: true }
          );
          return updatedUser;
        } catch (error) {
          throw new Error(error);
        }
      } else {
        throw new Error("You need to be logged in!");
      }
    },
    removeBudget: async (parent, { budgetID }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { budgets: { _id: budgetID } } },
          { new: true }
        );
        return updatedUser;
      }
    },

    addDonation: async (parents, args, context) => {
      const amount = args.amount;
      const donation = new Donation({ amount });
      await donation.save();
      return donation;
    },
  },
};

module.exports = resolvers;
