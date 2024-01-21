const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const Expense = require('./models/expenseModel');
const Category = require('./models/categoryModel');
const Budget = require('./models/budgetModel');
const User = require('./models/userModel');
const app = express();
const multer = require('multer');
const path = require('path')
const {get} = require("mongoose");
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

//update budget

app.put('/budget/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const budget = await Budget.findByIdAndUpdate(id, req.body);
        if(!budget){
            return res.status(404).json({message: 'cannot find any budget with id ${id}'})
        }else{
            const budget = await Budget.findById(id);
            res.status(201).json(budget);
        }

    }catch (error){

        res.status(500).json({message: error.message});
    }
})

async function updateBudget(budgetId, data) {
    try {
        const budget = await Budget.findByIdAndUpdate(budgetId, data);
        if (!budget) {
            return true;
        } else {
            const budget = await Budget.findById(budgetId);
            return false;
        }

    } catch (error) {
        return false;
    }
}


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

//count expenses in sum in a budget
app.get('/expense/sum/:budgetId', async (req, res) => {
    try{
        const {budgetId} = req.params;
        const expenses = await Expense.find({ budget: budgetId });

        const totalValue = expenses.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.amount;
        }, 0);
        res.status(200).json(totalValue);
    }catch (error){

    }
})

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


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

//save new expense
app.post('/expense', upload.single('image'), async (req, res) => {
    try {
        let imagePath;

        if(req.file == null || req.file == undefined){
            imagePath = ''
        }else{
            imagePath = req.file.path
        }

        const { name, amount, date, budget, category } = req.body;
        const newExpense = new Expense({
            name,
            amount,
            budget,
            category,
            date,
            image: imagePath
        });

        await newExpense.save();

        let getBudget = await Budget.findById(budget)

        getBudget.spendAmount = getBudget.spendAmount + Number(amount);

        await Budget.findByIdAndUpdate(budget, getBudget)

        res.status(201).json({ message: 'Expense added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/Images/:imageName', (req, res) => {
    const imageName = req.params.imageName;

    // Get the absolute path to the image
    const imagePath = path.join(__dirname, 'Images', imageName);

    // Send the image as a response
    res.sendFile(imagePath);
});

//update expense
app.put('/expense/:id', upload.single('image'),async(req, res) => {
    try{

        let imagePath;



        const {id} = req.params;
        const expense = await Expense.findByIdAndUpdate(id, req.body);


        if(req.file){
            imagePath = req.file.path
            expense.image = imagePath;
            expense.save();
        }

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

        const expense = await Expense.findById(id).populate('budget');
        // res.status(200).json({expense: expense});
        if(!expense){
            return res.status(404).json({message: 'cannot find any expense with id ${id}'})
        }else{
            const updateBudgetSpend = {
                spendAmount: expense.budget.spendAmount - expense.amount
            }
            await Expense.findByIdAndDelete(id);
            await updateBudget(expense.budget._id, updateBudgetSpend)
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




app.post('/login', async(req, res) =>{
    const { username, password } = req.body;

    try {
        // Find a user by username and password
        const user = await User.findOne({ username, password });

        if (user) {
            // Successful login
            res.status(200).json({ message: 'Login successful' });
        } else {
            // Incorrect credentials
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


const saveUser = async (username, password)=> {
    try {
        const user = new User({ username, password });
        await User.create(user)
        console.log('User saved successfully');
    } catch (error) {
        console.error('Error saving user:', error);
        throw error;
    }
};

app.post('/register', async(req, res) =>{
    const { username, password } = req.body;

    try {
        // Save the user into the database
        await saveUser(username, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

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