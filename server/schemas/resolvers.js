const { User, Donation } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

require("dotenv").config();

// const stripeSecretKey = process.env.STRIPE_SK;
const stripe = require("stripe")("sk_test_51NdeCcJJYT86npXC8Avw8l7TZLOZAcw07zfHSpQlECD9FMsyrv7d7u2b4kIHKzXpM0jz95vv8NBw1cXXKO41AHhZ009UuOCiP7");

const { signToken } = require("../utils/auth");

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
        incomeByCategory: async () => {
            try {
                return await Category.find({ isIncome: true });
            } catch (error) {
                throw new Error(error);
            }
        },
        allExpenses: async () => {
            try {
                return await Expense.find({});
            } catch (error) {
                throw new Error(error);
            }
        },
        expenseByCategory: async () => {
            try {
              return await Category.find({ isExpense: true });
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
            if (!context.user) throw new AuthenticationError('You need to be logged in!');
            
            const newIncome = {
                description: name,
                category,
                amount,
                date,
                isRecurring
            };
            
            const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { $push: { income: newIncome } },
                { new: true }
            );
            return updatedUser;
        },
        editIncome: async (parent, { incomeID, name, amount, category, date, isRecurring }, context) => {
            if (!context.user) throw new AuthenticationError('You need to be logged in!');
            
            const updatedIncome = {
                description: name,
                category,
                amount,
                date,
                isRecurring
            };
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id, "income._id": incomeID },
                { "$set": { "income.$": updatedIncome } },
                { new: true }
            );

            if (!updatedUser) 
                throw new Error('Unable to update income.');

            return updatedUser;
        },
        removeIncome: async (parent, { incomeID }, context) => {
            if (!context.user) throw new AuthenticationError('You need to be logged in!');

            const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { $pull: { income: { _id: incomeID } } },
                { new: true }
            );
            return updatedUser;
        },

        addExpense: async (parent, { name, amount, category, date, isRecurring }, context) => {
            if (!context.user) throw new AuthenticationError('You need to be logged in!');
            
            const newExpense = {
                description: name,
                category,
                amount,
                date,
                isRecurring
            };
            
            const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { $push: { expense: newExpense } },
                { new: true }
            );
            return updatedUser;
        },
        editExpense: async (parent, { expenseID, name, amount, category, date, isRecurring }, context) => {
            if (!context.user) throw new AuthenticationError('You need to be logged in!');
            
            const updatedExpense = {
                description: name,
                category,
                amount,
                date,
                isRecurring
            };
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id, "expense._id": expenseID },
                { "$set": { "expense.$": updatedExpense } },
                { new: true }
            );

            if (!updatedUser) throw new Error('Unable to update expense.');

            return updatedUser;
        },
        removeExpense: async (parent, { expenseID }, context) => {
            if (!context.user) throw new AuthenticationError('You need to be logged in!');

            const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { $pull: { expense: { _id: expenseID } } },
                { new: true }
            );
            return updatedUser;
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
                    // Check if the category with the new name already exists
                    const checkDuplicate = await User.findOne({
                        _id: context.user._id,
                        'categories.name': categoryData.name,
                        'categories._id': { $ne: id }
                    });
                    if (checkDuplicate) {
                        throw new Error("Category with this name already exists");
                    }
                    
                    // Update the category
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id, "categories._id": id },
                        { "$set": { "categories.$": categoryData } },
                        { new: true }
                    );
                    return updatedUser;
                } catch(err) {
                    console.error(err);
                    throw new Error("Error updating category");
                }
            }
            throw new AuthenticationError("You need to be logged in!");
        },        
        removeCategory: async (parent, { category }, context) => {
            if (!context.user) throw new AuthenticationError('You need to be logged in!');

            // First, it might be a good idea to ensure that no incomes or expenses reference this category
            const userWithReferences = await User.findOne({
                _id: context.user._id,
                $or: [
                    { 'income.category': category },
                    { 'expense.category': category }
                ]
            });

            if (userWithReferences) {
                throw new Error("Can't delete a category that's still being referenced by incomes or expenses.");
            }

            // If no references, proceed to remove
            const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { $pull: { categories: { _id: category } } },
                { new: true }
            );
            return updatedUser;
        },

        addBudget: async (parent, { category, amount }, context) => {
            if (!context.user) throw new AuthenticationError('You need to be logged in!');

            const newBudget = {
                category,
                amount
            };

            const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { $push: { budgets: newBudget } },
                { new: true }
            );
            return updatedUser;
        },
        editBudget: async (parent, { budgetID, name, amount, category }, context) => {
            if (!context.user) throw new AuthenticationError('You need to be logged in!');
            
            const updatedBudget = {
                name,
                amount,
                category
            };
        
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id, "budget._id": budgetID },
                { "$set": { "budget.$": updatedBudget } },
                { new: true }
            );
        
            if (!updatedUser) throw new Error('Unable to update budget.');
        
            return updatedUser;
        },
        removeBudget: async (parent, { budgetID }, context) => {
            if (!context.user) throw new AuthenticationError('You need to be logged in!');

            const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { $pull: { budgets: { _id: budgetID } } },
                { new: true }
            );
            return updatedUser;
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
