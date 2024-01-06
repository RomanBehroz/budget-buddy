import React, { useContext } from 'react';
import './css/AddExpenseButton.css';
import { BudgetContext } from '../context';

const AddExpenseButton: React.FC = () => {
    const { setEditExpense, toggleAddExpenseState } = useContext(BudgetContext);

    const addExpenseButtonOnClick = () => {
        setEditExpense('');
        toggleAddExpenseState();
    };

    return (
        <div className='add-expense-button-section'>
            <div id='slideButton' onClick={addExpenseButtonOnClick} className='add-expense-button'>
                +
            </div>
        </div>
    );
};

export default AddExpenseButton;
