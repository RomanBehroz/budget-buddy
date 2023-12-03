import React, {useContext, useState} from 'react'
import './css/ExpenseListItem.css'
import {BudgetContext} from "../context";
import axios from "axios";
import AddExpenseForm from "./AddExpenseForm";
const ExpenseListItem = ({id, name, amount, category}) => {
  const {toggleAddExpenseState, budget, fetchExpenses, categories, setEditExpense} = useContext(BudgetContext);
  const [lkeCount, setLikeCount] = useState(0)
  const getColorForCategory = (category) =>{
    if(category === "Grocery")
    {
      return "icon icon-a";
    }

    if(category === "Restaurant")
    {
      return "icon icon-b";
    }

    if(category === "Entertainment")
    {
      return "icon icon-c";
    }

    return "icon icon-d";

  }

  const getExpenseById = async (id) =>{
    try{
      const response = await axios.get('http://localhost:3000/expense/' + id);
      setEditExpense(response.data);

    }catch (error){
      console.log(error)
    }
  }

  const viewExpenseItem = (id) =>{
    toggleAddExpenseState()
    getExpenseById(id)

  }

  return (
      <>

    <div onClick={() => viewExpenseItem(id)} className='expense-list-item'>
        <div className='expense-item-icon-name'>
          <div className={getColorForCategory(category)}></div>
          <div className='heading3-5'>{name}</div>
        </div>
        <div className='heading3-5'>{amount}€</div>

    </div>

      </>
  )
}

export default ExpenseListItem