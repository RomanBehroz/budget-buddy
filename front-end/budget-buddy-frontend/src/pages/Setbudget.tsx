// @ts-ignore
import React, {useContext} from 'react'
import './css/Dashboard.css'
import './css/Setbudget.css'
import {useNavigate} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import {BudgetContext} from "../context";
import Header from "../components/Header";
import {useUser} from "../userContext";

const Setbudget = () => {
    const { loginUser } = useUser();
    let navigate = useNavigate()
    useEffect(() => {
        let loggedUser = sessionStorage.getItem('user')
        if(loggedUser != undefined || loggedUser != null){
            // Perform login logic, fetch user data, etc.
            const loggedInUser = { username: loggedUser};
            loginUser(loggedInUser);
        }

    }, []);
    // function getCurrentMonth() {
    //     const currentDate = new Date();
    //     const currentMonth = currentDate.getMonth();
    //     return currentMonth;
    // }

    const createBudget = async () =>{
        // console.log(budgetAmountInput)
        //
        // if(budgetAmountInput !== 0){
        //     try {
        //         const currentDate = new Date();
        //         const currentYear = currentDate.getFullYear();
        //         const currentMonth = currentDate.getMonth()+1;
        //         const budget = {
        //             amount: budgetAmountInput,
        //             month: currentMonth,
        //             year: currentYear
        //         }
        //
        //         const response = await axios.post(CREATE_BUDGET_URL, budget);
        //         if (response.status === 201) {
        //             setBudgetId(response.data._id)
        //             navigate('/dashboard');
        //         }
        //     } catch (error) {
        //         console.error('Error:', error);
        //     }
        // }
        navigate('/dashboard');
    }


    return (
        <>
            <Header/>
            <div className='setbudget-page'>
                <div className='setbudget-content'>
                    <div className='setbudget-text'>
                        Hello!
                        <p>Please set your budget</p>
                    </div>

                    <div className='setbudget-input'>

                        <input type="number" pattern="[0-9]*" inputMode="numeric" required={true} placeholder='Enter budget amount in euros'/>
                        <div onClick={() => createBudget()} className='setbudget-button'>NEXT</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Setbudget