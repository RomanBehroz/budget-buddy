import React, { useContext } from 'react'
import './css/AddExpenseButton.css'
import {BudgetContext} from "../context";




const AddExpenseButton = () => {
    const {setEditExpense} = useContext(BudgetContext);

    const addExpenseButtonOnClick = () =>{
        setEditExpense('')
        toggleAddExpenseState()
    }
    const {toggleAddExpenseState} = useContext(BudgetContext);
    return (
        <div className='add-expense-button-section'>
            <div id='slideButton' onClick={addExpenseButtonOnClick} className='add-expense-button'>
                +
            </div>
        </div>
    )
}

export default AddExpenseButton