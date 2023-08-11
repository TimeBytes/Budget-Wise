const db = require('../config/connection');
const { User, Finance, Budget, Category } = require('../models');

db.once('open', async () => {
    await User.deleteMany();
    await Finance.deleteMany();
    await Budget.deleteMany();
    await Category.deleteMany();

    const user = await User.create({
        username: 'MMoradzadeh',
        email: 'mahdiM@test.com',
        password: 'password12345',
        firstName: 'Mahdi',
        lastName: 'Moradzadeh',
        finance: [
            {
                name: 'Paycheck',
                category: 'Income',
                amount: 2000,
                date: '2021-08-01',
                isRecurring: true,
                type: 'Income'
            },
            {
                name: 'Rent',
                category: 'Housing',
                amount: 1000,
                date: '2021-08-01',
                isRecurring: true,
                type: 'Expense'
            },
            {
                name: 'Groceries',
                category: 'Food',
                amount: 200,
                date: '2021-08-01',
                isRecurring: true,
                type: 'Expense'
            }
        ],
        budget: [
            {
                name: 'Rent',
                amount: 1000,
                category: 'Housing'
            },
            {
                name: 'Groceries',
                amount: 200,
                category: 'Food'
            }
        ],
        categories: [
            {
                name: 'Income',
                isIncome: true,
                isExpense: false,
                isBudget: false
            },
            {
                name: 'Housing',
                isIncome: false,
                isExpense: true,
                isBudget: true
            },
            {
                name: 'Food',
                isIncome: false,
                isExpense: true,
                isBudget: true
            }
        ]
    });

    console.log('users seeded');

    process.exit();
});