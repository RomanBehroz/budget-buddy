const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter an expense name"]
        },
        amount:{
            type: Number,
            required: [true, "Please the amount"]
        },
        date: {
            type: Date,
            required: [true, "Please pick a date"],
            default: Date.now
        },
        image: {
            type:Buffer,
            required: false
        },
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