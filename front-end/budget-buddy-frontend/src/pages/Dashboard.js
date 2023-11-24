import React from 'react'
import './css/Dashboard.css'
import Header from '../components/Header'
import Euro from '../components/Euro'
import { BudgetContext } from '../context'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import MainContent from '../components/MainContent'
import AddExpenseButton from "../components/AddExpenseButton";
import AddExpenseForm from "../components/AddExpenseForm";
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
  const toggleAddExpenseState = () =>{
    setAddExpenseState(!addExpenseState);

  }

  useEffect(() => {
    fetchBudget();
    fetchExpenses();
    fetchExpenseCategories()
    fetchBudgetTotalSpendSum()

  }, []);

  const numberInMonth = (number) =>{
    switch (number) {
      case 10:
        return "OCT"
        break;
      case 11:
        return "NOV"
        break;
      default:
        return ""
    }    

  }

  const fetchExpenseCategories = async () =>{
    try {
      const response = await axios.get(GET_CATEGORIES_URL);
      if (response.status === 200) {
        setCategories(response.data)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const fetchBudgetTotalSpendSum = async () =>{
    try {
      const response = await axios.get(GET_BUDGET_TOTAL_SPEND);
      if (response.status === 200) {
        setBudgetTotalSpend(response.data)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const fetchBudget = async () => {
    try {
      const response = await axios.get(GET_BUDGET_URL);
      if (response.status === 200) {
        setBudget(response.data)
        setBudgetMonthAndYear(numberInMonth(response.data.month) + " " + response.data.year)
        setBudgetMonth(numberInMonth(response.data.month))
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(GET_EXPENSES_URL);
      if (response.status === 200) {
        setExpenses(response.data)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const dashboardClicked = () => {
    if (addExpenseState === true){
      toggleAddExpenseState();
    }
  }


  return (
    <BudgetContext.Provider value={{budgetMonth, budgetMonthAndYear, budget, expenses, budgetTotalSpend,
      toggleAddExpenseState, fetchExpenses, fetchBudget, categories, editExpense, setEditExpense, fetchBudgetTotalSpendSum}}>
      <div>
        <div  onClick={dashboardClicked}>
          <Header />
          <Euro />
          <MainContent />
        </div>

          {addExpenseState? <> <AddExpenseForm /></> : <>  <AddExpenseButton/></>}
      </div>
    </BudgetContext.Provider>
  )
}

export default Dashboard