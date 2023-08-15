const db = require('../config/connection');
const { User } = require('../models');

const userSeeds = require('./userSeeds.json');
const categorySeeds = require('./categorySeeds.json');

db.once('open', async () => {
    await User.deleteMany();

    const usersData = await User.insertMany(userSeeds);

    for (let user of usersData) {
        const { _id } = user;

        await User.findByIdAndUpdate(
            _id,
            { $push: { categories: { $each: categorySeeds } } },
            { new: true, runValidators: true }
        );

        for (let category of categorySeeds) {
            const { isIncome, isExpense, isBudget, _id: categoryId } = category;

            let transactionAmount = 2000;
            let transactionData = {
                category: categoryId,
                name: category.name,
                amount: transactionAmount,
                date: new Date(),
                isRecurring: true
            };

            let budgetAmount = 1000; 
            if (isBudget) {
                let budgetData = {
                    ...category,
                    amount: budgetAmount
                };
                await User.findByIdAndUpdate(_id, { $push: { budget: budgetData } });
            }

            if (isIncome) {
                let incomeData = {
                    ...transactionData,
                    type: 'income'
                };
                await User.findByIdAndUpdate(_id, { $push: { incomes: incomeData } });
            }

            if (isExpense) {
                let expenseData = {
                    ...transactionData,
                    type: 'expense'
                };
                await User.findByIdAndUpdate(_id, { $push: { expenses: expenseData } });
            }
        }
    }

    console.log('users seeded');
    process.exit();
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
