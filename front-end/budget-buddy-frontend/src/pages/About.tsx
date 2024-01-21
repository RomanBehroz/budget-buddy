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

const About = () => {
    let navigate = useNavigate()
    const { loginUser } = useUser();

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

                        <p>About</p>
                        <br/>
                        <div className='heading4'>This application is designed and developed by <br/>Roman Behroz</div>
                    </div>

                    <div className='setbudget-input'>

                        {/*<input type="number" pattern="[0-9]*" inputMode="numeric" required={true} placeholder='Enter budget amount in euros'/>*/}
                        <div onClick={() => createBudget()} className='setbudget-button'>BACK</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About