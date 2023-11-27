import React from 'react'
import './css/Dashboard.css'
import './css/Setbudget.css'

import { useState } from 'react';
import { useEffect } from 'react';

const Dashboard = () => {
    const GET_BUDGET_URL = "http://localhost:3000/budget/653124e6a443d6942a9f0d8f";
    const GET_EXPENSES_URL = "http://localhost:3000/expense/budget/653124e6a443d6942a9f0d8f";
    const GET_CATEGORIES_URL = "http://localhost:3000/category";
    const GET_BUDGET_TOTAL_SPEND = "http://localhost:3000/expense/sum/653124e6a443d6942a9f0d8f"

    const [budget, setBudget] = useState();
    const [expenses, setExpenses] = useState();
    const [budgetMonthAndYear, setBudgetMonthAndYear] = useState();
    const [budgetMonth, setBudgetMonth] = useState();
    const [addExpenseState, setAddExpenseState] = useState(false)
    const [categories, setCategories] = useState([])
    const [editExpense, setEditExpense] = useState('')
    const [budgetTotalSpend, setBudgetTotalSpend] = useState(0)

    useEffect(() => {


    }, []);



    return (
        <>
            <div className='setbudget-page'>
                <div className='setbudget-content'>
                    <div className='setbudget-text'>
                        Hello!
                        <p>Please set your budget</p>
                    </div>

                    <div className='setbudget-input'>

                        <input type="number" pattern="[0-9]*" inputmode="numeric" required={true} placeholder='Enter budget amount in euros'/>
                        <div className='setbudget-button'>NEXT</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard