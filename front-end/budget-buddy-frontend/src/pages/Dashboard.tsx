// @ts-ignore
import React, {useContext} from 'react'
import './css/Dashboard.css'
import Header from '../components/Header'
import Euro from '../components/Euro'
import { BudgetContext, BudgetContextType } from '../context';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import MainContent from '../components/MainContent'
import AddExpenseButton from "../components/AddExpenseButton";
import AddExpenseForm from "../components/AddExpenseForm";
import useExpenses from "../useExpenses";
import {useNavigate} from "react-router-dom";
import PopupWindow from "../components/PopupWindow";
const Dashboard = () => {
  const GET_BUDGET_URL = "http://localhost:3000/budget/653124e6a443d6942a9f0d8f";
  const GET_EXPENSES_URL = "http://localhost:3000/expense/budget/";
  const GET_CATEGORIES_URL = "http://localhost:3000/category";
  const GET_BUDGET_TOTAL_SPEND = "http://localhost:3000/expense/sum/"

  let navigate = useNavigate()
  interface EditExpense {
    _id: string;
    name: string;
    amount: string;
    category: string;
    date: string;
    image: string;
    // Add other properties as needed
  }

  const [budget, setBudget] = useState(null);
  const [expenses, setExpenses] = useState< [string, any[]] | []>([]);
  const [budgetMonthAndYear, setBudgetMonthAndYear] = useState("");
  const [budgetMonth, setBudgetMonth] = useState("");
  const [addExpenseState, setAddExpenseState] = useState(false)
  const [categories, setCategories] = useState([])
  const [editExpense, setEditExpense] = useState<EditExpense | "">("")
  const [budgetTotalSpend, setBudgetTotalSpend] = useState(0)

  const toggleAddExpenseState = () =>{
    setAddExpenseState(!addExpenseState);

  }

  useEffect(() => {

    fetchBudget();
    fetchExpenseCategories()
    fetchBudgetTotalSpendSum()

  }, []);

  const numberInMonth = (number: number) =>{
    switch (number) {
      case 10:
        return "OCT"
        break;
      case 11:
        return "NOV"
        break;
      case 12:
        return "DEC"
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
      const response = await axios.get(GET_BUDGET_TOTAL_SPEND+"653124e6a443d6942a9f0d8f");
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
      const response = await axios.get(GET_EXPENSES_URL+"653124e6a443d6942a9f0d8f");
      if (response.status === 200) {
        setExpenses(response.data)
        return response.data;
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


  const { data, state, error, refresh }  = useExpenses(GET_EXPENSES_URL+"653124e6a443d6942a9f0d8f")

  const contextValue: BudgetContextType = {

    budgetMonth,
    budgetMonthAndYear,
    setBudgetMonth,
    budget,
    expenses:data,
    budgetTotalSpend,
    toggleAddExpenseState,
      fetchExpenses:refresh,
      fetchBudget,
      categories,
      editExpense,
      setEditExpense,
      fetchBudgetTotalSpendSum
  };

  return (
    <BudgetContext.Provider value={contextValue}>
      <div>
        <div  onClick={dashboardClicked}>
          <Header />
          {state === 'initial' && <div style={{color:"white"}}>initial</div>}
          {state === 'loading' &&      <div className='delete-window'>
            <p>LOADING...</p>
          </div>}
          {state === 'error' && <div style={{color:"white"}}>Error!  {error?.message}</div>}
          {state === 'error' ? (
              <>
               <PopupWindow msg={"An error has occured! " + error?.message} buttonATxt="REFRESH" buttonAFunc={refresh} buttonBTxt="EXIT" buttonBFunx={()=> {navigate('/')}}/>
              </>
          ) : (
              <></>
          )}
          <Euro />
          <MainContent />
          <div className='footer'>This application is developed and designed by Roman Behroz</div>
        </div>

          {addExpenseState? <> <AddExpenseForm /></> : <>  <AddExpenseButton/></>}

      </div>
    </BudgetContext.Provider>
  )
}

export default Dashboard