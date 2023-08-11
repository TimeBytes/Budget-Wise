const {Schema, model} = require('mongoose');
const financeSchema = require('./Finance');
const budgetSchema = require('./Budget');
const categorySchema = require('./Category');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Email address not valid']
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },

    finance: [financeSchema],
    budget: [budgetSchema],
    categories: [categorySchema]
},
{
    toJSON: {
        virtuals: true
    }
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
}
);

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema);

module.exports = User;