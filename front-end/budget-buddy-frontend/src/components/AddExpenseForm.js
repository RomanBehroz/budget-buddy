import './css/AddExpenseForm.css'
import {useContext, useState} from "react";
import {BudgetContext} from "../context";


const AddExpenseForm = () => {
    const {toggleAddExpenseState} = useContext(BudgetContext);
    const [validationState, setValidationState] = useState(false)

    const [expenseName, setExpenseName] = useState('')
    return (
        <div className='add-expense-form-section'>
            {validationState? <>   <div className='validation'>
                <p>Please enter an expense name</p>
                <div className='close-button'>X</div>
            </div></> : <></>}

            <div className='add-expense-form'>
                <div className='left'>
                    <div className='form-field'>
                        <input  type='text' name='expense-name-input' placeholder='Add an expense name'/>
                    </div>
                    <div className='form-field'>
                        <input type='text' name='expense-amount-input' placeholder='Add an expense amount'/>
                    </div>

                </div>
                <div className='right'>
                    <div className='form-field'>
                        <input type='text' name='expense-category-input' placeholder='Select an expense category'/>
                    </div>
                    <div className='form-field'>
                        <input type='text' name='expense-date-input' placeholder='Select an expense date'/>
                    </div>
                </div>
            </div>
            <div onClick={toggleAddExpenseState} className='add-expense-form-save-button'>
                SAVE
            </div>
        </div>
    )
}

export default AddExpenseForm