import React, {useContext} from 'react'
import './css/Dashboard.css'
import './css/Setbudget.css'
import {useNavigate} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import {BudgetContext} from "../context";

const Setbudget = () => {
    const GET_BUDGET_URL = "http://localhost:3000/budget/653124e6a443d6942a9f0d8f";
    const GET_EXPENSES_URL = "http://localhost:3000/expense/budget/653124e6a443d6942a9f0d8f";
    const GET_CATEGORIES_URL = "http://localhost:3000/category";
    const GET_BUDGET_TOTAL_SPEND = "http://localhost:3000/expense/sum/653124e6a443d6942a9f0d8f"
    const navigate = useNavigate();
    const [budget, setBudget] = useState();
    const [expenses, setExpenses] = useState();
    const [budgetMonthAndYear, setBudgetMonthAndYear] = useState();
    const [budgetMonth, setBudgetMonth] = useState();
    const [addExpenseState, setAddExpenseState] = useState(false)
    const [categories, setCategories] = useState([])
    const [editExpense, setEditExpense] = useState('')
    const [budgetTotalSpend, setBudgetTotalSpend] = useState(0)
    const CREATE_BUDGET_URL = "http://localhost:3000/budget";
    const [budgetAmountInput, setBudgetAmountInput] = useState(0)
    const {budgetId, setBudgetId} = useContext(BudgetContext);
    useEffect(() => {


    }, []);
    function getCurrentMonth() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        return currentMonth;
    }

    const createBudget = async () =>{
        console.log(budgetAmountInput)

        if(budgetAmountInput !== 0){
            try {
                const currentDate = new Date();
                const currentYear = currentDate.getFullYear();
                const currentMonth = currentDate.getMonth()+1;
                const budget = {
                    amount: budgetAmountInput,
                    month: currentMonth,
                    year: currentYear
                }
                console.log(budget)
                const response = await axios.post(CREATE_BUDGET_URL, budget);
                if (response.status === 201) {
                    setBudgetId(response.data._id)
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }


    return (
        <>
            <div className='setbudget-page'>
                <div className='setbudget-content'>
                    <div className='setbudget-text'>
                        Hello!
                        <p>Please set your budget</p>
                    </div>

                    <div className='setbudget-input'>

                        <input onChange={(e) => setBudgetAmountInput(e.target.value)} type="number" pattern="[0-9]*" inputMode="numeric" required={true} placeholder='Enter budget amount in euros'/>
                        <div onClick={() => createBudget()} className='setbudget-button'>NEXT</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Setbudget