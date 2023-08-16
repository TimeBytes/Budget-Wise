const { User, Donation } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

require("dotenv").config();

// const stripeSecretKey = process.env.STRIPE_SK;
const stripe = require("stripe")("sk_test_51NdeCcJJYT86npXC8Avw8l7TZLOZAcw07zfHSpQlECD9FMsyrv7d7u2b4kIHKzXpM0jz95vv8NBw1cXXKO41AHhZ009UuOCiP7");

const { signToken } = require("../utils/auth");
const { find } = require("../models/User");

const defaultCategories = [
    {
        name: "Transportation",
    },
    
];

const resolvers = {
    Query: {
        users: async () => { 
            return User.find({});
        },
        user: async (parent, { _id }, context) => {
            if (_id) {
                return User.findById(_id);
            }
            if (context.user) {
                return User.findById(context.user._id);
            }
            throw new AuthenticationError("User not found");
        },

        allIncomes: async () => {
            try {
                return await Income.find({});
            } catch (error) {
                throw new Error(error);
            }
        },
        incomeByCategory: async (parent, args, context) => {
            try {
                //get user id from context
                const { user } = context;
                //get category id from args
                const { categoryID } = args;
                const userData = User.findById(user._id);
                //get all incomes for that user
                const incomes = await Income.find({ user: user._id });
                //filter by category
                const filteredIncomes = incomes.filter(
                    (income) => income.category
                );
                //return filtered incomes
                return filteredIncomes;

                return await Category.find({ isIncome: true });
            } catch (error) {
                throw new Error(error);
            }
        },

        allExpenses: async (parent, args, context) => {
            try {
                const { user } = context;
                // console.log({user});
                const userData = await User.findById(user._id);
                console.log({userData});
                return await userData.expenses;
            } catch (error) {
                throw new Error(error);
            }
        },
        expenseByCategory: async (parent, args, context) => {
            try {
                const { user } = context;
                const { categoryID } = args;
                const userData = await User.findById(user._id);
                console.log({userData});
                const filteredExpenses = userData.expenses.filter(
                    (expense) => expenses.category._id === categoryID
                );
                return filteredExpenses;
            } catch (error) {
              throw new Error(error);
            }
        },

        allBudgets: async () => {
            try {
                return await Budget.find({});
            } catch (error) {
                throw new Error(error);
            }
        },
        budgetByCategory: async () => {
            try {
                return await Category.find({ isBudget: true });
            } catch (error) {
                throw new Error(error);
            }
        },

        allCategories: async () => {
            try {
                return await Category.find({});
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
          unit_amount: (amount * 100)
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

          // {
            // price_data: {
            //   currency: "cad",
            //   product_data: {
            //     description: "Complete your donation via Stripe Checkout",
            //   },
            //   unit_amount: (amount * 100),
            // },
          
            // quantity: 1,
          // },

        
        mode: "payment"
      });
      return { session: session.id };
    },
  },

    Mutation: {
        addUser: async (parents, args) => {
            args.categories = defaultCategories;
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

        addIncome: async (parent, { name, amount, category, date, isRecurring }, context) => {
            if (context.user){
                try {
                    const checkDuplicate = await User.findOne({ _id: context.user._id, "income.description": name });
                    if (checkDuplicate) {
                        throw new Error('Income already exists.');
                    }
                    const updatedUser = await User.findByIdAndUpdate(
                        {_id: context.user._id},
                        { $push: { incomes: { description: name, amount, category, date, isRecurring } } },
                        { new: true }
                    );
                    return updatedUser;
                } catch (error) {
                    throw new Error(error);
                }
            }
        },
        editIncome: async (parent, { incomeID, incomeData }, context) => {
            if (context.user){
                try {
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id, "incomes._id": incomeID },
                        { $set: { "incomes.$": incomeData} },
                        { new: true }
                    );
                    console.log({updatedUser});
                } catch (error) {
                throw new Error(error);
                }
            } else {
                throw new Error('You need to be logged in!');
            }
        },
        removeIncome: async (parent, { incomeID }, context) => {
            if (context.user)
                {
                    try{
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

        addExpense: async (parent, { name, amount, category, date, isRecurring }, context) => {
            if(context.user){
                try {
                    const checkDuplicate = await User.findOne({ _id: context.user._id, "expenses.description": name });
                    if (checkDuplicate) {
                        throw new Error('Expense already exists.');
                    }
                    const updateUser = await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        { $push: { expenses: { description: name, amount, category, date, isRecurring } } },
                        { new: true }
                    );
                    return updateUser;
                } catch (error) {
                    throw new Error(error);
                }
            } else {
                throw new Error('You need to be logged in!');
            }
        },
        editExpense: async (parent, { expenseID, expenseData}, context) => {
            if (context.user){
                try {
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id, "expenses._id": expenseID },
                        {$set: {"expenses.$": expenseData }},
                        { new: true }
                    );
                    return updatedUser;
                } catch (error) {
                    throw new Error(error);
                }
            }
        },
        removeExpense: async (parent, { expenseID }, context) => {
            if (context.user){
                try{
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

        addcategory: async (parents, category, context) => {
            if (context.user) {
                try {
                    const checkDuplicate = await User.findOne({
                        _id: context.user._id,
                        'categories.name': category.name,
                    });
                    if (checkDuplicate) {
                        throw new Error("Category already added");
                    }
                    const updateUser = await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { categories: category } },
                        { new: true }
                    );
                    return updateUser;
                } catch(err) {
                    throw new Error("try again");
                }
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        editCategory: async (parent, { id, categoryData }, context) => {
            if (context.user) {
                try {
                    // Update the category
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id, "categories._id": id },
                        { $set: { "categories.$": categoryData } },
                        { new: true }
                    );
                    return updatedUser;
                } catch(err) {
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
                        { $pull: { categories: { _id: category._id } } },
                        { new: true }
                    );
                    return updatedUser;
                } catch(err) {
                    throw new Error("Error removing category");
                }
            }
        },

        addBudget: async (parent, { category, amount }, context) => {
            if (context.user) {
                try {
                    const checkDuplicate = await User.findOne({
                        _id: context.user._id,
                        'budgets.category': category,
                    });
                    if (checkDuplicate) {
                        throw new Error("Budget already added");
                    }
                    const updateUser = await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { budgets: { category, amount } } },
                        { new: true }
                    );
                    return updateUser;
                } catch(err) {
                    throw new Error("try again");
                }
            }
        },
        editBudget: async (parent, { budgetID, budgetData }, context) => {
            if(context.user){
                try {
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id, "budgets._id": budgetID },
                        { $set: { "budgets.$": budgetData} },
                        { new: true }
                    );
                    return updatedUser;
                } catch (error) {
                    throw new Error(error);
                }
            } else {
                throw new Error('You need to be logged in!');
            }
        },
        removeBudget: async (parent, { budgetID }, context) => {
            if (context.user){
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

    }
};



module.exports = resolvers;
