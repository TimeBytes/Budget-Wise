const db = require('../config/connection');
const { User, Donation } = require('../models');

const userSeeds = require('./userSeeds.json');
const categorySeeds = require('./categorySeeds.json');
const donationSeeds = require('./donationSeeds.json');

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

            let financeAmount = 2000;  // Example amount for finance
            let financeData = {
                category: categoryId,
                name: category.name,
                amount: financeAmount,
                date: new Date(),
                isRecurring: true,
                type: 'expense'
            };

            let budgetAmount = 1000;  // Example amount for budget
            if (isBudget) {
                let budgetData = {
                    ...category,
                    amount: budgetAmount
                };
                await User.findByIdAndUpdate(_id, { $push: { budget: budgetData } });
            }

            if (isIncome || isExpense) {
                await User.findByIdAndUpdate(_id, { $push: { finance: financeData } });
            }
        }
    }

    console.log('users seeded');
    process.exit();
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
