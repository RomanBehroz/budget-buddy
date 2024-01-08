import React, { useContext, useEffect, useState } from 'react';
import './css/AddExpenseForm.css';
import { BudgetContext } from '../context';
import axios from 'axios';
import PopupWindow from "./PopupWindow";

const AddExpenseForm: React.FC = () => {
    const {
        toggleAddExpenseState,
        budget,
        fetchExpenses,
        categories,
        editExpense,
        fetchBudget,
        fetchBudgetTotalSpendSum,
    } = useContext(BudgetContext);

    const [validationState, setValidationState] = useState(false);
    const [expenseId, setExpenseId] = useState('');
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('6548e02d8c2be41abf18e1e1');
    const [expenseDate, setExpenseDate] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [showMedia, setShowMedia] = useState(false);
    const [deleteWindow, setDeleteWindow] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [likeCounter, setLikeCounter] = useState(0);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setSelectedFile(file);
    };

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setExpenseCategory(event.target.value);
    };

    useEffect(() => {
        if (editExpense !== '') {
            setExpenseId(editExpense._id);
            setExpenseName(editExpense.name);
            setExpenseAmount(editExpense.amount);
            setExpenseCategory(editExpense.category);
            setExpenseDate(editExpense.date);
            setImageSrc(editExpense.image);
            setEditMode(true);
        }
    }, [editExpense]);

    const saveExpense = async () => {
        try {
            let expenseData;
            if (selectedFile) {
                expenseData = {
                    name: expenseName,
                    amount: expenseAmount,
                    date: expenseDate,
                    category: expenseCategory,
                    budget: budget?._id,
                    image: selectedFile,
                };
            } else {
                expenseData = {
                    name: expenseName,
                    amount: expenseAmount,
                    date: expenseDate,
                    category: expenseCategory,
                    budget: budget?._id,
                    image: imageSrc,
                };
            }

            if (editExpense !== '') {
                const response = await axios.put(
                    `http://localhost:3000/expense/${expenseId}`,
                    expenseData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
            } else {
                const response = await axios.post('http://localhost:3000/expense', expenseData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            fetchBudget();
            fetchExpenses();
            toggleAddExpenseState();
            fetchBudgetTotalSpendSum();
        } catch (error) {
            console.error('Post Request Error: ', error);
        }
    };

    const toggleMedia = () => {
        setShowMedia(!showMedia);
    };

    const deleteExpense = async (expenseId: string) => {
        const response = await axios.delete(`http://localhost:3000/expense/${expenseId}`);
        if (response.status === 200) {
            fetchExpenses();
            setDeleteWindow(false);
            setEditMode(false);
            toggleAddExpenseState();
            fetchBudget();
            fetchBudgetTotalSpendSum();
        }
    };

    return (
        <div className='add-expense-form-section'>
            {validationState ? (
                <>
                    {' '}
                    <div className='validation'>
                        <p>Please enter an expense name</p>
                        <div className='close-button'>X</div>
                    </div>
                </>
            ) : (
                <></>
            )}

            <div className='add-expense-form'>
                <div className='left'>
                    <div className='form-field'>
                        <input
                            value={expenseName}
                            onChange={(e) => setExpenseName(e.target.value)}
                            type='text'
                            name='expense-name-input'
                            placeholder='Add an expense name'
                        />
                    </div>
                    <div className='form-field-amount'>
                        <input
                            value={expenseAmount}
                            onChange={(e) => setExpenseAmount(e.target.value)}
                            type='text'
                            name='expense-amount-input'
                            placeholder='Add an expense amount'
                        />
                    </div>

                    <div onClick={toggleMedia} className={`form-field media `}>
                        <div>Media</div>
                        <div>
                            <img className={showMedia ? 'turn-icon' : ''} src='/images/direction.png' />
                        </div>
                    </div>
                </div>
                <div className='right'>
                    <div className='form-field'>
                        <select id='categoryDropDown' value={expenseCategory} onChange={handleChange}>
                            {categories.map((option, index) => (
                                <option key={index} value={option._id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='form-field'>
                        <input
                            value={expenseDate}
                            onChange={(e) => setExpenseDate(e.target.value)}
                            type='text'
                            name='expense-date-input'
                            placeholder='Select date'
                        />
                    </div>
                    {editMode ? (
                        <>
                            <div className='form-field align-end delete-btn'>
                                <img onClick={() => setDeleteWindow(true)} src='/images/delete.png' />
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            {showMedia ? (
                <>
                    <div className='expense-item-media-section'>
                        {imageSrc ? <><img src={`http://localhost:3000/${imageSrc}`} /></> : <><p>No image to display</p></>}
                    </div>
                    <div className='add-photo'>
                        <input className='button' type='file' name='image' onChange={handleFileChange} />
                        <button onClick={() => setLikeCounter(likeCounter + 1)} className='button'>
                            Like {likeCounter}
                        </button>
                    </div>
                </>
            ) : (
                <></>
            )}

            <div onClick={saveExpense} className='add-expense-form-save-button'>
                SAVE
            </div>

            {deleteWindow ? (
                <>
                    <PopupWindow msg="Are you sure, you want to delete this expense?" buttonATxt="YES" buttonAFunc={() => deleteExpense(expenseId)} buttonBTxt="NO" buttonBFunx={() => setDeleteWindow(false)}/>
                    {/*<div className='delete-window'>*/}
                    {/*    <p>Are you sure, you want to delete this expense?</p>*/}
                    {/*    <div className='buttons'>*/}
                    {/*        <button onClick={() => deleteExpense(expenseId)} className='button red'>*/}
                    {/*            Yes*/}
                    {/*        </button>*/}
                    {/*        <button onClick={() => setDeleteWindow(false)} className='button'>*/}
                    {/*            No*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default AddExpenseForm;
