const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const Expense = require('./models/expenseModel');
const Category = require('./models/categoryModel');
const Budget = require('./models/budgetModel');
const app = express();

//middleware
app.use(express.json())
app.use(cors())

//routes

////////////////////////////////////
///////////////BUDGET/////////////
///////////////////////////////////
//get all budgets
app.get('/budget', async(req, res) =>{
    try{
        const budgets = await Budget.find({});
        res.status(200).json(budgets);
    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

//save new budget
app.post('/budget', async(req, res) => {
    try{
        const budget = await Budget.create(req.body);
        res.status(201).json(budget);
    }catch (error){
        res.status(500).json({message: error.message});
    }
})


//get budget
app.get('/budget/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const budget = await Budget.findById(id);
        if(!budget){
            return res.status(404).json({message: 'cannot find any budget with id ${id}'})
        }
        res.status(200).json(budget);
    }catch (error){
        res.status(500).json({message: error.message});
    }
})


////////////////////////////////////
///////////////CATEGORY/////////////
///////////////////////////////////
//get all expenses
app.get('/category', async(req, res) =>{
    try{
        const categories = await Category.find({});
        res.status(200).json(categories);
    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

//save new category
app.post('/category', async(req, res) => {
    try{
        const category = await Category.create(req.body);
        res.status(201).json(category);
    }catch (error){
        res.status(500).json({message: error.message});
    }
})

////////////////////////////////////
////////////////EXPENSE////////////
//////////////////////////////////
//get all expenses
app.get('/expense', async(req, res) =>{
    try{
        let expenses = await Expense.find({}).populate('category');
        expenses = expenses.map(expense => {
            return {
                _id: expense._id,
                name: expense.name,
                amount: expense.amount,
                category: expense.category.name,
                date: expense.date,
                budget: expense.budget,
                createdAt: expense.createdAt
         
            };
          });
   
        res.status(200).json(expenses);
    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

//get an expense by id
app.get('/expense/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const expense = await Expense.findById(id);
        if(!expense){
            return res.status(404).json({message: 'cannot find any expense with id ${id}'})
        }
        res.status(200).json(expense);
    }catch (error){
        res.status(500).json({message: error.message});
    }
})

//save new expense
app.post('/expense', async(req, res) => {
    try{
        const expense = await Expense.create(req.body);
        const budget = await Budget.findById(expense.budget);
        const updateBudget = await Budget.findByIdAndUpdate(budget._id, {spendAmount: budget.spendAmount + expense.amount});
        res.status(201).json(expense);
    }catch (error){
        res.status(500).json({message: error.message});
    }
})

//update expense
app.put('/expense/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const expense = await Expense.findByIdAndUpdate(id, req.body);
        if(!expense){
            return res.status(404).json({message: 'cannot find any expense with id ${id}'})
        }else{
            const expense = await Expense.findById(id);
            res.status(201).json(expense);
        }
        
    }catch (error){

        res.status(500).json({message: error.message});
    }
})

//delete expense
app.delete('/expense/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const expense = await Expense.findByIdAndDelete(id);
        if(!expense){
            return res.status(404).json({message: 'cannot find any expense with id ${id}'})
        }else{
            res.status(200).json({message: "Expense with id ${id} deleted."});
        }
        
    }catch (error){

        res.status(500).json({message: error.message});
    }
})


//get all expenses by budget id
app.get('/expense/budget/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        let expenses = await Expense.find({budget: id}).populate('category').sort({ createdAt: -1 });

        expenses = expenses.map(expense => {
            return {
                _id: expense._id,
                name: expense.name,
                amount: expense.amount,
                category: expense.category.name,
                date: expense.date,
                budget: expense.budget
         
            };
          });


        let groupedData = expenses.reduce((acc, current) => {
            // Get the value of the "category" property
            const category = current.date;

            // If the category doesn't exist in the accumulator object, create an empty array
            if (!acc[category]) {
                acc[category] = [];
            }

            // Push the current object into the corresponding category array
            acc[category].push(current);

            return acc;
        }, {});


        const dataArray = Object.entries(groupedData);


       let sorted = dataArray.sort((a, b) => parseInt(b[0]) - parseInt(a[0]));


        const sortedData = Object.fromEntries(sorted);

        res.status(200).json(sorted);
    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

//we first connect to the database. Then run our application.

//to trim the messages
mongoose.set("strictQuery", false)
//mongodb connection
mongoose.connect('mongodb+srv://roman:hodajanem123@romanapi.li3jipz.mongodb.net/Expense-Tracker-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to mongodb successfully.');
    //start our application
    app.listen(3000, () => {
        console.log('Node API app is running on port 3000');
    });
    
}).catch((error) => {
    console.log(error)
})