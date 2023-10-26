import React from 'react'
import './css/Dashboard.css'
import Header from '../components/Header'
import Euro from '../components/Euro'
import { BudgetContext } from '../context'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import MainContent from '../components/MainContent'
const Dashboard = () => {
  const GET_BUDGET_URL = "http://localhost:3000/budget/653124e6a443d6942a9f0d8f";
  const GET_EXPENSES_URL = "http://localhost:3000/expense/budget/653124e6a443d6942a9f0d8f";

  const [budget, setBudget] = useState();
  const [expenses, setExpenses] = useState();
  const [budgetMonthAndYear, setBudgetMonthAndYear] = useState();

  useEffect(() => {
    fetchBudget();
    fetchExpenses();
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

  const fetchBudget = async () => {
    try {
      const response = await axios.get(GET_BUDGET_URL);
      if (response.status === 200) {
        setBudget(response.data)
        setBudgetMonthAndYear(numberInMonth(response.data.month) + " " + response.data.year)
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


  return (
    <BudgetContext.Provider value={{budgetMonthAndYear, budget, expenses}}>
      <div>
          <Header />
          <Euro />
          <MainContent />
      </div>
    </BudgetContext.Provider>
  )
}

export default Dashboard