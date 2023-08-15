const db = require('../config/connection');
const { User, Donation } = require('../models');

const userSeeds = require('./userSeeds.json');
const categorySeeds = require('./categorySeeds.json');
const donationSeeds = require('./donationSeeds.json');

db.once('open', async () => {

    await Donation.deleteMany();
    const donationdata = await Donation.insertMany(donationSeeds);

    for(let donation of donationdata) {
        const { _id } = donation;
        await User.findByIdAndUpdate(
            _id,
            { $push: { donations: { $each: donationSeeds } } },
            { new: true, runValidators: true }
        );
    };


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
                isRecurring: true,
                type: 'expense'
            };

            let budgetAmount = 1000; 
            if (isBudget) {
                let budgetData = {
                    ...category,
                    amount: budgetAmount
                };
                await User.findByIdAndUpdate(_id, { $push: { budget: budgetData } });
            }

            if (isIncome || isExpense) {
                await User.findByIdAndUpdate(_id, { $push: { transaction: transactionData } });
            }
        }
    }

    console.log('users seeded');
    process.exit();
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
