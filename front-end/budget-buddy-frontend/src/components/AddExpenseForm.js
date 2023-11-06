import './css/AddExpenseForm.css'
import {useContext, useEffect, useState} from "react";
import {BudgetContext} from "../context";
import axios from "axios";


const AddExpenseForm = () => {
    const {toggleAddExpenseState, budget, fetchExpenses, categories, editExpense} = useContext(BudgetContext);
    const [validationState, setValidationState] = useState(false)
    const [expenseId, setExpenseId] = useState('')
    const [expenseName, setExpenseName] = useState('')
    const [expenseAmount, setExpenseAmount] = useState('')
    const [expenseCategory, setExpenseCategory] = useState('6548e02d8c2be41abf18e1e1')
    const [expenseDate, setExpenseDate] = useState('')


    const handleChange = (event) => {
        setExpenseCategory(event.target.value);
    };

    useEffect(() => {
            if(editExpense !== ''){
                setExpenseId(editExpense._id)
                setExpenseName(editExpense.name)
                setExpenseAmount(editExpense.amount)
                setExpenseCategory(editExpense.category)
                setExpenseDate(editExpense.date)
            }
    }, [editExpense]);


    const saveExpense = async () => {

        try{
            let expenseData = {
                name: expenseName,
                amount: expenseAmount,
                date: expenseDate,
                category: expenseCategory,
                budget: budget._id
            }
            if(editExpense !==''){
                const response = await axios.put('http://localhost:3000/expense/'+expenseId, expenseData);
            }else{
                const response = await axios.post('http://localhost:3000/expense', expenseData);
            }

            fetchExpenses()
            toggleAddExpenseState()
        } catch (error) {
            console.error('Post Request Error: ', error)
        }

    }
    return (
        <div className='add-expense-form-section'>
            {validationState? <>   <div className='validation'>
                <p>Please enter an expense name</p>
                <div className='close-button'>X</div>
            </div></> : <></>}

            <div className='add-expense-form'>
                <div className='left'>
                    <div className='form-field'>
                        <input value={expenseName} onChange={(e) => setExpenseName(e.target.value)} type='text' name='expense-name-input' placeholder='Add an expense name'/>
                    </div>
                    <div className='form-field'>
                        <input value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)}  type='text' name='expense-amount-input' placeholder='Add an expense amount'/>
                    </div>

                </div>
                <div className='right'>
                    <div className='form-field'>
                        <select id="categoryDropDown" value={expenseCategory} onChange={handleChange}>
                            {categories.map((option, index) => (
                                <option key={index} value={option._id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='form-field'>
                        <input value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)}  type='text' name='expense-date-input' placeholder='Select date'/>
                    </div>
                </div>
            </div>
            <div onClick={saveExpense} className='add-expense-form-save-button'>
                SAVE
            </div>
        </div>
    )
}

export default AddExpenseForm