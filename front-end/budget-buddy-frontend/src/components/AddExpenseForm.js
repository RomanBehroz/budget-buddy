import './css/AddExpenseForm.css'
import '../App.css'
import {useContext, useEffect, useState} from "react";
import {BudgetContext} from "../context";
import axios from "axios";


const AddExpenseForm = () => {
    const {toggleAddExpenseState, budget, fetchExpenses, categories, editExpense, fetchBudget} = useContext(BudgetContext);
    const [validationState, setValidationState] = useState(false)
    const [expenseId, setExpenseId] = useState('')
    const [expenseName, setExpenseName] = useState('')
    const [expenseAmount, setExpenseAmount] = useState('')
    const [expenseCategory, setExpenseCategory] = useState('6548e02d8c2be41abf18e1e1')
    const [expenseDate, setExpenseDate] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [showMedia, setShowMedia] = useState(false)
    const [turnIcon, setTurnIcon] = useState('')
    const [deleteWindow, setDeleteWindow] = useState(false)
    const [imageSrc, setImageSrc] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        // Get the selected file from the input
        const file = e.target.files[0];
        setSelectedFile(file);
    };



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
                setImageSrc(editExpense.image)
                setEditMode(true)

            }
    }, [editExpense]);

    const createImageURL = (imageBuffer) => {
        const blob = new Blob([imageBuffer], { type: 'image/jpeg' }); // Adjust the type if your image is different
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
    };




    const saveExpense = async () => {

        try{
            let expenseData;
            if(selectedFile){
                 expenseData = {
                    name: expenseName,
                    amount: expenseAmount,
                    date: expenseDate,
                    category: expenseCategory,
                    budget: budget._id,
                    image: selectedFile
                }
            }else{
                 expenseData = {
                    name: expenseName,
                    amount: expenseAmount,
                    date: expenseDate,
                    category: expenseCategory,
                    budget: budget._id,
                    image: imageSrc
                }
            }

            if(editExpense !==''){
                const response = await axios.put('http://localhost:3000/expense/'+expenseId, expenseData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }else{
                const response = await axios.post('http://localhost:3000/expense', expenseData, { headers: {
                        'Content-Type': 'multipart/form-data'
                    }});
            }
            fetchBudget()
            fetchExpenses()
            toggleAddExpenseState()
        } catch (error) {
            console.error('Post Request Error: ', error)
        }

    }

    const toggleMedia = () =>{

        setShowMedia(!showMedia)

    }

    const deleteExpense = async (expenseId) =>{


        const response = await axios.delete('http://localhost:3000/expense/'+expenseId);
        if(response.status === 200){
            fetchExpenses()
            setDeleteWindow(false)
            setEditMode(false)
            toggleAddExpenseState()
            fetchBudget()
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
                    <div className='form-field-amount'>
                        <input value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)}  type='text' name='expense-amount-input' placeholder='Add an expense amount'/>

                    </div>

                    <div onClick={toggleMedia} className={`form-field media `}>
                        <div>Media</div>
                        <div>
                            <img className={showMedia? 'turn-icon' : ''} src='/images/direction.png'/>
                        </div>

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
                    {
                        editMode? <>
                            <div className='form-field align-end delete-btn'>
                                <img onClick={() => setDeleteWindow(true)} src='/images/delete.png'/>
                            </div>
                        </> : <></>
                    }

                </div>
            </div>
            {
                showMedia? <>

                    <div className='expense-item-media-section'>

                        {imageSrc? <><img src={'http://localhost:3000/'+imageSrc}/></> : <></>}

                    </div>
                    <div className='add-photo'>
                        <input className='button'  type="file" name='image' onChange={handleFileChange} />


                    </div>
                </> : <>
                </>
            }


            <div onClick={saveExpense} className='add-expense-form-save-button'>
                SAVE
            </div>


            {
                deleteWindow? <>
                    <div className='delete-window'>
                        <p>Are you sure, you want to delete this expense?</p>
                        <div className='buttons'>
                            <button onClick={() => deleteExpense(expenseId)} className='button red'>Yes</button>
                            <button onClick={() => setDeleteWindow(false)} className='button'>No</button>
                        </div>
                    </div>
                </> : <></>
            }
        </div>
    )
}

export default AddExpenseForm