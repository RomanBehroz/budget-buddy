import React, { useContext } from 'react'
import './css/AddExpenseButton.css'
import {BudgetContext} from "../context";




const AddExpenseButton = () => {

  const slide =() =>{

  }

    const {toggleAddExpenseState} = useContext(BudgetContext);
    return (
        <div className='add-expense-button-section'>
            <div id='slideButton' onClick={toggleAddExpenseState} className='add-expense-button'>
                +
            </div>
        </div>
    )
}

export default AddExpenseButton