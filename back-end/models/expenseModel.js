const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        amount:{
            type: Number,
            required: [true, "Please the amount"]
        },
        date: {
            type: Number,
            required: [true, "Expense date missing"]
        },
        image: String,
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: false
          },
          budget: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Budget',
            required: [true, "Budget id missing"],
          },
    },
    {
        timestamps: true
    }
)

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;