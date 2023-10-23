const mongoose = require('mongoose');

const budgetSchema = mongoose.Schema(
    {
        amount:{
            type: Number,
            required: [true, "Please enter a budget amount"],
        },
        month:{
            type: Number,
            required: [true, "Please enter the month"]
        },
        year: {
            type: Number,
            required: [true, "Please enter the year"],
        },
    },
    {
        timestamps: true
    }
)

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;